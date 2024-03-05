// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTKMmOTguFZuMRo1nd8S9Y8jMJ_P3PYmM",
  authDomain: "ohiz-villa-app-aa204.firebaseapp.com",
  projectId: "ohiz-villa-app-aa204",
  storageBucket: "ohiz-villa-app-aa204.appspot.com",
  messagingSenderId: "952291763167",
  appId: "1:952291763167:web:6ac6152b2a9e1a79829a6a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore()