import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, googleProvider, db } from "@/services/firebase.js";

export const useAuthStore = defineStore("auth", () => {
  // State
  const user = ref(null);
  const userProfile = ref(null);
  const loading = ref(true);
  const error = ref(null);
  const isInitialized = ref(false);

  // Getters
  const isAuthenticated = computed(() => !!user.value);
  const isAdmin = computed(() => userProfile.value?.role === "admin");
  const isEditor = computed(
    () =>
      userProfile.value?.role === "editor" ||
      userProfile.value?.role === "admin"
  );
  const isPending = computed(() => userProfile.value?.role === "pending");
  const canCreateArticles = computed(() => isEditor.value);
  const canDeleteArticles = computed(() => isAdmin.value);

  // Initialize auth state listener
  const initializeAuth = () => {
    console.log("🔥 Initializing Firebase Auth...");
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        console.log(
          "🔥 Auth state changed:",
          firebaseUser ? "User found" : "No user"
        );
        loading.value = true;

        try {
          if (firebaseUser) {
            console.log(
              "🔥 Processing authenticated user:",
              firebaseUser.email
            );
            // Set user data
            user.value = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              photoURL: firebaseUser.photoURL,
            };

            // Load user profile from Firestore
            await loadUserProfile(firebaseUser.uid);
          } else {
            console.log("🔥 No user found, clearing data");
            // Clear user data if no user
            user.value = null;
            userProfile.value = null;
          }
        } catch (err) {
          console.error("🔥 Auth state change error:", err);
          error.value = err.message;
        } finally {
          loading.value = false;
          if (!isInitialized.value) {
            console.log("🔥 Auth initialization complete");
            isInitialized.value = true;
            resolve();
          }
        }
      });

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
        // Create default user profile for first-time admin team members
        const defaultProfile = {
          uid,
          email: user.value.email,
          displayName: user.value.displayName,
          photoURL: user.value.photoURL,
          role: "pending", // Default role - admin needs to approve
          permissions: [],
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          lastLoginAt: serverTimestamp(),
        };

        await setDoc(doc(db, "users", uid), defaultProfile);
        userProfile.value = defaultProfile;
      }

      // Update last login time
      await setDoc(
        doc(db, "users", uid),
        {
          lastLoginAt: serverTimestamp(),
        },
        { merge: true }
      );
    } catch (err) {
      console.error("Error loading user profile:", err);
      error.value = "Failed to load user profile";
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    loading.value = true;
    error.value = null;

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;
      return firebaseUser;
    } catch (err) {
      console.error("Google sign-in error:", err);
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Sign out
  const logout = async () => {
    try {
      await signOut(auth);
      user.value = null;
      userProfile.value = null;
      error.value = null;
    } catch (err) {
      console.error("Sign out error:", err);
      error.value = err.message;
      throw err;
    }
  };

  // Check if user has specific permission
  const hasPermission = (permission) => {
    return userProfile.value?.permissions?.includes(permission) || false;
  };

  // Check if user can access admin area
  const canAccessAdmin = computed(() => {
    return isAuthenticated.value && (isAdmin.value || isEditor.value);
  });

  // Clear error
  const clearError = () => {
    error.value = null;
  };

  // Update user role (admin only)
  const updateUserRole = async (targetUserId, newRole, permissions = []) => {
    if (!isAdmin.value) {
      throw new Error("Only admins can update user roles");
    }

    try {
      await setDoc(
        doc(db, "users", targetUserId),
        {
          role: newRole,
          permissions,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      // Refresh current user profile if updating own role
      if (targetUserId === user.value?.uid) {
        await loadUserProfile(targetUserId);
      }

      return true;
    } catch (err) {
      console.error("Error updating user role:", err);
      throw err;
    }
  };

  // Return all state, getters, and actions
  return {
    // State
    user,
    userProfile,
    loading,
    error,
    isInitialized,

    // Getters
    isAuthenticated,
    isAdmin,
    isEditor,
    isPending,
    canCreateArticles,
    canDeleteArticles,
    canAccessAdmin,

    // Actions
    initializeAuth,
    signInWithGoogle,
    logout,
    loadUserProfile,
    hasPermission,
    updateUserRole,
    clearError,
  };
});
