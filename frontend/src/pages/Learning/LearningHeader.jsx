import {
  ArrowLeft,
  BookOpen,
  ChevronDown,
  Check,
  Monitor,
  Moon,
  Sun,
  MapPin,
  Sparkles,
} from "lucide-react";


import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "../../assets/images/logo.webp";
import useTranslation from "../../i18n/useTranslation";
import useLanguageStore from "../../store/languageStore";
import useThemeStore from "../../store/themeStore";
import useRegionStore from "../../store/regionStore";
import { SUPPORTED_LANGUAGES } from "../../i18n/languages";

const LearningHeader = ({
  currentStep = 0,
  totalSteps = 1,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { language, setLanguage } = useLanguageStore();
  const { theme, setTheme } = useThemeStore();
  const { city, state, status, } = useRegionStore();

  const [openDropdown, setOpenDropdown] = useState(null);
  const headerRef = useRef(null);

 const locationLabel =
  city && state
    ? `${city}`
    // ? `${city}, ${state}`
    : state ||
      t("learning.locationUnavailable");

  const current = currentStep + 1;
  const progress = (current / totalSteps) * 100;



  /* ============================================================
     TOGGLE DROPDOWN
  ============================================================ */

  const toggleDropdown = (dropdown) => {
    setOpenDropdown((currentOpen) =>
      currentOpen === dropdown ? null : dropdown
    );
  };

  const languageOptions =
  SUPPORTED_LANGUAGES.map((item) => ({
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
  }));

  const selectedLanguage =
    languageOptions.find(
      (item) => item.value === language
    ) || languageOptions[0];

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

  const selectedTheme =
    themeOptions.find(
      (item) => item.value === theme
    ) || themeOptions[0];

  const SelectedThemeIcon =
    selectedTheme.icon;

  return (
    <header
      ref={headerRef}
      className="
        sticky top-0 z-40
        bg-[var(--background)]/90
        backdrop-blur-xl
      "
    >
      <div className="mx-auto w-full max-w-6xl px-3 sm:px-6 lg:px-8">
        {/* =====================================================
            TOP BAR
        ===================================================== */}

        <div className="flex h-14 items-center sm:h-[68px]">
          {/* =================================================
              BACK
          ================================================= */}

          <button
            type="button"
            onClick={() => navigate("/")}
            aria-label={t("learning.backToHome")}
            className="
              flex h-9 w-9 shrink-0
              items-center justify-center
              rounded-xl
              text-[var(--muted)]
              transition-all duration-200
              hover:bg-[var(--surface-soft)]
              hover:text-[var(--foreground)]
              focus:outline-none
              focus:ring-2
              focus:ring-[var(--primary)]/30
              active:scale-95
              sm:h-10
              sm:w-10
            "
          >
            <ArrowLeft size={18} />
          </button>

          {/* =================================================
              BRAND
          ================================================= */}

          <div className="ml-2 flex min-w-0 items-center gap-2.5 sm:ml-3 sm:gap-3">
            
            <div
              className="
                 group flex h-9
                  items-center gap-1.5
                  rounded-xl
                  bg-[var(--accent)]
                  border border-[var(--border)]
                  bg-[var(--surface)]/85
                  px-2.5
                  text-[var(--foreground)]
                  shadow-sm
                  backdrop-blur-md
                  transition-all duration-200
                  hover:border-[var(--primary)]/30
                  hover:bg-[var(--surface-soft)]
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[var(--primary)]/20
                  active:scale-[0.98]
                  sm:h-10
                  sm:gap-2
                  sm:px-3
              "
            >
              <img
                src={Logo}
                alt={t("start.logoAlt")}
                className="
                  h-7 w-7
                  object-contain
                  sm:h-8 sm:w-8
                "
              />
            </div>

            <div className="hidden min-w-0 sm:block">
              <p className="truncate text-[13px] font-black leading-tight text-[var(--foreground)] sm:text-sm">
                Kabadiwala Connect
              </p>

              <div className="mt-0.5 flex items-center gap-1">
                <BookOpen
                  size={10}
                  className="shrink-0 text-[var(--primary)]"
                />

                <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--muted)] sm:text-[10px]">
                  {t("learning.badge")}
                </span>
              </div>
            </div>
          </div>

          {/* =================================================
              RIGHT CONTROLS
          ================================================= */}

          <div className="ml-auto flex items-center gap-1.5 sm:gap-2">

            <div
            className="
                flex max-w-[140px]
                items-center gap-1
                sm:max-w-none
            "
            title={locationLabel}
            >
            <MapPin
                size={13}
                className="shrink-0 text-[var(--primary)]"
            />

            <span className="truncate text-[9px] font-semibold text-[var(--muted)] sm:text-xs">
                <span className="sm:hidden">
                {city ||
                    t("learning.locationUnavailable")}
                </span>

                <span className="hidden sm:inline">
                {locationLabel}
                </span>
            </span>
            </div>

          <button
            type="button"
            onClick={() => navigate("/seva-ai")}
            aria-label="Open SEVA-AI"
            title="SEVA-AI"
            className="
                flex h-9 w-9 shrink-0
                items-center justify-center
                rounded-xl
                border border-[var(--border)]
                bg-[var(--surface)]
                text-[var(--primary)]
                shadow-sm
                transition-all duration-200
                hover:border-[var(--primary)]/30
                hover:bg-[var(--accent)]
                hover:shadow-md
                active:scale-95
                focus:outline-none
                focus:ring-2
                focus:ring-[var(--primary)]/30

                sm:h-10
                sm:w-auto
                sm:px-3
                sm:gap-2
            "
            >
            {/* Mobile */}
            <Sparkles
                size={17}
                strokeWidth={2.2}
                className="text-[var(--primary)] sm:hidden"
            />

            {/* Desktop */}
            <div className="hidden items-center gap-2 sm:flex">
                <Sparkles
                size={18}
                strokeWidth={2.2}
                className="text-[var(--primary)]"
                />

                <span className="text-sm font-semibold tracking-tight text-[var(--foreground)]">
                ECO-MITRA
                </span>
            </div>
        </button>

            {/* =================================================
                THEME DROPDOWN
            ================================================= */}

            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  toggleDropdown("theme")
                }
                aria-haspopup="menu"
                aria-expanded={
                  openDropdown === "theme"
                }
                className="
                  group flex h-9
                  items-center gap-1.5
                  rounded-xl
                  border border-[var(--border)]
                  bg-[var(--surface)]/85
                  px-2.5
                  text-[var(--foreground)]
                  shadow-sm
                  backdrop-blur-md
                  transition-all duration-200
                  hover:border-[var(--primary)]/30
                  hover:bg-[var(--surface-soft)]
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[var(--primary)]/20
                  active:scale-[0.98]
                  sm:h-10
                  sm:gap-2
                  sm:px-3
                "
              >
                <SelectedThemeIcon
                  size={14}
                  strokeWidth={2.4}
                  className="shrink-0 text-[var(--primary)]"
                />

                <span className="hidden text-[11px] font-bold sm:block sm:text-xs">
                  {selectedTheme.label}
                </span>

                <ChevronDown
                  size={12}
                  strokeWidth={2.5}
                  className={`
                    shrink-0
                    text-[var(--muted)]
                    transition-transform duration-200
                    ${
                      openDropdown === "theme"
                        ? "rotate-180"
                        : ""
                    }
                  `}
                />
              </button>

              <AnimatePresence>
                {openDropdown === "theme" && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -6,
                      scale: 0.97,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: -5,
                      scale: 0.97,
                    }}
                    transition={{
                      duration: 0.18,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="
                      absolute
                      right-0
                      top-[calc(100%+8px)]
                      z-50
                      w-36
                      overflow-hidden
                      rounded-2xl
                      border border-[var(--border)]
                      bg-[var(--surface)]
                      p-1.5
                      shadow-xl
                      shadow-black/10
                      backdrop-blur-xl
                    "
                    role="menu"
                  >
                    {themeOptions.map((option) => {
                      const OptionIcon =
                        option.icon;

                      const isSelected =
                        theme === option.value;

                      return (
                        <motion.button
                          key={option.value}
                          type="button"
                          role="menuitem"
                          whileTap={{
                            scale: 0.98,
                          }}
                          onClick={() => {
                            setTheme(option.value);
                            setOpenDropdown(null);
                          }}
                          className={`
                            flex w-full
                            items-center gap-2.5
                            rounded-xl
                            px-3 py-2.5
                            text-left
                            transition-colors
                            ${
                              isSelected
                                ? "bg-[var(--accent)] text-[var(--primary)]"
                                : "text-[var(--foreground)] hover:bg-[var(--surface-soft)]"
                            }
                          `}
                        >
                          <OptionIcon
                            size={15}
                            strokeWidth={2.2}
                            className="shrink-0"
                          />

                          <span className="flex-1 text-[11px] font-bold sm:text-xs">
                            {option.label}
                          </span>

                          {isSelected && (
                            <Check
                              size={14}
                              strokeWidth={2.5}
                            />
                          )}
                        </motion.button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* =================================================
                LANGUAGE DROPDOWN
            ================================================= */}

            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  toggleDropdown("language")
                }
                aria-haspopup="menu"
                aria-expanded={
                  openDropdown === "language"
                }
                className="
                  group flex h-9
                  items-center gap-1.5
                  rounded-xl
                  border border-[var(--border)]
                  bg-[var(--surface)]/85
                  px-2.5
                  text-[var(--foreground)]
                  shadow-sm
                  backdrop-blur-md
                  transition-all duration-200
                  hover:border-[var(--primary)]/30
                  hover:bg-[var(--surface-soft)]
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[var(--primary)]/20
                  active:scale-[0.98]
                  sm:h-10
                  sm:gap-2
                  sm:px-3
                "
              >
                <span
                  className="
                    flex h-5 w-5 shrink-0
                    items-center justify-center
                    rounded-md
                    bg-[var(--accent)]
                    text-[8px]
                    font-black
                    text-[var(--primary)]
                  "
                >
                  {selectedLanguage.short}
                </span>

                <span className="hidden text-[11px] font-bold sm:block sm:text-xs">
                  {selectedLanguage.label}
                </span>

                <ChevronDown
                  size={12}
                  strokeWidth={2.5}
                  className={`
                    shrink-0
                    text-[var(--muted)]
                    transition-transform duration-200
                    ${
                      openDropdown === "language"
                        ? "rotate-180"
                        : ""
                    }
                  `}
                />
              </button>

              <AnimatePresence>
                {openDropdown === "language" && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -6,
                      scale: 0.97,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: -5,
                      scale: 0.97,
                    }}
                    transition={{
                      duration: 0.18,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="
                      absolute
                      right-0
                      top-[calc(100%+8px)]
                      z-50
                      w-36
                      overflow-hidden
                      rounded-2xl
                      border border-[var(--border)]
                      bg-[var(--surface)]
                      p-1.5
                      shadow-xl
                      shadow-black/10
                      backdrop-blur-xl
                    "
                    role="menu"
                  >
                    {languageOptions.map(
                      (option) => {
                        const isSelected =
                          language ===
                          option.value;

                        return (
                          <motion.button
                            key={option.value}
                            type="button"
                            role="menuitem"
                            whileTap={{
                              scale: 0.98,
                            }}
                            onClick={() => {
                              setLanguage(
                                option.value
                              );
                              setOpenDropdown(null);
                            }}
                            className={`
                              flex w-full
                              items-center gap-2.5
                              rounded-xl
                              px-3 py-2.5
                              text-left
                              transition-colors
                              ${
                                isSelected
                                  ? "bg-[var(--accent)] text-[var(--primary)]"
                                  : "text-[var(--foreground)] hover:bg-[var(--surface-soft)]"
                              }
                            `}
                          >
                            <span
                              className="
                                flex h-6 w-6
                                shrink-0
                                items-center
                                justify-center
                                rounded-lg
                                bg-[var(--surface-soft)]
                                text-[9px]
                                font-black
                              "
                            >
                              {option.short}
                            </span>

                            <span className="flex-1 text-[11px] font-bold sm:text-xs">
                              {option.label}
                            </span>

                            {isSelected && (
                              <Check
                                size={14}
                                strokeWidth={2.5}
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

        <div className="border-t border-[var(--border)] py-2.5 sm:py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-semibold text-[var(--muted)] sm:text-xs">
                {t("learning.stepLabel")}
              </span>

              <span className="text-[11px] font-black text-[var(--foreground)] sm:text-sm">
                {current}

                <span className="mx-1 text-[var(--muted)]">
                  /
                </span>

                {totalSteps}
              </span>
            </div>

            <span className="text-[10px] font-bold text-[var(--primary)] sm:text-xs">
              {Math.round(progress)}%
            </span>
          </div>

          {/* PROGRESS BAR */}

          <div className="mt-2 h-1 overflow-hidden rounded-full bg-[var(--surface-soft)] sm:h-1.5">
            <motion.div
              className="h-full rounded-full bg-[var(--primary)]"
              initial={false}
              animate={{
                width: `${progress}%`,
              }}
              transition={{
                duration: 0.45,
                ease: "easeOut",
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default LearningHeader;