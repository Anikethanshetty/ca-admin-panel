// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeT0MGc0PC6BcUQO9DTKn7Gx9KsGrkCJc",
  authDomain: "ca-chat-application.firebaseapp.com",
  projectId: "ca-chat-application",
  storageBucket: "ca-chat-application.firebasestorage.app",
  messagingSenderId: "1052201718291",
  appId: "1:1052201718291:web:e25309b548103a4f37a5e6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);