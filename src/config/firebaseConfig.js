// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBi2SQ1cc0tgFkYa4gy51zC3SMpmfL7xfI",
  authDomain: "task-manager-85e93.firebaseapp.com",
  projectId: "task-manager-85e93",
  storageBucket: "task-manager-85e93.firebasestorage.app",
  messagingSenderId: "1742679932",
  appId: "1:1742679932:web:6855eba38cd929f0373ef9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)

export { signInWithPopup, signOut };