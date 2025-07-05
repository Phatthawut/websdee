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
  const error = ref(null);
  const loading = ref(false);

  // Getters
  const isAuthenticated = computed(() => !!user.value);
  const isAdmin = computed(() => userProfile.value?.role === "admin");
  const isPending = computed(() => userProfile.value?.role === "pending");
  const canAccessAdmin = computed(
    () =>
      userProfile.value?.role === "admin" ||
      userProfile.value?.role === "editor"
  );
  const userDisplayName = computed(() => {
    return userProfile.value?.displayName || user.value?.displayName || "User";
  });

  // Clear error
  const clearError = () => {
    error.value = null;
  };

  // Set error
  const setError = (errorMessage) => {
    error.value = errorMessage;
  };

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
            setError("Authentication error occurred. Please try again.");
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
          setError("Authentication error occurred. Please try again.");
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
        // Create default user profile with pending status
        const defaultProfile = {
          uid,
          email: user.value?.email,
          displayName: user.value?.displayName,
          photoURL: user.value?.photoURL,
          role: "pending", // New users start as pending
          createdAt: new Date(),
          lastLogin: new Date(),
        };

        await setDoc(doc(db, "users", uid), defaultProfile);
        userProfile.value = defaultProfile;
      }
    } catch (err) {
      secureLogger.error("Error loading user profile", err);
      setError("Failed to load user profile. Please try again.");
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      loading.value = true;
      clearError();

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

      // Handle specific errors
      if (err.code === "auth/popup-closed-by-user") {
        setError("Sign-in was cancelled. Please try again.");
      } else if (err.code === "auth/popup-blocked") {
        setError("Pop-up was blocked. Please enable pop-ups and try again.");
      } else if (err.code === "auth/network-request-failed") {
        setError("Network error. Please check your connection and try again.");
      } else {
        setError("Sign-in failed. Please try again.");
      }

      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Sign out
  const signOutUser = async () => {
    try {
      loading.value = true;
      clearError();

      await signOut(auth);
      user.value = null;
      userProfile.value = null;
      secureLogger.log("User signed out successfully");
    } catch (err) {
      secureLogger.error("Sign out error", err);
      setError("Sign out failed. Please try again.");
      throw err;
    } finally {
      loading.value = false;
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
      setError("Failed to update user role. Please try again.");
      throw err;
    }
  };

  return {
    // State
    user,
    userProfile,
    isLoading,
    isInitialized,
    error,
    loading,

    // Getters
    isAuthenticated,
    isAdmin,
    isPending,
    canAccessAdmin,
    userDisplayName,

    // Actions
    clearError,
    setError,
    initializeAuth,
    loadUserProfile,
    signInWithGoogle,
    signOutUser,
    hasRole,
    isUserAdmin,
    updateUserRole,
  };
});
