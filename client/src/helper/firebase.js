// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "",
  authDomain: "postprego-66a21.firebaseapp.com",
  projectId: "postprego-66a21",
  storageBucket: "postprego-66a21.appspot.com",
  messagingSenderId: "726254724641",
  appId: "1:726254724641:web:93fcedc3f239fe6d0d6560",
  measurementId: "G-NH8XF6K2SF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);