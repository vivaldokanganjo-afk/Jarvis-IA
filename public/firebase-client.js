// Firebase V10 CDN

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBAKx9pKPoU1i5__6brcXy1PzReO_1VZQc",
    authDomain: "mate5s.firebaseapp.com",
    projectId: "mate5s",
    storageBucket: "mate5s.firebasestorage.app",
    messagingSenderId: "452169560696",
    appId: "1:452169560696:web:7b44450b63a76496e6338d",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
