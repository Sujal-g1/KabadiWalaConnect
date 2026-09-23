import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  IndianRupee,
  Languages,
  LogIn,
  Recycle,
  ShieldCheck,
  Sparkles,
  Square,
  Volume2,
  WalletCards,
  WifiOff,
} from "lucide-react";

import {
  motion,
} from "framer-motion";

import {
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import useTranslation from "../../i18n/useTranslation";
import useLanguageStore from "../../store/languageStore";

import {
  speakLearningText,
  stopLearningSpeech,
} from "./learningVoice";

import { LEARNING_STEPS } from "./learningData";

import LearningHeader from "./LearningHeader";

const LearningPage = () => {
  const navigate = useNavigate();

  const { t } =
    useTranslation();

  const { language } =
    useLanguageStore();

  const [currentStep, setCurrentStep] =
    useState(0);

  const [isSpeaking, setIsSpeaking] =
    useState(false);

  const step =
    LEARNING_STEPS[currentStep];

  /* ============================================================
     PROGRESS
  ============================================================ */

  const progress = useMemo(
    () =>
      Math.round(
        ((currentStep + 1) /
          LEARNING_STEPS.length) *
          100
      ),
    [currentStep]
  );

  /* ============================================================
     VOICE
  ============================================================ */

  const handleSpeak = () => {
    if (isSpeaking) {
      stopLearningSpeech();
      setIsSpeaking(false);
      return;
    }

    const voiceContent = [
      step.voice?.intro,
      ...(step.voice?.sections || []),
    ]
      .filter(Boolean)
      .map((key) => t(key))
      .filter(Boolean);

    speakLearningText(
      voiceContent,
      {
        language,

        onStart: () => {
          setIsSpeaking(true);
        },

        onEnd: () => {
          setIsSpeaking(false);
        },

        onError: (error) => {
          console.error(
            "Learning speech failed:",
            error
          );

          setIsSpeaking(false);
        },
      }
    );
  };

  /* ============================================================
     NAVIGATION
  ============================================================ */

  const handleNext = () => {
    if (
      currentStep <
      LEARNING_STEPS.length - 1
    ) {
      setCurrentStep(
        (prev) => prev + 1
      );

      return;
    }

    navigate("/collector/login");
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(
        (prev) => prev - 1
      );
    }
  };

  const Icon = step.icon;

  return (
    <div
      className="
        min-h-screen
        overflow-x-hidden
        bg-[var(--background)]
        text-[var(--foreground)]
      "
    >
      {/* ========================================================
          HEADER
      ======================================================== */}

      <LearningHeader
        currentStep={currentStep}
        totalSteps={LEARNING_STEPS.length}
      />

      {/* ========================================================
          MAIN
      ======================================================== */}

      <main
        className="
          relative
          mx-auto
          w-full
          max-w-6xl
          px-4
          py-7
          sm:px-6
          sm:py-9
          lg:px-8
        "
      >
        {/* ======================================================
            BACKGROUND DECORATION
        ====================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            -right-32
            top-12
            h-72
            w-72
            rounded-full
            bg-emerald-300/[0.045]
            blur-[100px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -left-32
            top-[520px]
            h-72
            w-72
            rounded-full
            bg-teal-300/[0.035]
            blur-[100px]
          "
        />

        {/* ======================================================
            INTRO
        ====================================================== */}

        <motion.section
          initial={{
            opacity: 0,
            y: 14,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.45,
            ease: "easeOut",
          }}
          className="
            relative
            z-10
            mb-7
          "
        >
          <div
            className="
              max-w-3xl
            "
          >
            {/* BADGE */}

            <div
              className="
                inline-flex
                items-center
                gap-1.5
                rounded-full
                border
                border-[var(--border)]
                bg-[var(--surface)]
                px-3
                py-1.5
                text-[10px]
                font-black
                uppercase
                tracking-[0.08em]
                text-[var(--primary)]
                shadow-[0_6px_18px_rgba(18,63,45,0.05)]
              "
            >
              <CircleHelp
                size={13}
                strokeWidth={2.3}
              />

              {t("learning.badge")}
            </div>

            {/* TITLE */}

            <h1
              className="
                mt-4
                text-3xl
                font-black
                leading-[1.08]
                tracking-[-0.035em]
                text-[var(--foreground)]
                sm:text-4xl
                lg:text-[44px]
              "
            >
              {t("learning.heading")}
            </h1>

            {/* DESCRIPTION */}

            <p
              className="
                mt-3
                max-w-2xl
                text-sm
                leading-6
                text-[var(--muted)]
                sm:text-base
              "
            >
              {t("learning.subheading")}
            </p>
          </div>
        </motion.section>

        {/* ======================================================
            PROGRESS
        ====================================================== */}

        <motion.section
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.4,
            delay: 0.05,
          }}
          className="
            group
            relative
            z-10
            mb-7
            overflow-hidden
            rounded-[22px]
            border
            border-[var(--border)]
            bg-[var(--surface)]
            p-4
            shadow-[0_10px_30px_rgba(18,63,45,0.06)]
            sm:p-5
          "
        >
          {/* SPARK BORDER */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              rounded-[22px]
              bg-[conic-gradient(from_180deg_at_50%_50%,transparent_0deg,transparent_250deg,rgba(255,255,255,0.9)_286deg,rgba(255,255,255,0.2)_312deg,transparent_345deg)]
              opacity-60
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              inset-px
              rounded-[21px]
              bg-[var(--surface)]
            "
          />

          <div className="relative z-10">
            <div className="flex items-center justify-between gap-4">
              {/* LEFT */}

              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-[var(--border)]
                    bg-[var(--surface)]
                    text-[var(--primary)]
                    shadow-[0_6px_16px_rgba(18,63,45,0.06)]
                  "
                >
                  <Sparkles
                    size={17}
                    strokeWidth={2.2}
                  />
                </div>

                <div>
                  <p
                    className="
                      text-xs
                      font-semibold
                      text-[var(--muted)]
                    "
                  >
                    {t(
                      "learning.stepLabel"
                    )}
                  </p>

                  <p
                    className="
                      mt-0.5
                      text-sm
                      font-black
                      text-[var(--foreground)]
                    "
                  >
                    {currentStep + 1}
                    <span className="mx-1 text-[var(--muted-foreground)]">
                      /
                    </span>
                    {LEARNING_STEPS.length}
                  </p>
                </div>
              </div>

              {/* RIGHT */}

              <div
                className="
                  rounded-full
                  border
                  border-[var(--border)]
                  bg-[var(--surface)]
                  px-2.5
                  py-1
                  text-[10px]
                  font-black
                  text-[var(--primary)]
                  shadow-[0_4px_12px_rgba(18,63,45,0.04)]
                "
              >
                {progress}%
              </div>
            </div>

            {/* PROGRESS TRACK */}

            <div
              className="
                relative
                mt-4
                h-2
                overflow-hidden
                rounded-full
                border
                border-[var(--border)]
                bg-[var(--surface-soft)]
              "
            >
              <motion.div
                initial={false}
                animate={{
                  width: `${progress}%`,
                }}
                transition={{
                  duration: 0.45,
                  ease: "easeOut",
                }}
                className="
                  relative
                  h-full
                  overflow-hidden
                  rounded-full
                  bg-[linear-gradient(90deg,#123f2d_0%,#18794e_55%,#35a873_100%)]
                  shadow-[0_0_14px_rgba(24,121,78,0.16)]
                "
              >
                <motion.span
                  animate={{
                    x: [
                      "-120%",
                      "180%",
                    ],
                  }}
                  transition={{
                    duration: 1.6,
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
        </motion.section>

        {/* ======================================================
            CURRENT LESSON
        ====================================================== */}

        <motion.section
          initial={{
            opacity: 0,
            y: 12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.45,
            delay: 0.1,
          }}
          className="
            relative
            z-10
            grid
            gap-5
            lg:grid-cols-[1.05fr_0.95fr]
          "
        >
          {/* ====================================================
              VISUAL / AUDIO CARD
          ==================================================== */}

          <div
            className="
              group/visual
              relative
              overflow-hidden
              rounded-[28px]
              border
              border-[var(--border)]
              bg-[var(--surface)]
              shadow-[0_14px_42px_rgba(18,63,45,0.08)]
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:shadow-[0_20px_50px_rgba(18,63,45,0.11)]
            "
          >
            {/* SPARK BORDER */}

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                rounded-[28px]
                bg-[conic-gradient(from_200deg_at_50%_50%,transparent_0deg,transparent_245deg,rgba(255,255,255,0.9)_282deg,rgba(255,255,255,0.2)_315deg,transparent_350deg)]
                opacity-60
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                inset-px
                rounded-[27px]
                bg-[var(--surface)]
              "
            />

            {/* DECORATIVE RINGS */}

            <div
              className="
                pointer-events-none
                absolute
                right-[-80px]
                top-[-80px]
                h-56
                w-56
                rounded-full
                border
                border-[var(--border)]
                opacity-60
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                right-[-50px]
                top-[-50px]
                h-44
                w-44
                rounded-full
                border
                border-[var(--border)]
                opacity-40
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                bottom-[-90px]
                left-[-70px]
                h-48
                w-48
                rounded-full
                bg-emerald-300/[0.035]
                blur-[70px]
              "
            />

            <div
              className="
                relative
                z-10
                flex
                min-h-[320px]
                flex-col
                items-center
                justify-center
                p-6
                text-center
                sm:min-h-[370px]
                sm:p-8
              "
            >
              {/* ICON */}

              <motion.div
                key={currentStep}
                initial={{
                  opacity: 0,
                  scale: 0.85,
                  rotate: -4,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 220,
                  damping: 18,
                }}
                className="
                  relative
                  flex
                  h-24
                  w-24
                  items-center
                  justify-center
                  rounded-[28px]
                  border
                  border-[var(--border)]
                  bg-[var(--surface)]
                  text-[var(--primary)]
                  shadow-[0_14px_35px_rgba(18,63,45,0.10)]
                  sm:h-28
                  sm:w-28
                "
              >
                {/* ICON RING */}

                <span
                  className="
                    pointer-events-none
                    absolute
                    inset-2
                    rounded-[22px]
                    border
                    border-[var(--border)]
                  "
                />

                <Icon
                  size={46}
                  strokeWidth={1.8}
                  className="
                    relative
                    z-10
                  "
                />
              </motion.div>

              {/* LABEL */}

              <p
                className="
                  mt-6
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.2em]
                  text-[var(--muted)]
                "
              >
                {t(
                  "learning.listenLabel"
                )}
              </p>

              {/* SPEAK BUTTON */}

              <motion.button
                type="button"
                onClick={handleSpeak}
                whileHover={{
                  y: -2,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                className={`
                  group/speak
                  relative
                  mt-3
                  inline-flex
                  min-h-12
                  items-center
                  gap-2
                  overflow-hidden
                  rounded-2xl
                  border
                  px-5
                  py-3
                  text-sm
                  font-black
                  shadow-[0_8px_22px_rgba(18,63,45,0.08)]
                  transition-all
                  duration-300

                  ${
                    isSpeaking
                      ? `
                        border-amber-400/50
                        bg-[var(--surface)]
                        text-amber-700
                      `
                      : `
                        border-[var(--foreground)]
                        bg-[var(--foreground)]
                        text-[var(--surface)]
                        hover:shadow-[0_12px_28px_rgba(18,63,45,0.16)]
                      `
                  }
                `}
              >
                {!isSpeaking && (
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
                      w-5
                      rotate-[20deg]
                      bg-gradient-to-r
                      from-transparent
                      via-white/30
                      to-transparent
                      blur-sm
                    "
                  />
                )}

                {isSpeaking ? (
                  <Square
                    size={16}
                    fill="currentColor"
                    className="relative z-10"
                  />
                ) : (
                  <Volume2
                    size={18}
                    className="relative z-10"
                  />
                )}

                <span className="relative z-10">
                  {isSpeaking
                    ? t(
                        "learning.stopSpeaking"
                      )
                    : t(
                        "learning.listen"
                      )}
                </span>
              </motion.button>

              {/* VOICE HINT */}

              <p
                className="
                  mt-3
                  max-w-xs
                  text-[11px]
                  leading-5
                  text-[var(--muted)]
                "
              >
                {t(
                  "learning.voiceHint"
                )}
              </p>
            </div>
          </div>

          {/* ====================================================
              EXPLANATION
          ==================================================== */}

          <div
            className="
              group/explanation
              relative
              overflow-hidden
              rounded-[28px]
              border
              border-[var(--border)]
              bg-[var(--surface)]
              p-5
              shadow-[0_14px_42px_rgba(18,63,45,0.07)]
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:shadow-[0_20px_50px_rgba(18,63,45,0.10)]
              sm:p-6
            "
          >
            {/* TOP SPARK */}

            <div
              className="
                pointer-events-none
                absolute
                left-8
                right-8
                top-0
                h-px
                bg-gradient-to-r
                from-transparent
                via-white/80
                to-transparent
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                -right-14
                -top-14
                h-32
                w-32
                rounded-full
                bg-emerald-300/[0.035]
                blur-[55px]
              "
            />

            <div className="relative z-10">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <span
                    className="
                      text-[10px]
                      font-black
                      uppercase
                      tracking-[0.17em]
                      text-[var(--primary)]
                    "
                  >
                    {t(
                      "learning.simpleStep"
                    )}
                  </span>

                  <motion.h2
                    key={currentStep}
                    initial={{
                      opacity: 0,
                      y: 5,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                    className="
                      mt-2
                      text-2xl
                      font-black
                      leading-tight
                      tracking-tight
                      text-[var(--foreground)]
                      sm:text-[27px]
                    "
                  >
                    {t(
                      step.titleKey
                    )}
                  </motion.h2>
                </div>

                <div
                  className="
                    hidden
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-[var(--border)]
                    bg-[var(--surface)]
                    text-[var(--muted)]
                    shadow-[0_6px_16px_rgba(18,63,45,0.05)]
                    sm:flex
                  "
                >
                  <Languages
                    size={18}
                    strokeWidth={2.1}
                  />
                </div>
              </div>

              {/* DESCRIPTION */}

              <motion.p
                key={`description-${currentStep}`}
                initial={{
                  opacity: 0,
                  y: 5,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.3,
                  delay: 0.05,
                }}
                className="
                  mt-4
                  text-sm
                  leading-6
                  text-[var(--muted)]
                  sm:text-[15px]
                "
              >
                {t(
                  step.descriptionKey
                )}
              </motion.p>

              {/* POINTS */}

              <div className="mt-6 space-y-2.5">
                {step.points.map(
                  (
                    pointKey,
                    index
                  ) => (
                    <motion.div
                      key={pointKey}
                      initial={{
                        opacity: 0,
                        x: -8,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        duration: 0.28,
                        delay:
                          0.08 +
                          index * 0.05,
                      }}
                      className="
                        group/point
                        relative
                        flex
                        items-start
                        gap-3
                        overflow-hidden
                        rounded-2xl
                        border
                        border-[var(--border)]
                        bg-[var(--surface)]
                        p-3.5
                        shadow-[0_5px_16px_rgba(18,63,45,0.035)]
                        transition-all
                        duration-300
                        hover:-translate-y-0.5
                        hover:shadow-[0_9px_22px_rgba(18,63,45,0.07)]
                      "
                    >
                      {/* LEFT SPARK */}

                      <span
                        className="
                          pointer-events-none
                          absolute
                          left-0
                          top-1/2
                          h-5
                          w-px
                          -translate-y-1/2
                          bg-[var(--foreground)]
                          opacity-0
                          transition-all
                          duration-300
                          group-hover/point:h-9
                          group-hover/point:opacity-25
                        "
                      />

                      <div
                        className="
                          mt-0.5
                          flex
                          h-7
                          w-7
                          shrink-0
                          items-center
                          justify-center
                          rounded-lg
                          border
                          border-[var(--border)]
                          bg-[var(--surface)]
                          text-[var(--primary)]
                          shadow-[0_4px_12px_rgba(18,63,45,0.04)]
                        "
                      >
                        <span className="text-[11px] font-black">
                          ✓
                        </span>
                      </div>

                      <p
                        className="
                          text-xs
                          leading-5
                          text-[var(--foreground)]
                          sm:text-sm
                        "
                      >
                        {t(pointKey)}
                      </p>
                    </motion.div>
                  )
                )}
              </div>
            </div>
          </div>
        </motion.section>

        {/* ======================================================
            QUICK BENEFITS
        ====================================================== */}

        <motion.section
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.4,
            delay: 0.16,
          }}
          className="
            relative
            z-10
            mt-7
          "
        >
          <div className="mb-3">
            <p
              className="
                text-[10px]
                font-black
                uppercase
                tracking-[0.15em]
                text-[var(--muted)]
              "
            >
              {t(
                "learning.quickTitle"
              )}
            </p>
          </div>

          <div
            className="
              grid
              gap-3
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >
            {[
              {
                icon: IndianRupee,
                title:
                  "learning.quickPrice",
              },
              {
                icon: Recycle,
                title:
                  "learning.quickRecycler",
              },
              {
                icon: WalletCards,
                title:
                  "learning.quickPayment",
              },
              {
                icon: ShieldCheck,
                title:
                  "learning.quickSafety",
              },
            ].map(
              (
                item,
                index
              ) => {
                const ItemIcon =
                  item.icon;

                return (
                  <motion.div
                    key={item.title}
                    initial={{
                      opacity: 0,
                      y: 8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.28,
                      delay:
                        0.18 +
                        index * 0.05,
                    }}
                    whileHover={{
                      y: -2,
                    }}
                    className="
                      group/benefit
                      relative
                      overflow-hidden
                      rounded-[20px]
                      border
                      border-[var(--border)]
                      bg-[var(--surface)]
                      p-4
                      shadow-[0_8px_24px_rgba(18,63,45,0.05)]
                      transition-all
                      duration-300
                      hover:shadow-[0_14px_32px_rgba(18,63,45,0.09)]
                    "
                  >
                    {/* SPARK */}

                    <motion.span
                      initial={{
                        x: "-120%",
                      }}
                      whileHover={{
                        x: "150%",
                      }}
                      transition={{
                        duration: 0.75,
                        ease: "easeInOut",
                      }}
                      className="
                        pointer-events-none
                        absolute
                        -inset-y-4
                        left-0
                        w-5
                        rotate-[20deg]
                        bg-gradient-to-r
                        from-transparent
                        via-white/50
                        to-transparent
                        blur-sm
                      "
                    />

                    <div
                      className="
                        relative
                        z-10
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-[var(--border)]
                        bg-[var(--surface)]
                        text-[var(--primary)]
                        shadow-[0_6px_16px_rgba(18,63,45,0.055)]
                        transition-transform
                        duration-300
                        group-hover/benefit:scale-105
                        group-hover/benefit:-rotate-2
                      "
                    >
                      <ItemIcon
                        size={18}
                        strokeWidth={2.15}
                      />
                    </div>

                    <p
                      className="
                        relative
                        z-10
                        mt-3
                        text-sm
                        font-bold
                        text-[var(--foreground)]
                      "
                    >
                      {t(item.title)}
                    </p>

                    <div
                      className="
                        pointer-events-none
                        absolute
                        bottom-0
                        left-4
                        h-[2px]
                        w-6
                        rounded-full
                        bg-[var(--primary)]
                        opacity-40
                        transition-all
                        duration-300
                        group-hover/benefit:w-10
                        group-hover/benefit:opacity-80
                      "
                    />
                  </motion.div>
                );
              }
            )}
          </div>
        </motion.section>

        {/* ======================================================
            OFFLINE NOTE
        ====================================================== */}

        <motion.section
          initial={{
            opacity: 0,
            y: 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.4,
            delay: 0.22,
          }}
          className="
            group/offline
            relative
            z-10
            mt-5
            overflow-hidden
            rounded-[22px]
            border
            border-[var(--border)]
            bg-[var(--surface)]
            p-4
            shadow-[0_8px_24px_rgba(18,63,45,0.05)]
            transition-all
            duration-300
            hover:shadow-[0_12px_30px_rgba(18,63,45,0.08)]
          "
        >
          {/* SPARK */}

          <div
            className="
              pointer-events-none
              absolute
              left-8
              right-8
              top-0
              h-px
              bg-gradient-to-r
              from-transparent
              via-white/80
              to-transparent
            "
          />

          <div className="relative z-10 flex items-start gap-3">
            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-amber-300/50
                bg-[var(--surface)]
                text-amber-600
                shadow-[0_5px_14px_rgba(18,63,45,0.05)]
              "
            >
              <WifiOff
                size={17}
                strokeWidth={2.1}
              />
            </div>

            <div className="min-w-0">
              <p
                className="
                  text-sm
                  font-black
                  text-[var(--foreground)]
                "
              >
                {t(
                  "learning.offlineTitle"
                )}
              </p>

              <p
                className="
                  mt-1
                  max-w-3xl
                  text-xs
                  leading-5
                  text-[var(--muted)]
                "
              >
                {t(
                  "learning.offlineText"
                )}
              </p>
            </div>
          </div>
        </motion.section>

        {/* ======================================================
            NAVIGATION
        ====================================================== */}

        <motion.section
          initial={{
            opacity: 0,
            y: 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.4,
            delay: 0.25,
          }}
          className="
            relative
            z-10
            mt-7
            flex
            flex-col-reverse
            gap-3
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          {/* PREVIOUS */}

          <motion.button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            whileHover={{
              y: currentStep === 0 ? 0 : -1,
            }}
            whileTap={{
              scale: 0.98,
            }}
            className="
              group/previous
              inline-flex
              min-h-12
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-[var(--border)]
              bg-[var(--surface)]
              px-4
              text-sm
              font-bold
              text-[var(--foreground)]
              shadow-[0_7px_20px_rgba(18,63,45,0.05)]
              transition-all
              duration-300
              hover:shadow-[0_10px_25px_rgba(18,63,45,0.08)]
              disabled:cursor-not-allowed
              disabled:opacity-35
            "
          >
            <ChevronLeft
              size={18}
              className="
                transition-transform
                duration-300
                group-hover/previous:-translate-x-0.5
              "
            />

            {t(
              "learning.previous"
            )}
          </motion.button>

          {/* NEXT */}

          <motion.button
            type="button"
            onClick={handleNext}
            whileHover={{
              y: -2,
            }}
            whileTap={{
              scale: 0.98,
            }}
            className="
              group/next
              relative
              inline-flex
              min-h-12
              items-center
              justify-center
              gap-2
              overflow-hidden
              rounded-xl
              border
              border-[#0b281b]
              bg-[linear-gradient(120deg,#07150f_0%,#0b2a1c_48%,#176343_100%)]
              px-5
              text-sm
              font-black
              text-white
              shadow-[0_12px_28px_rgba(3,18,12,0.24)]
              transition-all
              duration-300
              hover:shadow-[0_16px_34px_rgba(3,18,12,0.30)]
              sm:min-w-[150px]
            "
          >
            {/* MOVING SPARK */}

            <motion.span
              initial={{
                x: "-120%",
              }}
              whileHover={{
                x: "160%",
              }}
              transition={{
                duration: 0.75,
                ease: "easeInOut",
              }}
              className="
                pointer-events-none
                absolute
                -inset-y-5
                left-0
                w-6
                rotate-[20deg]
                bg-gradient-to-r
                from-transparent
                via-white/25
                to-transparent
                blur-sm
              "
            />

            <span className="relative z-10">
              {currentStep ===
              LEARNING_STEPS.length - 1
                ? t(
                    "learning.startUsing"
                  )
                : t(
                    "learning.next"
                  )}
            </span>

            {currentStep ===
            LEARNING_STEPS.length - 1 ? (
              <LogIn
                size={17}
                className="
                  relative
                  z-10
                  transition-transform
                  duration-300
                  group-hover/next:translate-x-0.5
                "
              />
            ) : (
              <ChevronRight
                size={17}
                className="
                  relative
                  z-10
                  transition-transform
                  duration-300
                  group-hover/next:translate-x-0.5
                "
              />
            )}
          </motion.button>
        </motion.section>

        {/* ======================================================
            READY / CTA
        ====================================================== */}

        <motion.section
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.4,
            delay: 0.3,
          }}
          className="
            group/ready
            relative
            z-10
            mt-9
            overflow-hidden
            rounded-[28px]
            border
            border-[var(--border)]
            bg-[var(--surface)]
            p-5
            shadow-[0_14px_40px_rgba(18,63,45,0.07)]
            sm:p-6
          "
        >
          {/* SPARK BORDER */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              rounded-[28px]
              bg-[conic-gradient(from_180deg_at_50%_50%,transparent_0deg,transparent_250deg,rgba(255,255,255,0.9)_286deg,rgba(255,255,255,0.18)_312deg,transparent_345deg)]
              opacity-55
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              inset-px
              rounded-[27px]
              bg-[var(--surface)]
            "
          />

          {/* DECORATIVE PLUS */}

          <div
            className="
              pointer-events-none
              absolute
              -bottom-16
              -right-8
              text-[var(--foreground)]
              opacity-[0.025]
            "
          >
            <Sparkles
              size={170}
              strokeWidth={0.7}
            />
          </div>

          <div
            className="
              relative
              z-10
              flex
              flex-col
              gap-5
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div className="min-w-0">
              <p
                className="
                  text-base
                  font-black
                  tracking-tight
                  text-[var(--foreground)]
                "
              >
                {t(
                  "learning.readyTitle"
                )}
              </p>

              <p
                className="
                  mt-1
                  max-w-2xl
                  text-xs
                  leading-5
                  text-[var(--muted)]
                  sm:text-sm
                "
              >
                {t(
                  "learning.readyText"
                )}
              </p>
            </div>

            <div
              className="
                flex
                shrink-0
                gap-2
              "
            >
              {/* LOGIN */}

              <motion.button
                type="button"
                onClick={() =>
                  navigate(
                    "/collector/login"
                  )
                }
                whileHover={{
                  y: -1,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="
                  inline-flex
                  min-h-11
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-[var(--border)]
                  bg-[var(--surface)]
                  px-4
                  text-xs
                  font-black
                  text-[var(--foreground)]
                  shadow-[0_6px_16px_rgba(18,63,45,0.05)]
                  transition-all
                  duration-300
                  hover:shadow-[0_9px_21px_rgba(18,63,45,0.08)]
                "
              >
                <LogIn
                  size={15}
                  strokeWidth={2.2}
                />

                {t(
                  "learning.login"
                )}
              </motion.button>

              {/* SIGNUP */}

              <motion.button
                type="button"
                onClick={() =>
                  navigate(
                    "/collector/signup"
                  )
                }
                whileHover={{
                  y: -1,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="
                  group/signup
                  relative
                  inline-flex
                  min-h-11
                  items-center
                  justify-center
                  gap-2
                  overflow-hidden
                  rounded-xl
                  border
                  border-[#0b281b]
                  bg-[linear-gradient(120deg,#07150f_0%,#0b2a1c_48%,#176343_100%)]
                  px-4
                  text-xs
                  font-black
                  text-white
                  shadow-[0_9px_22px_rgba(3,18,12,0.20)]
                  transition-all
                  duration-300
                "
              >
                <motion.span
                  initial={{
                    x: "-120%",
                  }}
                  whileHover={{
                    x: "160%",
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
                    w-5
                    rotate-[20deg]
                    bg-gradient-to-r
                    from-transparent
                    via-white/25
                    to-transparent
                    blur-sm
                  "
                />

                <ArrowRight
                  size={15}
                  className="
                    relative
                    z-10
                  "
                />

                <span className="relative z-10">
                  {t(
                    "learning.signup"
                  )}
                </span>
              </motion.button>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default LearningPage;