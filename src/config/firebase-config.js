import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBEFqLk964uI8YMOwYnWzjkxkyE4QGuRds",
  authDomain: "thoughts-share-79682.firebaseapp.com",
  projectId: "thoughts-share-79682",
  storageBucket: "thoughts-share-79682.firebasestorage.app",
  messagingSenderId: "692068945144",
  appId: "1:692068945144:web:9ff9b0326edb61d7dc7f0d",
  measurementId: "G-JCR15LWTNK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Setting up authentication
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
