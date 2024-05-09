// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration for the first app
const firebaseConfig1 = {
  apiKey: "AIzaSyBkcjD98s3GEmuwo7v_d2Hw2ugw_PoXjEI",
  authDomain: "otp-project-9b8c2.firebaseapp.com",
  projectId: "otp-project-9b8c2",
  storageBucket: "otp-project-9b8c2.appspot.com",
  messagingSenderId: "777108144107",
  appId: "1:777108144107:web:22b48b9b8fcf7fc4ab63ae"
};

// Initialize the first Firebase app with a custom name
const app1 = initializeApp(firebaseConfig1, "App1");

// Export the auth object from the first app
export const auth1 = getAuth(app1);

// Import the second Firebase app
import { initializeApp as initializeApp2 } from "firebase/app";

// Firebase configuration for the second app
const firebaseConfig2 = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "mern-auth-18120.firebaseapp.com",
  projectId: "mern-auth-18120",
  storageBucket: "mern-auth-18120.appspot.com",
  messagingSenderId: "411292307572",
  appId: "1:411292307572:web:a5c4a05f720dc52c384121"
};

// Initialize the second Firebase app with a custom name
export const app2 = initializeApp2(firebaseConfig2, "App2");
// Export the second app if needed
export const auth2 = getAuth(app2);
