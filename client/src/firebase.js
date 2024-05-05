// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "mern-auth-18120.firebaseapp.com",
  projectId: "mern-auth-18120",
  storageBucket: "mern-auth-18120.appspot.com",
  messagingSenderId: "411292307572",
  appId: "1:411292307572:web:a5c4a05f720dc52c384121"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);