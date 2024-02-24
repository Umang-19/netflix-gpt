// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZC-JER7sOX3d2VCYexz3ZD6juxxIyogY",
  authDomain: "netflixgpt-4867e.firebaseapp.com",
  projectId: "netflixgpt-4867e",
  storageBucket: "netflixgpt-4867e.appspot.com",
  messagingSenderId: "790433238494",
  appId: "1:790433238494:web:41c28fd83d230743c2a14f",
  measurementId: "G-LF0QYFLW6D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(); 