import { defineStore } from "pinia";
import { ref, computed } from "vue";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/services/firebase";
import secureLogger from "@/utils/secureLogger";

export const useAuthStore = defineStore("auth", () => {
  // State
  const user = ref(null);
  const userProfile = ref(null);
  const isLoading = ref(true);
  const isInitialized = ref(false);

  // Getters
  const isAuthenticated = computed(() => !!user.value);
  const isAdmin = computed(() => userProfile.value?.role === "admin");
  const userDisplayName = computed(() => {
    return userProfile.value?.displayName || user.value?.displayName || "User";
  });

  // Initialize auth listener
  const initializeAuth = () => {
    secureLogger.log("🔥 Initializing Firebase Auth...");

    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(
        auth,
        async (authUser) => {
          try {
            if (authUser) {
              // User is signed in
              user.value = {
                uid: authUser.uid,
                email: authUser.email,
                displayName: authUser.displayName,
                photoURL: authUser.photoURL,
                emailVerified: authUser.emailVerified,
              };

              // Load additional user profile from Firestore
              await loadUserProfile(authUser.uid);
            } else {
              // User is signed out
              secureLogger.log("🔥 No user found, clearing data");
              user.value = null;
              userProfile.value = null;
            }
          } catch (err) {
            secureLogger.error("🔥 Auth state change error", err);
          } finally {
            isLoading.value = false;
            if (!isInitialized.value) {
              secureLogger.log("🔥 Auth initialization complete");
              isInitialized.value = true;
              resolve();
            }
          }
        },
        (err) => {
          secureLogger.error("🔥 Auth state change error", err);
          isLoading.value = false;
          if (!isInitialized.value) {
            isInitialized.value = true;
            resolve();
          }
        }
      );

      // Return unsubscribe function
      return unsubscribe;
    });
  };

  // Load user profile from Firestore
  const loadUserProfile = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        userProfile.value = userDoc.data();
      } else {
        // Create default user profile
        const defaultProfile = {
          uid,
          email: user.value?.email,
          displayName: user.value?.displayName,
          photoURL: user.value?.photoURL,
          role: "user",
          createdAt: new Date(),
          lastLogin: new Date(),
        };

        await setDoc(doc(db, "users", uid), defaultProfile);
        userProfile.value = defaultProfile;
      }
    } catch (err) {
      secureLogger.error("Error loading user profile", err);
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // Update last login
      await updateDoc(doc(db, "users", result.user.uid), {
        lastLogin: new Date(),
      });

      secureLogger.log("Google sign-in successful", { uid: result.user.uid });
      return result;
    } catch (err) {
      secureLogger.error("Google sign-in error", err);
      throw err;
    }
  };

  // Sign out
  const signOutUser = async () => {
    try {
      await signOut(auth);
      user.value = null;
      userProfile.value = null;
      secureLogger.log("User signed out successfully");
    } catch (err) {
      secureLogger.error("Sign out error", err);
      throw err;
    }
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return userProfile.value?.role === role;
  };

  // Check if user has admin privileges
  const isUserAdmin = () => {
    return hasRole("admin");
  };

  // Update user role (admin only)
  const updateUserRole = async (uid, newRole) => {
    try {
      // Check if current user is admin
      if (!isUserAdmin()) {
        throw new Error("Insufficient permissions");
      }

      await updateDoc(doc(db, "users", uid), {
        role: newRole,
        updatedAt: new Date(),
      });

      // If updating current user's role, refresh profile
      if (uid === user.value?.uid) {
        await loadUserProfile(uid);
      }

      secureLogger.log("User role updated successfully", { uid, newRole });
    } catch (err) {
      secureLogger.error("Error updating user role", err);
      throw err;
    }
  };

  return {
    // State
    user,
    userProfile,
    isLoading,
    isInitialized,

    // Getters
    isAuthenticated,
    isAdmin,
    userDisplayName,

    // Actions
    initializeAuth,
    loadUserProfile,
    signInWithGoogle,
    signOutUser,
    hasRole,
    isUserAdmin,
    updateUserRole,
  };
});
