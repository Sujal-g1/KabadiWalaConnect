import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ArrowRight } from "lucide-react";

import {
  signInWithGoogle,
  getFirebaseIdToken,
  logoutFirebase
} from "../services/auth/googleAuth";
import useAuthStore from "../store/authStore";

import firstpage from "../assets/images/cover1.webp";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const setUser = useAuthStore( (state) => state.setUser);

  const role = location.state?.role || "collector";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [language, setLanguage] = useState("hi");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const roleLabel =
    role === "collector" ? "Collector" : "Recycler";

  // ----------------------------------------
  // GOOGLE SIGNUP
  // ----------------------------------------

const handleGoogleSignup = async () => {
  try {
    setIsLoading(true);
    setError("");

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !phone.trim() ||
      !city.trim() ||
      !language
    ) {
      setError("Please fill all required information first.");
      setIsLoading(false);
      return;
    }

    // 1. Google authentication
    const firebaseUser = await signInWithGoogle();

    // 2. Get Firebase ID token
    const token = await getFirebaseIdToken(firebaseUser);

    console.log("Firebase ID Token:", token);

    // 3. Send data to backend
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/sync`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          mode: "signup",
          firstName,
          lastName,
          phoneNumber: phone,
          email,
          city,
          language,
        }),
      }
    );

    const data = await response.json();

    console.log("Backend response:", data);

    if (!response.ok || !data.success) {
      await logoutFirebase();

      throw new Error(
        data.message || "Signup failed"
      );
    }

    setUser(data.user);

    navigate("/collector");
  } catch (error) {
    console.error("Google signup error:", error);

    setError(
      error.message ||
        "Unable to create account."
    );
  } finally {
    setIsLoading(false);
  }
};

  // ----------------------------------------
  // MOBILE SIGNUP
  // ----------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!firstName.trim()) {
      setError("Please enter your first name.");
      return;
    }

    if (!lastName.trim()) {
      setError("Please enter your last name.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError(
        "Please enter a valid 10-digit mobile number."
      );
      return;
    }

    if (!city.trim()) {
      setError("Please enter your city or area.");
      return;
    }

    /*
      Firebase Phone Authentication is intentionally
      not called here.

      Real SMS authentication requires billing for
      this Firebase project.

      We keep the mobile signup UI so this method
      can be enabled later.
    */

    setError(
      "Mobile verification is currently unavailable. Please continue with Google."
    );
  };

  return (
    <div
      className="
        min-h-screen
        w-full
        flex
        items-end
        md:items-center
        justify-center
        bg-[#043b12]
        relative
        overflow-hidden
      "
    >

      {/* -------------------------------- */}
      {/* BACKGROUND */}
      {/* -------------------------------- */}

      <motion.div
        initial={{
          scale: 1.05,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        className="
          absolute
          inset-0
          z-0
          bg-cover
          bg-[position:100%_center]
        "
        style={{
          backgroundImage: `url(${firstpage})`,
        }}
      >

        {/* Desktop */}
        <div
          className="
            hidden
            md:block
            absolute
            inset-0
            bg-[#105f24]/88
          "
        />

        {/* Mobile */}
        <div
          className="
            md:hidden
            absolute
            inset-0
            bg-black/30
          "
        />

      </motion.div>

      {/* -------------------------------- */}
      {/* MAIN CARD */}
      {/* -------------------------------- */}

      <motion.div
        initial={{
          y: "100%",
        }}
        animate={{
          y: 0,
        }}
        transition={{
          duration: 0.7,
          ease: "easeOut",
        }}
        className="
          relative
          z-10
          flex
          w-full
          h-[95vh]
          md:h-[88vh]
          max-h-[850px]
          md:max-w-4xl
          lg:max-w-5xl
          bg-white
          rounded-t-[32px]
          md:rounded-3xl
          shadow-[0_-10px_40px_rgba(0,0,0,0.08)]
          md:shadow-2xl
          overflow-hidden
        "
      >

        {/* -------------------------------- */}
        {/* DESKTOP IMAGE */}
        {/* -------------------------------- */}

        <div
          className="
            hidden
            md:flex
            w-1/2
            h-full
            items-end
            p-8
            relative
            bg-cover
            bg-[position:100%_center]
          "
          style={{
            backgroundImage: `url(${firstpage})`,
          }}
        >

          <div
            className="
              absolute
              inset-0
              bg-[#14532d]/10
            "
          />

          {/* Brand */}
          <div className="relative z-10 w-full">

            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-white/90
                backdrop-blur-md
                px-4
                py-2
                shadow-lg
              "
            >

              <div
                className="
                  h-2.5
                  w-2.5
                  rounded-full
                  bg-emerald-500
                "
              />

              <span
                className="
                  text-xs
                  font-black
                  tracking-wide
                  text-[#14532d]
                "
              >
                KABADIWALA CONNECT
              </span>

            </div>

          </div>

        </div>

        {/* -------------------------------- */}
        {/* FORM COLUMN */}
        {/* -------------------------------- */}

        <div
          className="
            w-full
            md:w-1/2
            h-full
            px-5
            py-6
            sm:px-8
            md:py-8
            flex
            flex-col
            overflow-y-auto
            custom-scrollbar
          "
        >

          {/* Mobile handle */}
          <div
            className="
              w-12
              h-1.5
              bg-emerald-100
              rounded-full
              mx-auto
              mb-4
              shrink-0
              md:hidden
            "
          />

          {/* -------------------------------- */}
          {/* HEADING */}
          {/* -------------------------------- */}

          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.2,
            }}
            className="
              text-center
              md:text-left
              mb-4
              shrink-0
            "
          >

            <p
              className="
                text-[10px]
                font-black
                text-emerald-700
                uppercase
                tracking-[0.2em]
                mb-1
              "
            >
              Join as a {roleLabel}
            </p>

            <h2
              className="
                text-2xl
                sm:text-3xl
                font-black
                text-[#17201b]
                tracking-tight
                pt-3
              "
            >
              Create your account
            </h2>

            <p
              className="
                text-xs
                sm:text-sm
                text-gray-500
                mt-1
                font-medium
              "
            >
              Get connected and start managing e-waste.
            </p>

          </motion.div>

          {/* -------------------------------- */}
          {/* GOOGLE SIGNUP */}
          {/* -------------------------------- */}

          <motion.button
            whileHover={{
              scale: 1.01,
            }}
            whileTap={{
              scale: 0.98,
            }}
            disabled={isLoading}
            type="button"
            onClick={handleGoogleSignup}
            className="
              w-full
              border
              border-gray-200
              my-5
              py-3
              rounded-xl
              flex
              items-center
              justify-center
              gap-3
              bg-white
              hover:bg-gray-50
              hover:border-emerald-100
              transition-all
              disabled:opacity-50
              disabled:cursor-not-allowed
              shrink-0
            "
          >

            {isLoading ? (
              <Loader2
                className="
                  w-4
                  h-4
                  animate-spin
                  text-emerald-700
                "
              />
            ) : (
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-4 h-4"
              />
            )}

            <span
              className="
                text-sm
                font-bold
                text-gray-700
              "
            >
              Continue with Google
            </span>

          </motion.button>

          {/* -------------------------------- */}
          {/* DIVIDER */}
          {/* -------------------------------- */}

          <div
            className="
              flex
              items-center
              my-3
              shrink-0
            "
          >

            <div
              className="
                flex-grow
                border-t
                border-gray-100
              "
            />

            <span
              className="
                px-3
                text-gray-400
                text-[10px]
                font-black
                uppercase
                tracking-[0.2em]
              "
            >
              or
            </span>

            <div
              className="
                flex-grow
                border-t
                border-gray-100
              "
            />

          </div>

          {/* -------------------------------- */}
          {/* SIGNUP FORM */}
          {/* -------------------------------- */}

          <form
            onSubmit={handleSubmit}
            className="
              space-y-3
              flex-1
            "
          >

            {/* First + Last Name */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  className="
                    block
                    text-[10px]
                    font-black
                    text-gray-400
                    uppercase
                    tracking-wider
                    mb-1
                  "
                >
                  First Name
                </label>

                <input
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  required
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    setError("");
                  }}
                  className="
                    w-full
                    px-3.5
                    py-2.5
                    text-sm
                    bg-gray-50
                    text-gray-800
                    border
                    border-transparent
                    rounded-xl
                    focus:border-emerald-500
                    focus:bg-white
                    focus:outline-none
                    transition-all
                  "
                />

              </div>

              <div>

                <label
                  className="
                    block
                    text-[10px]
                    font-black
                    text-gray-400
                    uppercase
                    tracking-wider
                    mb-1
                  "
                >
                  Last Name
                </label>

                <input
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  required
                  onChange={(e) => {
                    setLastName(e.target.value);
                    setError("");
                  }}
                  className="
                    w-full
                    px-3.5
                    py-2.5
                    text-sm
                    bg-gray-50
                    text-gray-800
                    border
                    border-transparent
                    rounded-xl
                    focus:border-emerald-500
                    focus:bg-white
                    focus:outline-none
                    transition-all
                  "
                />

              </div>

            </div>

            {/* -------------------------------- */}
            {/* MOBILE */}
            {/* -------------------------------- */}

            <div className="space-y-1">

              <label
                className="
                  block
                  text-[10px]
                  font-black
                  text-gray-400
                  uppercase
                  tracking-wider
                "
              >
                Mobile Number *
              </label>

              <div className="flex gap-2">

                <div
                  className="
                    flex
                    items-center
                    justify-center
                    px-3
                    bg-gray-50
                    border
                    border-transparent
                    rounded-xl
                    text-xs
                    font-bold
                    text-gray-700
                  "
                >
                  +91
                </div>

                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="9876543210"
                  value={phone}
                  required
                  onChange={(e) => {
                    setPhone(
                      e.target.value.replace(
                        /\D/g,
                        ""
                      )
                    );

                    setError("");
                  }}
                  className="
                    flex-1
                    px-3.5
                    py-2.5
                    text-sm
                    bg-gray-50
                    text-gray-800
                    border
                    border-transparent
                    focus:border-emerald-500
                    focus:bg-white
                    rounded-xl
                    outline-none
                    transition-all
                  "
                />

              </div>

              <p
                className="
                  text-[11px]
                  text-gray-400
                  mt-1
                "
              >
                Mobile verification will be available soon.
              </p>

            </div>

            {/* -------------------------------- */}
            {/* EMAIL */}
            {/* -------------------------------- */}

            <div className="space-y-1">

              <label
                className="
                  block
                  text-[10px]
                  font-black
                  text-gray-400
                  uppercase
                  tracking-wider
                "
              >
                Email Address
              </label>

              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                className="
                  w-full
                  px-3.5
                  py-2.5
                  text-sm
                  bg-gray-50
                  text-gray-800
                  border
                  border-transparent
                  focus:border-emerald-500
                  focus:bg-white
                  rounded-xl
                  outline-none
                  transition-all
                "
              />

            </div>

            {/* -------------------------------- */}
            {/* CITY + LANGUAGE */}
            {/* -------------------------------- */}

            <div className="grid grid-cols-2 gap-3">

              <div>

                <label
                  className="
                    block
                    text-[10px]
                    font-black
                    text-gray-400
                    uppercase
                    tracking-wider
                    mb-1
                  "
                >
                  City / Area
                </label>

                <input
                  type="text"
                  placeholder="Your location"
                  value={city}
                  required
                  onChange={(e) => {
                    setCity(e.target.value);
                    setError("");
                  }}
                  className="
                    w-full
                    px-3.5
                    py-2.5
                    text-sm
                    bg-gray-50
                    text-gray-800
                    border
                    border-transparent
                    focus:border-emerald-500
                    focus:bg-white
                    rounded-xl
                    outline-none
                    transition-all
                  "
                />

              </div>

              <div>

                <label
                  className="
                    block
                    text-[10px]
                    font-black
                    text-gray-400
                    uppercase
                    tracking-wider
                    mb-1
                  "
                >
                  Language
                </label>

                <select
                  value={language}
                  onChange={(e) =>
                    setLanguage(e.target.value)
                  }
                  className="
                    w-full
                    px-3.5
                    py-2.5
                    text-sm
                    bg-gray-50
                    text-gray-800
                    border
                    border-transparent
                    focus:border-emerald-500
                    focus:bg-white
                    rounded-xl
                    outline-none
                    transition-all
                  "
                >
                  <option value="hi">
                    हिंदी
                  </option>

                  <option value="mr">
                    मराठी
                  </option>

                  <option value="en">
                    English
                  </option>
                </select>

              </div>

            </div>

            {/* -------------------------------- */}
            {/* ERROR */}
            {/* -------------------------------- */}

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -5,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  className="
                    bg-red-50
                    text-red-600
                    p-2.5
                    rounded-xl
                    text-xs
                    font-bold
                    flex
                    items-center
                    justify-center
                    gap-2
                  "
                >

                  <div
                    className="
                      w-1.5
                      h-1.5
                      bg-red-500
                      rounded-full
                      shrink-0
                    "
                  />

                  {error}

                </motion.div>
              )}
            </AnimatePresence>

            {/* -------------------------------- */}
            {/* MOBILE BUTTON */}
            {/* -------------------------------- */}

            <motion.button
              whileHover={{
                scale: 1.01,
              }}
              whileTap={{
                scale: 0.98,
              }}
              disabled={isLoading}
              type="submit"
              className="
                w-full
                py-3.5
                rounded-xl
                bg-gray-100
                hover:bg-gray-200
                text-gray-500
                font-bold
                text-base
                transition-all
                flex
                items-center
                justify-center
                gap-2
                mt-4
                cursor-not-allowed
              "
            >

              Continue with Mobile

              <ArrowRight className="w-4 h-4" />

            </motion.button>

          </form>

          {/* -------------------------------- */}
          {/* LOGIN LINK */}
          {/* -------------------------------- */}

          <p
            className="
              text-xs
              text-gray-500
              text-center
              pt-4
              mt-auto
              shrink-0
            "
          >

            Already have an account?{" "}

            <Link
              to="/collector/login"
              state={{
                role,
              }}
              className="
                text-emerald-700
                font-extrabold
                hover:underline
                underline-offset-2
              "
            >
              Sign in
            </Link>

          </p>

        </div>

      </motion.div>

    </div>
  );
};

export default Signup;