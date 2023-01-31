// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "her-future-coalition.firebaseapp.com",
    projectId: "her-future-coalition",
    storageBucket: "her-future-coalition.appspot.com",
    messagingSenderId: "233674517173",
    appId: "1:233674517173:web:876249f63add9f8fe1ecfc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth };
