// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDCI0oExyQ4N8C4Fn48-zSPM0UJlX34x10",
    authDomain: "gnokky-966fe.firebaseapp.com",
    projectId: "gnokky-966fe",
    storageBucket: "gnokky-966fe.appspot.com",
    messagingSenderId: "735157932840",
    appId: "1:735157932840:web:a70aeefb33a39f4399b61d",
    measurementId: "G-PPHNTKNPQ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = isSupported().then(response => response ? getAnalytics(app) : null);

export const auth = getAuth(app);
export default app;
