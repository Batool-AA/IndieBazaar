// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from  "firebase/auth";
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4vyfCBm8TuWd8jULTbxpxzuV2jyadGoE",
  authDomain: "indiebazaar-c9a7f.firebaseapp.com",
  projectId: "indiebazaar-c9a7f",
  storageBucket: "indiebazaar-c9a7f.appspot.com",
  messagingSenderId: "818148572846",
  appId: "1:818148572846:web:fbd5a94e3103014018373f",
  measurementId: "G-SZ9H97BRXW"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
export {db}
