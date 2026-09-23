import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion,  } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Recycle,
} from "lucide-react";


import startImg from "../assets/images/cover1.webp";
import startImg2 from "../assets/images/cover4.webp";
import Logo from "../assets/images/logo.webp";

import useTranslation from "../i18n/useTranslation";

const Start = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [mobileLoaded, setMobileLoaded] = useState(false);
  const [desktopLoaded, setDesktopLoaded] = useState(false);

  const imagesLoaded = mobileLoaded || desktopLoaded;


  return (
    <main className="relative min-h-[100svh] w-full overflow-hidden bg-[#0a1813] text-white selection:bg-emerald-500 selection:text-white">
      {/* =====================================================
          LOW NETWORK / IMAGE PLACEHOLDER
      ===================================================== */}

      <div
        aria-hidden="true"
        className={`absolute inset-0 transition-opacity duration-1000 ${
          imagesLoaded ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="absolute inset-0 bg-[#0d2119]" />

        <div className="absolute inset-0 bg-gradient-to-tr from-[#05110c] via-[#0d271e] to-[#12382b]" />

        {!imagesLoaded && (
          <div className="absolute inset-0 animate-pulse bg-white/[0.02]" />
        )}
      </div>

      {/* =====================================================
          MOBILE IMAGE
      ===================================================== */}

      <img
        src={startImg}
        alt=""
        aria-hidden="true"
        loading="eager"
        fetchPriority="high"
        onLoad={() => setMobileLoaded(true)}
        className={`absolute inset-0 block h-full w-full object-cover object-[68%_center] transition-opacity duration-700 md:hidden ${
          mobileLoaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* =====================================================
          DESKTOP IMAGE
      ===================================================== */}

      <img
        src={startImg2}
        alt=""
        aria-hidden="true"
        loading="eager"
        fetchPriority="high"
        onLoad={() => setDesktopLoaded(true)}
        className={`absolute inset-0 hidden h-full w-full object-cover object-center transition-opacity duration-700 md:block ${
          desktopLoaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* =====================================================
          MAIN DARK OVERLAY
      ===================================================== */}

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#05110c]/95 via-[#05110c]/78 to-[#05110c]/25 md:bg-[#05110c]/45 md:bg-gradient-to-r md:from-[#05110c]/95 md:via-[#05110c]/70 md:to-[#05110c]/20"
      />

      {/* =====================================================
          MOBILE VIGNETTE
      ===================================================== */}

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-[#05110c]/30 via-transparent to-[#05110c]/85 md:hidden"
      />

      {/* =====================================================
          GLOW
      ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/4 h-80 w-80 rounded-full bg-emerald-400/10 blur-[120px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-teal-400/10 blur-[120px]"
      />

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <section className="relative z-10 flex min-h-[100svh] w-full items-center px-5 py-7 sm:px-8 sm:py-12 md:px-14 lg:px-20 xl:px-28">
        <div className="w-full max-w-xl">
          {/* =================================================
              LOGO
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: -18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
            className="flex items-center"
          >
            <div className="rounded-xl bg-white/10 p-2 shadow-2xl ring-1 ring-white/20 backdrop-blur-md sm:rounded-2xl sm:p-2.5">
              <img
                src={Logo}
                alt={t("start.logoAlt")}
                loading="eager"
                decoding="async"
                className="h-14 w-14 object-contain drop-shadow-md sm:h-20 sm:w-20"
              />
            </div>
          </motion.div>

          {/* =================================================
              TITLE
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.65,
              delay: 0.1,
              ease: "easeOut",
            }}
            className="mt-5 sm:mt-6"
          >
            <h1 className="text-3xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
              {t("start.titleLine1")}

              <span className="ml-2 inline-block bg-gradient-to-r from-emerald-300 via-green-200 to-teal-100 bg-clip-text text-transparent sm:ml-0 sm:block">
                {t("start.titleLine2")}
              </span>
            </h1>

            <p className="mt-3 max-w-md text-[13px] font-normal leading-5 text-emerald-50/75 sm:mt-4 sm:text-base sm:leading-6">
              {t("start.description")}
            </p>
          </motion.div>

          {/* =================================================
              DIVIDER
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              scaleX: 0,
            }}
            animate={{
              opacity: 1,
              scaleX: 1,
            }}
            transition={{
              duration: 0.5,
              delay: 0.2,
            }}
            className="mt-4 h-0.5 w-12 origin-left rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 sm:mt-5 sm:h-1 sm:w-20"
          />

          {/* =================================================
              LEARNING CTA
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              delay: 0.25,
              ease: "easeOut",
            }}
            className="mt-5 mb-5 sm:mt-7 sm:mb-8"
          >
            <button
              type="button"
              onClick={() => navigate("/learning")}
              className="group inline-flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/[0.08] px-2.5 py-2 text-left shadow-lg shadow-black/10 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-300/40 hover:bg-white/[0.13] hover:shadow-emerald-950/20 focus:outline-none focus:ring-2 focus:ring-emerald-400/60 active:scale-[0.98] sm:gap-3 sm:rounded-2xl sm:px-3 sm:py-2.5"
            >
              {/* Icon */}

              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-300/20 transition-transform duration-300 group-hover:scale-105 sm:h-10 sm:w-10 sm:rounded-xl">
                <BookOpen size={18} />
              </span>

              {/* Text */}

              <span className="min-w-0">
                <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-200/65">
                  {t("start.learningEyebrow")}
                </span>

                <span className="mt-0.5 flex items-center gap-1.5 text-sm font-bold text-white sm:text-[15px]">
                  {t("start.learnHowItWorks")}

                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </span>
            </button>
          </motion.div>

          {/* =================================================
              ROLE BUTTONS
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.32,
              ease: "easeOut",
            }}
            className="flex w-full max-w-sm flex-col gap-2.5 sm:gap-3 sm:mt-12"
          >
            {/* =================================================
                COLLECTOR
            ================================================= */}

            <button
              type="button"
              aria-label={t("start.collectorAria")}
              onClick={() =>
                navigate("/collector/login", {
                  state: {
                    role: "collector",
                  },
                })
              }
              className="group relative flex min-h-[60px] w-full items-center gap-3 rounded-xl bg-white/[0.92] p-3 text-left shadow-lg shadow-black/20 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-2xl hover:shadow-emerald-900/30 focus:outline-none focus:ring-2 focus:ring-emerald-400 active:scale-[0.98] sm:min-h-[68px] sm:gap-4 sm:rounded-2xl sm:p-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 transition-transform duration-300 group-hover:scale-110 sm:h-12 sm:w-12 sm:rounded-xl">
                <Recycle size={22} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[15px] font-bold leading-tight text-gray-900 sm:text-base">
                  {t("start.collectorTitle")}
                </p>

                <p className="mt-1 text-[11px] leading-4 text-gray-500 sm:text-xs">
                  {t("start.collectorDescription")}
                </p>
              </div>

              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-emerald-600 group-hover:text-white sm:h-8 sm:w-8">
                <ArrowRight size={16} />
              </div>
            </button>

            {/* =================================================
                RECYCLER
            ================================================= */}

            <button
              type="button"
              aria-label={t("start.recyclerAria")}
              onClick={() => navigate("/recycler")}
              className="group relative flex min-h-[60px] w-full items-center gap-3 rounded-xl bg-emerald-900/75 p-3 text-left shadow-lg shadow-black/20 backdrop-blur-md ring-1 ring-emerald-400/25 transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-800/85 hover:ring-emerald-300/40 hover:shadow-2xl hover:shadow-emerald-950/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 active:scale-[0.98] sm:min-h-[68px] sm:gap-4 sm:rounded-2xl sm:p-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-700/60 text-emerald-100 ring-1 ring-emerald-400/25 transition-transform duration-300 group-hover:scale-110 sm:h-12 sm:w-12 sm:rounded-xl">
                <Recycle size={22} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[15px] font-bold leading-tight text-white sm:text-base">
                  {t("start.recyclerTitle")}
                </p>

                <p className="mt-1 text-[11px] leading-4 text-emerald-200/75 sm:text-xs">
                  {t("start.recyclerDescription")}
                </p>
              </div>

              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-700/50 text-emerald-200 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-white group-hover:text-emerald-800 sm:h-8 sm:w-8">
                <ArrowRight size={16} />
              </div>
            </button>

          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Start;