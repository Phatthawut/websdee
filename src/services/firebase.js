import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import secureLogger from "@/utils/secureLogger";

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: "G-BYVM3CF7KD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Initialize Firebase Analytics
let analytics = null;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

// Initialize Firebase App Check with reCAPTCHA v3
let appCheck = null;
if (typeof window !== "undefined") {
  try {
    appCheck = initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(
        "6LdxgXorAAAAALcig08F5g-MS0s1WDjbXBg7mD0O"
      ),
      isTokenAutoRefreshEnabled: true,
    });
    secureLogger.log("Firebase App Check initialized successfully");
  } catch (error) {
    secureLogger.error("Failed to initialize Firebase App Check", error);
  }
}

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

export { db, auth, googleProvider, analytics, appCheck };
export default app;
