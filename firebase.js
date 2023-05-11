// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDFfY-nlj-XiJA6hh0kJPyhY-BefvCU_kA",
  authDomain: "stone-booking-385908.firebaseapp.com",
  projectId: "stone-booking-385908",
  storageBucket: "stone-booking-385908.appspot.com",
  messagingSenderId: "930645446623",
  appId: "1:930645446623:web:3b728fa1ad3152f27efe6a",
  measurementId: "G-JVG99S2BSS"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
