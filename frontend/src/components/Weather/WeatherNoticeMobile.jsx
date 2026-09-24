import {
  BellRing,
  CheckCircle2,
  CloudRain,
  RefreshCw,
  ShieldAlert,
  Sun,
  ThermometerSun,
  Wind,
  Volume2,
} from "lucide-react";

import { motion } from "framer-motion";

/* ==========================================================
   STATUS ICONS
========================================================== */

const STATUS_ICON = {
  good: Sun,
  caution: CloudRain,
  avoid: ShieldAlert,
};

/* ==========================================================
   STATUS STYLES
========================================================== */

const STATUS_CLASSES = {
  good: {
    card:
      "border-[#35A873]/20 bg-[linear-gradient(145deg,#E3F2E9_0%,#B8DFC8_55%,#86C99F_100%)]",

    icon:
      "bg-[#123F2D] text-white",

    badge:
      "border-[#35A873]/20 bg-white/60 text-[#123F2D]",

    heading:
      "text-[#123F2D]",

    text:
      "text-[#123F2D]",

    muted:
      "text-[#315D49]",
  },

  caution: {
    card:
      "border-[#E6A43B]/20 bg-[linear-gradient(145deg,#FFF3D9_0%,#F5DCA0_55%,#E9C36F_100%)]",

    icon:
      "bg-[#8A5B10] text-white",

    badge:
      "border-[#E6A43B]/25 bg-white/60 text-[#6A450B]",

    heading:
      "text-[#5F430F]",

    text:
      "text-[#5F430F]",

    muted:
      "text-[#76581C]",
  },

  avoid: {
    card:
      "border-[#B34A45]/20 bg-[linear-gradient(145deg,#FDEAE7_0%,#F2C4BF_55%,#DFA09A_100%)]",

    icon:
      "bg-[#7D2622] text-white",

    badge:
      "border-[#B34A45]/20 bg-white/60 text-[#7D2622]",

    heading:
      "text-[#6F2925]",

    text:
      "text-[#6F2925]",

    muted:
      "text-[#7D403C]",
  },
};

/* ==========================================================
   COMPONENT
========================================================== */

const WeatherNoticeMobile = ({
  summary,
  alerts = [],
  loading = false,

  notificationPermission =
    "default",

  onEnableNotifications,
  onRefresh,

  soundEnabled = false,
  onEnableSound,
}) => {
  /* ========================================================
     LOADING
  ======================================================== */

  if (loading && !summary) {
    return (
      <div
        className="
          rounded-[22px]
          border
          border-[var(--border)]
          bg-[var(--surface-soft)]
          p-3.5
        "
      >
        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          <div
            className="
              h-10
              w-10
              shrink-0
              animate-pulse
              rounded-xl
              bg-[var(--border)]
            "
          />

          <div
            className="
              flex-1
              space-y-2
            "
          >
            <div
              className="
                h-3
                w-24
                animate-pulse
                rounded-full
                bg-[var(--border)]
              "
            />

            <div
              className="
                h-3
                w-36
                animate-pulse
                rounded-full
                bg-[var(--border)]
              "
            />
          </div>
        </div>
      </div>
    );
  }

  /* ========================================================
     UNAVAILABLE
  ======================================================== */

  if (!summary) {
    return (
      <div
        className="
          rounded-[22px]
          border
          border-[var(--border)]
          bg-[var(--surface-soft)]
          p-3.5
        "
      >
        <div
          className="
            flex
            items-start
            gap-3
          "
        >
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-[var(--surface)]
              text-[var(--muted)]
            "
          >
            <ThermometerSun size={17} />
          </div>

          <div className="min-w-0">
            <p
              className="
                text-xs
                font-black
                text-[var(--foreground)]
              "
            >
              Weather unavailable
            </p>

            <p
              className="
                mt-1
                text-[10px]
                leading-4
                text-[var(--muted)]
              "
            >
              We could not get the latest
              weather for your location.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onRefresh}
          className="
            mt-3
            inline-flex
            items-center
            gap-1.5
            rounded-xl
            bg-[var(--surface)]
            px-3
            py-2
            text-[10px]
            font-bold
            text-[var(--primary)]
            shadow-[0_6px_18px_rgba(18,63,45,0.05)]
            active:scale-[0.98]
          "
        >
          <RefreshCw size={12} />

          Try again
        </button>
      </div>
    );
  }

  /* ========================================================
     STATUS
  ======================================================== */

  const StatusIcon =
    STATUS_ICON[
      summary.outdoorStatus
    ] || Sun;

  const colors =
    STATUS_CLASSES[
      summary.outdoorStatus
    ] ||
    STATUS_CLASSES.good;

  const hasRainChance =
    summary.rainChance >= 30;

  const permissionEnabled =
    notificationPermission ===
    "granted";

  const permissionDenied =
    notificationPermission ===
    "denied";

  const firstAlert =
    alerts[0];

  /* ========================================================
     UI
  ======================================================== */

  return (
    <div className="space-y-2.5">
      {/* ======================================================
          WEATHER
      ====================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 5,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className={`
          relative
          overflow-hidden
          rounded-[22px]
          border
          p-3.5
          shadow-[0_10px_28px_rgba(18,63,45,0.07)]
          ${colors.card}
        `}
      >
        <div
          className="
            pointer-events-none
            absolute
            -right-8
            -top-8
            h-24
            w-24
            rounded-full
            bg-white/20
            blur-2xl
          "
        />

        <div
          className="
            relative
            flex
            items-start
            gap-3
          "
        >
          {/* ICON */}

          <div
            className={`
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-2xl
              shadow-[0_8px_20px_rgba(18,63,45,0.12)]
              ${colors.icon}
            `}
          >
            <StatusIcon
              size={19}
              strokeWidth={2.1}
            />
          </div>

          {/* CONTENT */}

          <div
            className="
              min-w-0
              flex-1
            "
          >
            <div
              className="
                flex
                items-center
                justify-between
                gap-2
              "
            >
              <p
                className={`
                  truncate
                  text-xs
                  font-black
                  ${colors.heading}
                `}
              >
                {summary.ui?.weatherUpdate ||
                  "Weather update"}
              </p>

              <span
                className={`
                  shrink-0
                  rounded-full
                  border
                  px-2
                  py-1
                  text-[8px]
                  font-black
                  uppercase
                  tracking-[0.08em]
                  ${colors.badge}
                `}
              >
                {summary.label}
              </span>
            </div>

            <div
              className="
                mt-1.5
                flex
                items-end
                gap-2
              "
            >
              <span
                className={`
                  text-[29px]
                  font-black
                  leading-none
                  tracking-tight
                  ${colors.text}
                `}
              >
                {summary.icon}{" "}
                {summary.temperature}°
              </span>

              <span
                className={`
                  pb-0.5
                  text-[9px]
                  font-semibold
                  ${colors.muted}
                `}
              >
                {summary.ui?.feelsLike ||
                  "Feels like"}{" "}
                {summary.feelsLike}°
              </span>
            </div>

            <p
              className={`
                mt-2
                text-[10px]
                font-bold
                leading-4
                ${colors.text}
              `}
            >
              {summary.advice}
            </p>
          </div>
        </div>

        {/* ==================================================
            RAIN / WIND
        ================================================== */}

        {hasRainChance && (
          <div
            className="
              relative
              mt-3
              flex
              items-center
              gap-2.5
              rounded-xl
              border
              border-black/5
              bg-white/45
              px-3
              py-2.5
              backdrop-blur-sm
            "
          >
            <div
              className="
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-white/60
                text-[#278F8B]
              "
            >
              <CloudRain size={14} />
            </div>

            <div
              className="
                min-w-0
                flex-1
              "
            >
              <p
                className={`
                  text-[8px]
                  font-black
                  uppercase
                  tracking-[0.12em]
                  ${colors.muted}
                `}
              >
                {summary.ui?.rainChance ||
                  "Rain chance"}
              </p>

              <p
                className={`
                  mt-0.5
                  text-[10px]
                  font-bold
                  ${colors.text}
                `}
              >
                {summary.rainChance}% ·{" "}
                {summary.ui?.nextHours ||
                  "Next few hours"}
              </p>
            </div>

            {summary.windSpeed >= 40 && (
              <div
                className={`
                  flex
                  shrink-0
                  items-center
                  gap-1
                  text-[9px]
                  font-bold
                  ${colors.muted}
                `}
              >
                <Wind size={11} />
                {summary.windSpeed}
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* ======================================================
          ALERT
      ====================================================== */}

      {firstAlert && (
        <motion.div
          initial={{
            opacity: 0,
            y: 5,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
            rounded-[20px]
            border
            border-[var(--border)]
            bg-[var(--surface)]
            p-3
            shadow-[0_7px_22px_rgba(18,63,45,0.05)]
          "
        >
          <div
            className="
              flex
              items-start
              gap-2.5
            "
          >
            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-[var(--surface-soft)]
                text-[var(--primary)]
              "
            >
              {firstAlert.icon || (
                <ThermometerSun size={15} />
              )}
            </div>

            <div
              className="
                min-w-0
                flex-1
              "
            >
              <p
                className="
                  text-[10px]
                  font-black
                  text-[var(--foreground)]
                "
              >
                {firstAlert.title}
              </p>

              <p
                className="
                  mt-0.5
                  text-[10px]
                  leading-4
                  text-[var(--muted)]
                "
              >
                {firstAlert.message}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* ======================================================
          ACTIONS
      ====================================================== */}

      <div
        className="
          flex
          items-center
          gap-2
        "
      >
        {!permissionEnabled &&
          !permissionDenied && (
            <button
              type="button"
              onClick={
                onEnableNotifications
              }
              className="
                flex
                flex-1
                items-center
                justify-center
                gap-1.5
                rounded-xl
                bg-[#123F2D]
                px-2.5
                py-2.5
                text-[10px]
                font-black
                text-white
                shadow-[0_8px_18px_rgba(18,63,45,0.16)]
                transition
                active:scale-[0.98]
              "
            >
              <BellRing size={13} />

              <span className="truncate">
                {summary.ui
                  ?.enableNotifications ||
                  "Enable alerts"}
              </span>
            </button>
          )}

        {permissionEnabled &&
          !soundEnabled &&
          onEnableSound && (
            <button
              type="button"
              onClick={
                onEnableSound
              }
              className="
                flex
                flex-1
                items-center
                justify-center
                gap-1.5
                rounded-xl
                bg-[#123F2D]
                px-2.5
                py-2.5
                text-[10px]
                font-black
                text-white
                shadow-[0_8px_18px_rgba(18,63,45,0.16)]
                transition
                active:scale-[0.98]
              "
            >
              <Volume2 size={13} />

              <span className="truncate">
                Enable sound
              </span>
            </button>
          )}

        {permissionEnabled &&
          soundEnabled && (
            <div
              className="
                flex
                flex-1
                items-center
                justify-center
                gap-1.5
                rounded-xl
                border
                border-[#35A873]/20
                bg-[#E3F2E9]
                px-2.5
                py-2.5
                text-[10px]
                font-black
                text-[#123F2D]
              "
            >
              <CheckCircle2
                size={13}
              />

              Weather alerts on
            </div>
          )}

        {permissionDenied && (
          <div
            className="
              flex
              min-w-0
              flex-1
              items-center
              justify-center
              rounded-xl
              border
              border-[var(--border)]
              bg-[var(--surface-soft)]
              px-2.5
              py-2
              text-center
              text-[9px]
              font-semibold
              leading-4
              text-[var(--muted)]
            "
          >
            Browser notifications are
            blocked. Weather updates still
            appear here.
          </div>
        )}

        <button
          type="button"
          onClick={onRefresh}
          aria-label={
            summary.ui?.refresh ||
            "Refresh weather"
          }
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
            border-[var(--border)]
            bg-[var(--surface)]
            text-[var(--muted)]
            shadow-[0_6px_18px_rgba(18,63,45,0.05)]
            transition
            hover:text-[var(--primary)]
            active:scale-95
          "
        >
          <RefreshCw size={13} />
        </button>
      </div>
    </div>
  );
};

export default WeatherNoticeMobile;