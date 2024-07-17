
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "layouts/authentication/firebase/firebase";



export function attachAuthListener(handler) {
  return auth.onAuthStateChanged(user => {
    handler(user);
  });
}

export async function createNewUser(email, password) {
  let a = auth;
  await createUserWithEmailAndPassword(auth,email, password);
}

export async function signIn(email, password) {
  await signInWithEmailAndPassword(auth,email, password);
}

export async function signOut() {
  await auth.signOut();
}
