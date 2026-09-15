import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

import { auth } from "../config/firebase.js";

const setupRecaptcha = (containerId) => {
  if (window.recaptchaVerifier) {
    return window.recaptchaVerifier;
  }

  window.recaptchaVerifier = new RecaptchaVerifier(
    auth,
    containerId,
    {
      size: "invisible",
      callback: () => {
        console.log("reCAPTCHA verified");
      },
      "expired-callback": () => {
        window.recaptchaVerifier = null;
      },
    }
  );

  return window.recaptchaVerifier;
};

const sendOTP = async (phoneNumber, containerId) => {
  const appVerifier = setupRecaptcha(containerId);

  const confirmationResult = await signInWithPhoneNumber(
    auth,
    phoneNumber,
    appVerifier
  );

  window.confirmationResult = confirmationResult;

  return confirmationResult;
};

const verifyOTP = async (otp) => {
  if (!window.confirmationResult) {
    throw new Error("OTP session not found. Please request a new OTP.");
  }

  const result = await window.confirmationResult.confirm(otp);

  return result.user;
};

const getFirebaseIdToken = async (user) => {
  return await user.getIdToken();
};

export {
  setupRecaptcha,
  sendOTP,
  verifyOTP,
  getFirebaseIdToken,
};