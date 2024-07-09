// import * as firebase from "firebase/app";
// import "firebase/auth";

import { auth } from "layouts/authentication/firebase/firebase";

// if (!process.env.REACT_APP_FIREBASE_CONFIG) {
//   console.error("REACT_APP_FIREBASE_CONFIG must be defined");
//   console.log("ENV: ", process.env);
// }
// const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG);

// export function initialize() {
//   // Initialize Firebase
//   if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig);
//   }
// }

export function attachAuthListener(handler) {
  return auth.onAuthStateChanged(user => {
    handler(user);
  });
}

export async function createNewUser(email, password) {
  await auth.createUserWithEmailAndPassword(email, password);
}

export async function signIn(email, password) {
  await auth.signInWithEmailAndPassword(email, password);
}

export async function signOut() {
  await auth.signOut();
}
