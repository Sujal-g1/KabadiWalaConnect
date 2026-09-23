import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { auth } from "../../config/firebase.js";

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

const signInWithGoogle = async () => {
  const result = await signInWithPopup(
    auth,
    googleProvider
  );

  return result.user;
};

const getFirebaseIdToken = async (user) => {
  return await user.getIdToken();
};

const logoutFirebase = async () => {
  await signOut(auth);
};

export {
  signInWithGoogle,
  getFirebaseIdToken,
  logoutFirebase,
};