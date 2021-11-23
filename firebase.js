// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { initializeFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDG48KIqUbyhXtGbvuo75_aTIH8OkrR-9s",
    authDomain: "varlikapp.firebaseapp.com",
    projectId: "varlikapp",
    storageBucket: "varlikapp.appspot.com",
    messagingSenderId: "295262869229",
    appId: "1:295262869229:web:5fc18c9761081ed60d9ee4",
    measurementId: "G-NCPY7XWBW8"
};



// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export function signIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}
export function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
}