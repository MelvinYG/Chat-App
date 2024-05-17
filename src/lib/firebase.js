// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "heyya-chatapp.firebaseapp.com",
  projectId: "heyya-chatapp",
  storageBucket: "heyya-chatapp.appspot.com",
  messagingSenderId: "105609660745",
  appId: "1:105609660745:web:1437104bb99cda123d7298"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const database = getFirestore();
export const storage = getStorage();