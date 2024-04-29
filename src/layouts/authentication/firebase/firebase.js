import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDrbzFH_km0MN6MvfOGZnciWWFJb_bveVc",
    authDomain: "crud-bbec3.firebaseapp.com",
    projectId: "crud-bbec3",
    storageBucket: "crud-bbec3.appspot.com",
    messagingSenderId: "722606693659",
    appId: "1:722606693659:web:24886d443daf3f552407be",
    measurementId: "G-ENHSYQJPWX"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
