import {
  ArrowLeft,
  BookOpen,
  Check,
  ChevronDown,
  MapPin,
  Monitor,
  Moon,
  Sparkles,
  Sun,
} from "lucide-react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import Logo from "../../assets/images/logo.webp";

import useTranslation from "../../i18n/useTranslation";
import useLanguageStore from "../../store/languageStore";
import useThemeStore from "../../store/themeStore";
import useRegionStore from "../../store/regionStore";
import {
  SUPPORTED_LANGUAGES,
} from "../../i18n/languages";

const LearningHeader = ({
  currentStep = 0,
  totalSteps = 1,
}) => {
  const navigate = useNavigate();

  const { t } =
    useTranslation();

  const {
    language,
    setLanguage,
  } = useLanguageStore();

  const {
    theme,
    setTheme,
  } = useThemeStore();

  const {
    city,
    state,
  } = useRegionStore();

  const [openDropdown, setOpenDropdown] =
    useState(null);

  const headerRef =
    useRef(null);

  /* ============================================================
     LOCATION
  ============================================================ */

  const locationLabel =
    city && state
      ? `${city}`
      : state ||
        t(
          "learning.locationUnavailable"
        );

  /* ============================================================
     PROGRESS
  ============================================================ */

  const current = Math.min(
    currentStep + 1,
    totalSteps
  );

  const progress =
    totalSteps > 0
      ? Math.min(
          (current / totalSteps) * 100,
          100
        )
      : 0;

  /* ============================================================
     CLOSE DROPDOWNS
  ============================================================ */

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (
        !headerRef.current?.contains(
          event.target
        )
      ) {
        setOpenDropdown(null);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpenDropdown(null);
      }
    };

    document.addEventListener(
      "pointerdown",
      handlePointerDown
    );

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
        handlePointerDown
      );

      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  /* ============================================================
     DROPDOWN TOGGLE
  ============================================================ */

  const toggleDropdown = (
    dropdown
  ) => {
    setOpenDropdown(
      (currentOpen) =>
        currentOpen === dropdown
          ? null
          : dropdown
    );
  };

  /* ============================================================
     LANGUAGE DATA
  ============================================================ */

  const languageOptions = SUPPORTED_LANGUAGES.map(
      (item) => ({
        value: item.code,
        label: item.nativeLabel,
        short:
          item.code === "hi"
            ? "हि"
            : item.code === "mr"
            ? "म"
            : item.code === "en"
            ? "EN"
            : item.code.toUpperCase(),
      })
    );

  const selectedLanguage =
    languageOptions.find(
      (item) =>
        item.value === language
    ) ||
    languageOptions[0];

  /* ============================================================
     THEME DATA
  ============================================================ */

  const themeOptions = [
    {
      value: "system",
      label: "System",
      icon: Monitor,
    },
    {
      value: "light",
      label: "Light",
      icon: Sun,
    },
    {
      value: "dark",
      label: "Dark",
      icon: Moon,
    },
  ];

  const selectedTheme = themeOptions.find(
      (item) =>
        item.value === theme
    ) ||
    themeOptions[0];

  const SelectedThemeIcon =
    selectedTheme.icon;

  return (
    <header
      ref={headerRef}
      className="
        sticky
        top-0
        z-[100]
        bg-[var(--background)]/88
        backdrop-blur-2xl
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-6xl
          px-3
          sm:px-6
          lg:px-8
        "
      >
        {/* =====================================================
            HEADER CARD
        ===================================================== */}

       <div
      className="
        relative
        overflow-visible
        rounded-b-[24px]
        border-x
        border-b
        border-[var(--border)]
        bg-[var(--surface)]/92
        shadow-[0_10px_35px_rgba(18,63,45,0.07)]
      "
    >
          {/* ==================================================
              SPARK BORDER
          ================================================== */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              rounded-b-[24px]
              opacity-65
            "
          >
            <div
              className="
                absolute
                inset-0
                rounded-b-[24px]
                bg-[conic-gradient(from_180deg_at_50%_50%,transparent_0deg,transparent_250deg,rgba(255,255,255,0.9)_286deg,rgba(255,255,255,0.22)_312deg,transparent_345deg)]
              "
            />

            <div
              className="
                absolute
                inset-px
                rounded-b-[23px]
                bg-[var(--surface)]
              "
            />
          </div>

          {/* ==================================================
              MOVING SPARK
          ================================================== */}

          {/* <motion.div initial={{
              x: "-140%",
            }}
            animate={{
              x: "140%",
            }}
            transition={{
              duration: 2.1,
              repeat: Infinity,
              repeatDelay: 5,
              ease: "easeInOut",
            }}
            className="
              pointer-events-none
              absolute
              -inset-y-10
              left-0
              z-20
              w-12
              rotate-[18deg]
              bg-gradient-to-r
              from-transparent
              via-white/25
              to-transparent
              blur-md
            "
          /> */}

          {/* ==================================================
              TOP BAR
          ================================================== */}

          <div
            className="
              relative
              z-30
              flex
              min-h-14
              items-center
              gap-2
              px-2.5
              sm:min-h-[68px]
              sm:px-3
            "
          >
            {/* =================================================
                BACK
            ================================================= */}

            <motion.button
              type="button"
              onClick={() =>
                navigate("/")
              }
              whileHover={{
                x: -2,
              }}
              whileTap={{
                scale: 0.94,
              }}
              aria-label={t(
                "learning.backToHome"
              )}
              className="
                group/back
                relative
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                overflow-hidden
                rounded-xl
                border
                border-[var(--border)]
                bg-[var(--surface)]
                text-[var(--muted)]
                shadow-[0_5px_15px_rgba(18,63,45,0.05)]
                transition-all
                duration-300
                hover:text-[var(--foreground)]
                hover:shadow-[0_8px_20px_rgba(18,63,45,0.08)]
                focus:outline-none
                focus:ring-2
                focus:ring-[var(--primary)]/20
                sm:h-10
                sm:w-10
              "
            >
              <motion.span
                initial={{
                  x: "-120%",
                }}
                whileHover={{
                  x: "150%",
                }}
                transition={{
                  duration: 0.65,
                  ease: "easeInOut",
                }}
                className="
                  pointer-events-none
                  absolute
                  -inset-y-4
                  left-0
                  w-4
                  rotate-[20deg]
                  bg-gradient-to-r
                  from-transparent
                  via-white/60
                  to-transparent
                  blur-sm
                "
              />

              <ArrowLeft
                size={18}
                className="
                  relative
                  z-10
                  transition-transform
                  duration-300
                  group-hover/back:-translate-x-0.5
                "
              />
            </motion.button>

            {/* =================================================
                BRAND
            ================================================= */}

            <div
              className="
                ml-1
                flex
                min-w-0
                items-center
                gap-2.5
                sm:ml-2.5
                sm:gap-3
              "
            >
              {/* LOGO */}

              <motion.button
                type="button"
                onClick={() =>
                  navigate("/")
                }
                whileHover={{
                  y: -1,
                  rotate: 2,
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                className="
                  group/logo
                  relative
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-xl
                  border
                  border-[var(--border)]
                  bg-[var(--surface)]
                  p-1.5
                  shadow-[0_6px_18px_rgba(18,63,45,0.06)]
                  sm:h-10
                  sm:w-10
                "
              >
                <img
                  src={Logo}
                  alt={t(
                    "start.logoAlt"
                  )}
                  className="
                    h-full
                    w-full
                    object-contain
                  "
                />

                <span
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    rounded-xl
                    ring-1
                    ring-inset
                    ring-white/60
                  "
                />

                <motion.span
                  initial={{
                    x: "-120%",
                  }}
                  whileHover={{
                    x: "150%",
                  }}
                  transition={{
                    duration: 0.65,
                    ease: "easeInOut",
                  }}
                  className="
                    pointer-events-none
                    absolute
                    -inset-y-3
                    left-0
                    w-3
                    rotate-[18deg]
                    bg-gradient-to-r
                    from-transparent
                    via-white/70
                    to-transparent
                    blur-sm
                  "
                />
              </motion.button>

              {/* BRAND TEXT */}

              <div className="hidden min-w-0 sm:block">
                <p
                  className="
                    truncate
                    text-[13px]
                    font-black
                    leading-tight
                    tracking-tight
                    text-[var(--foreground)]
                    sm:text-sm
                  "
                >
                  Kabadiwala Connect
                </p>

                <div
                  className="
                    mt-1
                    flex
                    items-center
                    gap-1.5
                  "
                >
                  <BookOpen
                    size={10}
                    strokeWidth={2.4}
                    className="
                      shrink-0
                      text-[var(--primary)]
                    "
                  />

                  <span
                    className="
                      text-[9px]
                      font-black
                      uppercase
                      tracking-[0.14em]
                      text-[var(--muted)]
                      sm:text-[10px]
                    "
                  >
                    {t(
                      "learning.badge"
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* =================================================
                RIGHT CONTROLS
            ================================================= */}

            <div
              className="
                ml-auto
                flex
                items-center
                gap-1.5
                sm:gap-2
              "
            >
              {/* LOCATION */}

              <div
                className="
                  hidden
                  max-w-[170px]
                  items-center
                  gap-1.5
                  rounded-xl
                  border
                  border-[var(--border)]
                  bg-[var(--surface)]
                  px-2.5
                  py-2
                  shadow-[0_5px_15px_rgba(18,63,45,0.045)]
                  sm:flex
                "
                title={locationLabel}
              >
                <MapPin
                  size={13}
                  strokeWidth={2.2}
                  className="
                    shrink-0
                    text-[var(--primary)]
                  "
                />

                <span
                  className="
                    truncate
                    text-[10px]
                    font-bold
                    text-[var(--muted)]
                  "
                >
                  {locationLabel}
                </span>
              </div>

              {/* MOBILE LOCATION */}

              <div
                className="
                  flex
                  max-w-[100px]
                  items-center
                  gap-1
                  sm:hidden
                "
                title={locationLabel}
              >
                <MapPin
                  size={12}
                  className="
                    shrink-0
                    text-[var(--primary)]
                  "
                />

                <span
                  className="
                    truncate
                    text-[9px]
                    font-bold
                    text-[var(--muted)]
                  "
                >
                  {city ||
                    t(
                      "learning.locationUnavailable"
                    )}
                </span>
              </div>

              {/* =================================================
                  ECO-MITRA
              ================================================= */}
              <motion.button
                type="button"
                onClick={() =>
                  navigate("/seva-ai")
                }
                aria-label="Open SEVA-AI"
                title="SEVA-AI"
                whileHover={{
                  y: -1,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                className="
                  group/mitra
                  relative
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-xl
                  border
                  border-[var(--border)]
                  bg-[var(--surface)]
                  text-[var(--foreground)]
                  shadow-[0_5px_15px_rgba(18,63,45,0.05)]
                  transition-all
                  duration-300
                  hover:shadow-[0_9px_22px_rgba(18,63,45,0.09)]
                  sm:h-10
                  sm:w-auto
                  sm:gap-2
                  sm:px-3
                "
              >
                <motion.span
                  initial={{
                    x: "-120%",
                  }}
                  whileHover={{
                    x: "150%",
                  }}
                  transition={{
                    duration: 0.7,
                    ease: "easeInOut",
                  }}
                  className="
                    pointer-events-none
                    absolute
                    -inset-y-4
                    left-0
                    z-0
                    w-5
                    rotate-[20deg]
                    bg-gradient-to-r
                    from-transparent
                    via-white/70
                    to-transparent
                    blur-sm
                  "
                />

                <Sparkles
                  size={17}
                  strokeWidth={2.2}
                  className="
                    relative
                    z-10
                    text-[var(--primary)]
                    transition-transform
                    duration-300
                    group-hover/mitra:rotate-12
                    sm:hidden
                  "
                />

                <div
                  className="
                    relative
                    z-10
                    hidden
                    items-center
                    gap-2
                    sm:flex
                  "
                >
                  <Sparkles
                    size={18}
                    strokeWidth={2.2}
                    className="
                      text-[var(--primary)]
                      transition-transform
                      duration-300
                      group-hover/mitra:rotate-12
                    "
                  />

                  <span
                    className="
                      text-sm
                      font-black
                      tracking-tight
                      text-[var(--foreground)]
                    "
                  >
                    ECO-MITRA
                  </span>
                </div>
              </motion.button>

              {/* =================================================
                  THEME DROPDOWN
              ================================================= */}

              <div className="relative">
                <motion.button
                  type="button"
                  onClick={() =>
                    toggleDropdown(
                      "theme"
                    )
                  }
                  whileTap={{
                    scale: 0.97,
                  }}
                  aria-haspopup="menu"
                  aria-expanded={
                    openDropdown ===
                    "theme"
                  }
                  className="
                    group/theme
                    relative
                    flex
                    h-9
                    items-center
                    gap-1.5
                    overflow-hidden
                    rounded-xl
                    border
                    border-[var(--border)]
                    bg-[var(--surface)]
                    px-2.5
                    text-[var(--foreground)]
                    shadow-[0_5px_15px_rgba(18,63,45,0.045)]
                    transition-all
                    duration-300
                    hover:shadow-[0_8px_20px_rgba(18,63,45,0.08)]
                    focus:outline-none
                    focus:ring-2
                    focus:ring-[var(--primary)]/20
                    sm:h-10
                    sm:gap-2
                    sm:px-3
                  "
                >
                  <SelectedThemeIcon
                    size={14}
                    strokeWidth={2.4}
                    className="
                      relative
                      z-10
                      shrink-0
                      text-[var(--primary)]
                    "
                  />

                  <span
                    className="
                      relative
                      z-10
                      hidden
                      text-[11px]
                      font-bold
                      sm:block
                      sm:text-xs
                    "
                  >
                    {selectedTheme.label}
                  </span>

                  <ChevronDown
                    size={12}
                    strokeWidth={2.5}
                    className={`
                      relative
                      z-10
                      shrink-0
                      text-[var(--muted)]
                      transition-transform
                      duration-200
                      ${
                        openDropdown ===
                        "theme"
                          ? "rotate-180"
                          : ""
                      }
                    `}
                  />
                </motion.button>

                <AnimatePresence>
                  {openDropdown ===
                    "theme" && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: -6,
                        scale: 0.96,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        y: -5,
                        scale: 0.96,
                      }}
                      transition={{
                        duration: 0.18,
                        ease: [
                          0.22,
                          1,
                          0.36,
                          1,
                        ],
                      }}
                      className="
                        absolute
                        right-0
                        top-[calc(100%+8px)]
                        z-[999]
                        w-40
                        overflow-hidden
                        rounded-2xl
                        border
                        border-[var(--border)]
                        bg-[var(--surface)]
                        p-1.5
                        shadow-[0_18px_45px_rgba(18,63,45,0.12)]
                        backdrop-blur-2xl
                      "
                      role="menu"
                    >
                      {/* DROPDOWN SPARK */}

                      <div
                        className="
                          pointer-events-none
                          absolute
                          left-4
                          right-4
                          top-0
                          h-px
                          bg-gradient-to-r
                          from-transparent
                          via-white/80
                          to-transparent
                        "
                      />

                      {themeOptions.map(
                        (option) => {
                          const OptionIcon =
                            option.icon;

                          const isSelected =
                            theme ===
                            option.value;

                          return (
                            <motion.button
                              key={
                                option.value
                              }
                              type="button"
                              role="menuitem"
                              whileHover={{
                                x: 2,
                              }}
                              whileTap={{
                                scale: 0.98,
                              }}
                              onClick={() => {
                                setTheme(
                                  option.value
                                );

                                setOpenDropdown(
                                  null
                                );
                              }}
                              className={`
                                group/option
                                relative
                                flex
                                w-full
                                items-center
                                gap-2.5
                                overflow-hidden
                                rounded-xl
                                px-3
                                py-2.5
                                text-left
                                transition-all
                                duration-200
                                ${
                                  isSelected
                                    ? `
                                      border
                                      border-[var(--border)]
                                      bg-[var(--surface)]
                                      text-[var(--primary)]
                                      shadow-[0_5px_14px_rgba(18,63,45,0.05)]
                                    `
                                    : `
                                      border
                                      border-transparent
                                      text-[var(--foreground)]
                                      hover:border-[var(--border)]
                                      hover:bg-[var(--surface)]
                                      hover:shadow-[0_5px_14px_rgba(18,63,45,0.04)]
                                    `
                                }
                              `}
                            >
                              {isSelected && (
                                <span
                                  className="
                                    absolute
                                    left-0
                                    top-1/2
                                    h-5
                                    w-0.5
                                    -translate-y-1/2
                                    rounded-r-full
                                    bg-[var(--primary)]
                                  "
                                />
                              )}

                              <OptionIcon
                                size={15}
                                strokeWidth={
                                  2.2
                                }
                                className="
                                  shrink-0
                                "
                              />

                              <span
                                className="
                                  flex-1
                                  text-[11px]
                                  font-bold
                                  sm:text-xs
                                "
                              >
                                {
                                  option.label
                                }
                              </span>

                              {isSelected && (
                                <Check
                                  size={14}
                                  strokeWidth={
                                    2.5
                                  }
                                />
                              )}
                            </motion.button>
                          );
                        }
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* =================================================
                  LANGUAGE DROPDOWN
              ================================================= */}

              <div className="relative">
                <motion.button
                  type="button"
                  onClick={() =>
                    toggleDropdown(
                      "language"
                    )
                  }
                  whileTap={{
                    scale: 0.97,
                  }}
                  aria-haspopup="menu"
                  aria-expanded={
                    openDropdown ===
                    "language"
                  }
                  className="
                    group/language
                    relative
                    flex
                    h-9
                    items-center
                    gap-1.5
                    overflow-hidden
                    rounded-xl
                    border
                    border-[var(--border)]
                    bg-[var(--surface)]
                    px-2.5
                    text-[var(--foreground)]
                    shadow-[0_5px_15px_rgba(18,63,45,0.045)]
                    transition-all
                    duration-300
                    hover:shadow-[0_8px_20px_rgba(18,63,45,0.08)]
                    focus:outline-none
                    focus:ring-2
                    focus:ring-[var(--primary)]/20
                    sm:h-10
                    sm:gap-2
                    sm:px-3
                  "
                >
                  <span
                    className="
                      relative
                      z-10
                      flex
                      h-5
                      w-5
                      shrink-0
                      items-center
                      justify-center
                      rounded-md
                      border
                      border-[var(--border)]
                      bg-[var(--surface)]
                      text-[8px]
                      font-black
                      text-[var(--primary)]
                    "
                  >
                    {
                      selectedLanguage.short
                    }
                  </span>

                  <span
                    className="
                      relative
                      z-10
                      hidden
                      text-[11px]
                      font-bold
                      sm:block
                      sm:text-xs
                    "
                  >
                    {
                      selectedLanguage.label
                    }
                  </span>

                  <ChevronDown
                    size={12}
                    strokeWidth={2.5}
                    className={`
                      relative
                      z-10
                      shrink-0
                      text-[var(--muted)]
                      transition-transform
                      duration-200
                      ${
                        openDropdown ===
                        "language"
                          ? "rotate-180"
                          : ""
                      }
                    `}
                  />
                </motion.button>

                <AnimatePresence>
                  {openDropdown ===
                    "language" && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: -6,
                        scale: 0.96,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        y: -5,
                        scale: 0.96,
                      }}
                      transition={{
                        duration: 0.18,
                        ease: [
                          0.22,
                          1,
                          0.36,
                          1,
                        ],
                      }}
                      className="
                        absolute
                        right-0
                        top-[calc(100%+8px)]
                        z-[999]
                        w-44
                        max-h-[min(420px,70vh)]
                        overflow-y-auto
                        rounded-2xl
                        border
                        border-[var(--border)]
                        bg-[var(--surface)]
                        p-1.5
                        shadow-[0_18px_45px_rgba(18,63,45,0.12)]
                        backdrop-blur-2xl
                      "
                      role="menu"
                    >
                      {/* DROPDOWN SPARK */}

                      <div
                        className="
                          pointer-events-none
                          absolute
                          left-4
                          right-4
                          top-0
                          h-px
                          bg-gradient-to-r
                          from-transparent
                          via-white/80
                          to-transparent
                        "
                      />

                      {languageOptions.map(
                        (option) => {
                          const isSelected =
                            language ===
                            option.value;

                          return (
                            <motion.button
                              key={
                                option.value
                              }
                              type="button"
                              role="menuitem"
                              whileHover={{
                                x: 2,
                              }}
                              whileTap={{
                                scale: 0.98,
                              }}
                              onClick={() => {
                                setLanguage(
                                  option.value,
                                  "user"
                                );

                                setOpenDropdown(
                                  null
                                );
                              }}
                              className={`
                                group/languageOption
                                relative
                                flex
                                w-full
                                items-center
                                gap-2.5
                                overflow-hidden
                                rounded-xl
                                px-3
                                py-2.5
                                text-left
                                transition-all
                                duration-200
                                ${
                                  isSelected
                                    ? `
                                      border
                                      border-[var(--border)]
                                      bg-[var(--surface)]
                                      text-[var(--primary)]
                                      shadow-[0_5px_14px_rgba(18,63,45,0.05)]
                                    `
                                    : `
                                      border
                                      border-transparent
                                      text-[var(--foreground)]
                                      hover:border-[var(--border)]
                                      hover:bg-[var(--surface)]
                                      hover:shadow-[0_5px_14px_rgba(18,63,45,0.04)]
                                    `
                                }
                              `}
                            >
                              {isSelected && (
                                <span
                                  className="
                                    absolute
                                    left-0
                                    top-1/2
                                    h-5
                                    w-0.5
                                    -translate-y-1/2
                                    rounded-r-full
                                    bg-[var(--primary)]
                                  "
                                />
                              )}

                              <span
                                className="
                                  flex
                                  h-6
                                  w-6
                                  shrink-0
                                  items-center
                                  justify-center
                                  rounded-lg
                                  border
                                  border-[var(--border)]
                                  bg-[var(--surface)]
                                  text-[9px]
                                  font-black
                                  text-[var(--primary)]
                                  shadow-sm
                                "
                              >
                                {
                                  option.short
                                }
                              </span>

                              <span
                                className="
                                  flex-1
                                  text-[11px]
                                  font-bold
                                  sm:text-xs
                                "
                              >
                                {
                                  option.label
                                }
                              </span>

                              {isSelected && (
                                <Check
                                  size={14}
                                  strokeWidth={
                                    2.5
                                  }
                                />
                              )}
                            </motion.button>
                          );
                        }
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* =====================================================
              PROGRESS AREA
          ===================================================== */}

          <div
            className="
              relative
              border-t
              border-[var(--border)]
              px-3
              py-2.5
              sm:px-4
              sm:py-3
            "
          >
            <div
              className="
                flex
                items-center
                justify-between
                gap-4
              "
            >
              {/* LEFT */}

              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >
                <div
                  className="
                    flex
                    h-6
                    w-6
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-[var(--border)]
                    bg-[var(--surface)]
                    text-[var(--primary)]
                    shadow-[0_4px_12px_rgba(18,63,45,0.04)]
                    sm:h-7
                    sm:w-7
                  "
                >
                  <BookOpen
                    size={12}
                    strokeWidth={2.4}
                  />
                </div>

                <div className="flex items-center gap-1.5">
                  <span
                    className="
                      text-[10px]
                      font-semibold
                      text-[var(--muted)]
                      sm:text-xs
                    "
                  >
                    {t(
                      "learning.stepLabel"
                    )}
                  </span>

                  <span
                    className="
                      text-[11px]
                      font-black
                      text-[var(--foreground)]
                      sm:text-sm
                    "
                  >
                    {current}

                    <span className="mx-1 text-[var(--muted-foreground)]">
                      /
                    </span>

                    {totalSteps}
                  </span>
                </div>
              </div>

              {/* RIGHT */}

              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >
                <span
                  className="
                    text-[10px]
                    font-black
                    text-[var(--primary)]
                    sm:text-xs
                  "
                >
                  {Math.round(progress)}%
                </span>
              </div>
            </div>

            {/* PROGRESS TRACK */}

            <div
              className="
                relative
                mt-2.5
                h-1.5
                overflow-hidden
                rounded-full
                bg-[var(--surface-soft)]
                ring-1
                ring-inset
                ring-[var(--border)]
                sm:h-2
              "
            >
              {/* TRACK HIGHLIGHT */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-gradient-to-r
                  from-transparent
                  via-white/35
                  to-transparent
                  opacity-50
                "
              />

              {/* PROGRESS */}

              <motion.div
                className="
                  relative
                  h-full
                  overflow-hidden
                  rounded-full
                  bg-[linear-gradient(90deg,#123f2d_0%,#18794e_55%,#35a873_100%)]
                  shadow-[0_0_12px_rgba(24,121,78,0.14)]
                "
                initial={false}
                animate={{
                  width: `${progress}%`,
                }}
                transition={{
                  duration: 0.45,
                  ease: "easeOut",
                }}
              >
                <motion.span
                  animate={{
                    x: [
                      "-120%",
                      "180%",
                    ],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 2.5,
                    ease: "easeInOut",
                  }}
                  className="
                    absolute
                    -inset-y-1
                    left-0
                    w-8
                    rotate-[18deg]
                    bg-white/25
                    blur-sm
                  "
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LearningHeader;