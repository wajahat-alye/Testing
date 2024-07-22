import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBjMQAq19K6rklw8o2d8evR_90ybFPqOsc",
    authDomain: "super-5fab6.firebaseapp.com",
    projectId: "super-5fab6",
    storageBucket: "super-5fab6.appspot.com",
    messagingSenderId: "1057954611971",
    appId: "1:1057954611971:web:10d9f2e4fa43e6c2ab5f36",
    measurementId: "G-XDQC2ZTJ7F"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
