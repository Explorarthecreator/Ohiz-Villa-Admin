// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from 'firebase/firestore'
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxxNP_4eVW71Hw-VAFhmJOKFguI4p3Vb4",
  authDomain: "ohiz-villa.firebaseapp.com",
  projectId: "ohiz-villa",
  storageBucket: "ohiz-villa.appspot.com",
  messagingSenderId: "125724798725",
  appId: "1:125724798725:web:ba4e51ccdf221cf0b8916c",
  measurementId: "G-M9PCBE27Z5"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore()