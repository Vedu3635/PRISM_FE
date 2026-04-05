// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBal4V4F_N9GIrwoND9Jx3n9Ap_OZwjWVs",
    authDomain: "prism-v2-cd0e3.firebaseapp.com",
    projectId: "prism-v2-cd0e3",
    storageBucket: "prism-v2-cd0e3.firebasestorage.app",
    messagingSenderId: "442596733363",
    appId: "1:442596733363:web:833d377473e7bc050e5bc6",
    measurementId: "G-9W82EPJMRL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);