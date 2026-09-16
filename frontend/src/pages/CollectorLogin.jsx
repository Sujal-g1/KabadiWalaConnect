import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ArrowRight } from "lucide-react";

import { signInWithGoogle, getFirebaseIdToken, logoutFirebase } from "../services/auth/googleAuth";
import useAuthStore from "../store/authStore";


import firstpage from "../assets/images/cover1.webp";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
 const setUser = useAuthStore( (state) => state.setUser);

  const role = location.state?.role || "collector";

  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const roleLabel = role === "collector" ? "Collector" : "Recycler";

  // ----------------------------------------
  // GOOGLE LOGIN
  // ----------------------------------------
  const handleGoogleLogin = async () => {
  try {
    setIsLoading(true);
    setError("");

    const firebaseUser = await signInWithGoogle();

    const token = await getFirebaseIdToken(firebaseUser);
    console.log("Firebase ID Token:", token);

    const response = await fetch(
      "http://localhost:5003/api/auth/sync",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          mode: "login",
        }),
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      await logoutFirebase();

      throw new Error(
        data.message || "Login failed"
      );
    }

    setUser(data.user);

    navigate("/collector");
  } catch (error) {
    console.error(error);

    setError(
      error.message ||
        "Unable to login. Please try again."
    );
  } finally {
    setIsLoading(false);
  }
};

  // ----------------------------------------
  // MOBILE LOGIN
  // ----------------------------------------
  const handleOtpLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError(
        "Please enter a valid 10-digit mobile number."
      );
      return;
    }

    /*
      Firebase Phone Authentication currently requires
      billing for real SMS in this project.

      We are intentionally NOT calling Firebase Phone Auth.

      The mobile number UI remains available so this
      authentication method can be enabled later.
    */

    setError(
      "Mobile verification is currently unavailable. Please continue with Google."
    );
  };

  return (
    <div className="min-h-screen w-full flex items-end md:items-center justify-center bg-[#f3f7f4] relative overflow-hidden">

      {/* Background */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 1,
          ease: "easeOut",
        }}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${firstpage})`,
          backgroundSize: "cover",
          backgroundPosition: "100% center",
        }}
      >
        {/* Desktop overlay */}
        <div className="hidden md:block absolute inset-0 bg-[#eef5f0]/88" />

        {/* Mobile overlay */}
        <div className="md:hidden absolute inset-0 bg-black/30" />
      </motion.div>

      {/* Main Card */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        className="
          relative
          z-10
          flex
          w-full
          h-[92vh]
          md:h-auto
          md:max-w-5xl
          bg-white
          rounded-t-[40px]
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
            items-center
            justify-center
            p-10
            relative
          "
          style={{
            backgroundImage: `url(${firstpage})`,
            backgroundSize: "cover",
            backgroundPosition: "right center",
          }}
        >
          <div className="absolute inset-0 bg-[#14532d]/10" />

          {/* Brand badge */}
          <div className="relative z-10 self-end w-full">

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
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

              <span className="text-xs font-black tracking-wide text-[#14532d]">
                KABADIWALA CONNECT
              </span>
            </div>

          </div>
        </div>

        {/* -------------------------------- */}
        {/* FORM */}
        {/* -------------------------------- */}

        <div
          className="
            w-full
            md:w-1/2
            p-8
            md:p-12
            flex
            flex-col
            justify-start
            md:justify-center
            overflow-y-auto
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
              mb-8
              md:hidden
            "
          />

          {/* -------------------------------- */}
          {/* HEADING */}
          {/* -------------------------------- */}

          <motion.div
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.4,
            }}
            className="text-center md:text-left mb-8"
          >

            <p
              className="
                text-[10px]
                font-black
                uppercase
                tracking-[0.2em]
                text-emerald-700
                mb-2
              "
            >
              {roleLabel} Access
            </p>

            <h2
              className="
                text-3xl
                md:text-4xl
                font-black
                text-[#17201b]
                tracking-tight
              "
            >
              Welcome back
            </h2>

            <p
              className="
                text-gray-500
                mt-2
                font-medium
              "
            >
              Sign in to manage your e-waste activities.
            </p>

          </motion.div>

          {/* -------------------------------- */}
          {/* GOOGLE LOGIN */}
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
            onClick={handleGoogleLogin}
            className="
              w-full
              border-2
              border-gray-100
              py-3.5
              rounded-2xl
              flex
              items-center
              justify-center
              gap-3
              bg-white
              hover:bg-emerald-50/50
              hover:border-emerald-100
              transition-all
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >

            {isLoading ? (
              <Loader2
                className="
                  w-5
                  h-5
                  animate-spin
                  text-emerald-700
                "
              />
            ) : (
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
            )}

            <span className="font-bold text-gray-700">
              Continue with Google
            </span>

          </motion.button>

          {/* -------------------------------- */}
          {/* DIVIDER */}
          {/* -------------------------------- */}

          <div className="flex items-center my-6">

            <div className="flex-grow border-t border-gray-100" />

            <span
              className="
                px-4
                text-gray-400
                text-[10px]
                font-black
                uppercase
                tracking-[0.2em]
              "
            >
              or
            </span>

            <div className="flex-grow border-t border-gray-100" />

          </div>

          {/* -------------------------------- */}
          {/* MOBILE LOGIN */}
          {/* -------------------------------- */}

          <form
            onSubmit={handleOtpLogin}
            className="space-y-4"
          >

            <div className="space-y-1">

              <label
                className="
                  text-[10px]
                  font-black
                  text-gray-400
                  uppercase
                  ml-1
                  tracking-wider
                "
              >
                Mobile Number
              </label>

              <div className="flex gap-2">

                {/* Country code */}
                <div
                  className="
                    flex
                    items-center
                    justify-center
                    px-4
                    bg-gray-50
                    border-2
                    border-transparent
                    rounded-2xl
                    font-bold
                    text-gray-700
                  "
                >
                  +91
                </div>

                {/* Phone */}
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
                    w-full
                    px-5
                    py-4
                    bg-gray-50
                    text-gray-700
                    border-2
                    border-transparent
                    focus:border-emerald-500
                    focus:bg-white
                    rounded-2xl
                    outline-none
                    transition-all
                  "
                />

              </div>

              <p className="text-xs text-gray-400 mt-2 ml-1">
                Mobile verification will be available soon.
              </p>

            </div>

            {/* -------------------------------- */}
            {/* ERROR */}
            {/* -------------------------------- */}

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{
                    opacity: 0,
                    x: -10,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  className="
                    bg-red-50
                    text-red-600
                    p-3
                    rounded-xl
                    text-sm
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
                py-4
                rounded-2xl
                bg-emerald-600
                hover:bg-emerald-800
                text-white
                font-black
                text-lg
                transition-all
                flex
                items-center
                justify-center
                gap-2
                mt-8
                cursor-not-allowed
              "
            >

              Login with Mobile

              <ArrowRight className="w-5 h-5" />

            </motion.button>

          </form>

          {/* -------------------------------- */}
          {/* SIGNUP */}
          {/* -------------------------------- */}

          <p
            className="
              text-sm
              text-gray-500
              text-center
              mt-auto
              md:mt-10
              pb-4
              md:pb-0
            "
          >

            Don't have an account?{" "}

            <Link
              to="/collector/signup"
              state={{
                role,
              }}
              className="
                text-emerald-700
                font-extrabold
                hover:underline
                underline-offset-4
                decoration-2
              "
            >
              Create account
            </Link>

          </p>

        </div>

      </motion.div>

    </div>
  );
};

export default Login;