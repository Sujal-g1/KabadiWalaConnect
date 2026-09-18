import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import startImg from "../assets/images/cover1.webp";
import startImg2 from "../assets/images/cover4.webp";
import Logo from "../assets/images/logo.webp";

const Start = () => {
  const navigate = useNavigate();
  const [mobileLoaded, setMobileLoaded] = useState(false);
  const [desktopLoaded, setDesktopLoaded] = useState(false);

  return (
    <main className="relative min-h-[100svh] w-full overflow-hidden bg-[#0a1813] text-white selection:bg-emerald-500 selection:text-white">
      {/* 1. Low-Network Placeholder */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-[#0d2119] transition-opacity duration-1000 ${
          mobileLoaded || desktopLoaded ? "opacity-0" : "opacity-100 animate-pulse"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-[#05110c] via-[#0d271e] to-[#12382b]" />
      </div>

      {/* 2. Mobile Background Image (cover1) - Visible on screens < 768px */}
      <img
        src={startImg}
        alt=""
        aria-hidden="true"
        loading="eager"
        fetchPriority="high"
        onLoad={() => setMobileLoaded(true)}
        className={`absolute inset-0 h-full w-full object-cover object-[68%_center] transition-opacity duration-700 block md:hidden ${
          mobileLoaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* 3. Desktop Background Image (cover2) - Visible on screens >= 768px */}
      <img
        src={startImg2}
        alt=""
        aria-hidden="true"
        loading="eager"
        fetchPriority="high"
        onLoad={() => setDesktopLoaded(true)}
        className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 hidden md:block ${
          desktopLoaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* 4. Gradient Overlay with Glassmorphic Depth */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#05110c]/98 via-[#05110c]/80 to-[#05110c]/30 backdrop-blur-[2px] md:backdrop-blur-none"
      />

      {/* Mobile Vignette for Contrast */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-[#05110c]/40 via-transparent to-[#05110c]/70 md:hidden"
      />

      {/* Glow Effects */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-emerald-500/10 blur-[120px]"
      />

      {/* 5. Main Content Container */}
      <section className="relative z-10 flex min-h-[100svh] w-full items-center px-6 py-12 sm:px-10 md:px-16 lg:px-24 xl:px-32">
        <div className="w-full max-w-xl">
          {/* Logo Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "linear" }}
            className="flex items-center gap-3"
          >
            <div className="relative rounded-2xl bg-white/10 p-2.5 backdrop-blur-md ring-1 ring-white/20 shadow-2xl">
              <img
                src={Logo}
                alt="Kabadiwala Connect Logo"
                loading="eager"
                decoding="async"
                className="h-18 w-18 sm:h-25 sm:w-25 object-contain drop-shadow-md"
              />
            </div>
          </motion.div>

          {/* Brand Heading & Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="mt-6"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Kabadiwala <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-emerald-300 via-green-200 to-teal-100 bg-clip-text text-transparent">
                Connect
              </span>
            </h1>

            <p className="mt-3 max-w-md text-sm sm:text-base text-emerald-100/80 leading-relaxed font-normal">
              Empowering informal waste collectors by bridging the gap to formal, transparent, and responsible recycling networks.
            </p>
          </motion.div>

          {/* Decorative Accent Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 mb-8 h-1 w-20 origin-left rounded-full bg-gradient-to-r from-emerald-400 to-teal-500"
          />

          {/* User Role Selection Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
            className="flex w-full max-w-sm flex-col gap-3.5"
          >
            {/* Collector Role Button */}
            <button
              type="button"
              aria-label="Login as Collector"
              onClick={() =>
              navigate("/collector/login", {
                state: { role: "collector" },
              })
            }
              className="group relative flex min-h-[68px] w-full items-center gap-4 rounded-2xl bg-white/87 p-4 text-left shadow-lg shadow-black/20 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-2xl hover:shadow-emerald-900/30 focus:outline-none focus:ring-2 focus:ring-emerald-400 active:scale-[0.98]"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-2xl transition-transform duration-300 group-hover:scale-110">
                👤
              </div>

              <div className="flex-1">
                <p className="text-base font-bold text-gray-900 leading-tight">
                  Collector Login
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Sell waste material & manage collections
                </p>
              </div>

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-all duration-300 group-hover:bg-emerald-600 group-hover:text-white group-hover:translate-x-1">
                →
              </div>
            </button>

            {/* Recycler Role Button */}
            <button
              type="button"
              aria-label="Login as Recycler"
              onClick={()=> navigate("/recycler")}
            //   onClick={() =>
            //   navigate("/login", {
            //     state: { role: "recycler" },
            //   })
            // }
              className="group relative flex min-h-[68px] w-full items-center gap-4 rounded-2xl bg-emerald-800/80 p-4 text-left shadow-lg shadow-black/20 backdrop-blur-md ring-1 ring-emerald-400/30 transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-700 hover:ring-emerald-400 hover:shadow-2xl hover:shadow-emerald-950/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 active:scale-[0.98]"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-700/60 text-2xl ring-1 ring-emerald-400/30 transition-transform duration-300 group-hover:scale-110">
                ♻️
              </div>

              <div className="flex-1">
                <p className="text-base font-bold text-white leading-tight">
                  Recycler Login
                </p>
                <p className="text-xs text-emerald-200/80 mt-0.5">
                  Source verified recyclable materials
                </p>
              </div>

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-700/50 text-emerald-200 transition-all duration-300 group-hover:bg-white group-hover:text-emerald-800 group-hover:translate-x-1">
                →
              </div>
            </button>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Start;