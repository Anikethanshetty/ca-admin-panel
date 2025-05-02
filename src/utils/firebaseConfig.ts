// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqw2yXDTTmBLf9wXl9HmlO-muo-YF1aAc",
  authDomain: "ca-project-e3020.firebaseapp.com",
  projectId: "ca-project-e3020",
  storageBucket: "ca-project-e3020.firebasestorage.app",
  messagingSenderId: "1030720963003",
  appId: "1:1030720963003:web:1d51f4f6c7c148bd27c49e",
  measurementId: "G-VG484S7YJ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
