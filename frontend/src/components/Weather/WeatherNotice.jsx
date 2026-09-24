import {
  BellRing,
  CheckCircle2,
  CloudRain,
  RefreshCw,
  ShieldAlert,
  Sun,
  ThermometerSun,
  Wind,
} from "lucide-react";

import { motion } from "framer-motion";
import WeatherForecastStrip from "./WeatherForecastStrip";

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

   These weather cards use intentionally light gradients.
   Therefore all text inside the gradient uses fixed dark
   colors instead of theme-dependent foreground variables.
========================================================== */

const STATUS_CLASSES = {
  good: {
    card:
      "border-[#35A873]/20 bg-[linear-gradient(145deg,#E3F2E9_0%,#B8DFC8_55%,#86C99F_100%)]",

    icon:
      "bg-[#123F2D] text-white",

    badge:
      "border-[#35A873]/20 bg-white/60 !text-[#123F2D]",

    heading:
      "!text-[#123F2D]",

    text:
      "!text-[#123F2D]",

    muted:
      "!text-[#315D49]",
  },

  caution: {
    card:
      "border-[#E6A43B]/20 bg-[linear-gradient(145deg,#FFF3D9_0%,#F5DCA0_55%,#E9C36F_100%)]",

    icon:
      "bg-[#8A5B10] text-white",

    badge:
      "border-[#E6A43B]/25 bg-white/60 !text-[#6A450B]",

    heading:
      "!text-[#5F430F]",

    text:
      "!text-[#5F430F]",

    muted:
      "!text-[#76581C]",
  },

  avoid: {
    card:
      "border-[#B34A45]/20 bg-[linear-gradient(145deg,#FDEAE7_0%,#F2C4BF_55%,#DFA09A_100%)]",

    icon:
      "bg-[#7D2622] text-white",

    badge:
      "border-[#B34A45]/20 bg-white/60 !text-[#7D2622]",

    heading:
      "!text-[#6F2925]",

    text:
      "!text-[#6F2925]",

    muted:
      "!text-[#7D403C]",
  },
};

/* ==========================================================
   COMPONENT
========================================================== */

const WeatherNotice = ({
  summary,
  alerts = [],
  loading = false,

  notificationPermission =
    "default",

  onEnableNotifications,
  onRefresh,
}) => {
  /* ========================================================
     LOADING
  ======================================================== */

  if (loading && !summary) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-[var(--border)]
          bg-[var(--surface-soft)]
          p-4
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
              h-11
              w-11
              animate-pulse
              rounded-2xl
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
                w-28
                animate-pulse
                rounded-full
                bg-[var(--border)]
              "
            />

            <div
              className="
                h-3
                w-48
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
     WEATHER UNAVAILABLE
  ======================================================== */

  if (!summary) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-[var(--border)]
          bg-[var(--surface-soft)]
          p-4
        "
      >
        <p
          className="
            text-sm
            font-semibold
            text-[var(--foreground)]
          "
        >
          Weather unavailable
        </p>

        <p
          className="
            mt-1
            text-xs
            leading-5
            text-[var(--muted)]
          "
        >
          We could not get the latest
          weather for your detected location.
        </p>

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
            text-xs
            font-semibold
            text-[var(--primary)]
            shadow-[0_6px_18px_rgba(18,63,45,0.06)]
            transition
            hover:-translate-y-0.5
            active:scale-[0.98]
          "
        >
          <RefreshCw size={13} />
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

  const alert = alerts[0];

  /* ========================================================
     UI
  ======================================================== */

  return (
    <div className="space-y-3">
      {/* ======================================================
          WEATHER STATUS CARD
      ====================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 6,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className={`
        relative
        overflow-hidden
        rounded-[24px]
        border
        p-4
        text-[#123F2D]
        shadow-[0_10px_28px_rgba(18,63,45,0.08)]
        ${colors.card}
      `}
      >
        {/* DECORATIVE LIGHT */}

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

        {/* ==================================================
            TOP CONTENT
        ================================================== */}

        <div
          className="
            relative
            flex
            items-start
            gap-3
          "
        >
          {/* STATUS ICON */}

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
              size={20}
              strokeWidth={2}
            />
          </div>

          {/* WEATHER CONTENT */}

          <div
            className="
              min-w-0
              flex-1
            "
          >
            {/* TITLE */}

            <div
              className="
                flex
                flex-wrap
                items-center
                gap-2
              "
            >
              <p
                className={`
                  text-sm
                  font-bold
                  ${colors.heading}
                `}
              >
                {summary.ui?.weatherUpdate ||
                  "Weather update"}
              </p>

              <span
                className={`
                  rounded-full
                  border
                  px-2
                  py-1
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.08em]
                  ${colors.badge}
                `}
              >
                {summary.label}
              </span>
            </div>

            {/* TEMPERATURE */}

            <div
              className="
                mt-2
                flex
                items-end
                gap-3
              "
            >
              <span
                className={`
                  text-3xl
                  font-black
                  tracking-tight
                  ${colors.text}
                `}
              >
                {summary.icon}{" "}
                {summary.temperature}°
              </span>

              <span
                className={`
                  pb-1
                  text-[10px]
                  ${colors.muted}
                `}
              >
                {summary.ui?.feelsLike ||
                  "Feels like"}{" "}
                {summary.feelsLike}°
              </span>
            </div>

            {/* ADVICE */}

            <p
              className={`
                mt-2
                text-xs
                font-semibold
                leading-5
                ${colors.text}
              `}
            >
              {summary.advice}
            </p>
          </div>
        </div>

        {/* RAIN / WIND   WEATHER RISK */}
      <div className="relative mt-4">
        <div
          className={`
            flex
            items-center
            gap-3
            rounded-2xl
            border
            px-3
            py-2.5
            backdrop-blur-sm
            ${
              summary.stormRisk?.detected
                ? "border-[#B34A45]/20 bg-[#FDEAE7]/70"
                : summary.rainChance >= 60
                  ? "border-[#E6A43B]/25 bg-[#FFF3D9]/70"
                  : "border-black/5 bg-white/40"
            }
          `}
        >
          {/* ICON */}

          <div
            className={`
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-xl
              ${
                summary.stormRisk?.detected
                  ? "bg-[#7D2622] text-white"
                  : summary.rainChance >= 60
                    ? "bg-[#8A5B10] text-white"
                    : "bg-white/60 text-[#278F8B]"
              }
            `}
          >
            {summary.stormRisk?.detected
              ? "⛈️"
              : "🌧️"}
          </div>

          {/* TEXT */}

          <div className="min-w-0 flex-1">
            <p
              className={`
                text-[9px]
                font-black
                uppercase
                tracking-[0.12em]
                ${
                  summary.stormRisk?.detected
                    ? "text-[#7D2622]"
                    : summary.rainChance >= 60
                      ? "text-[#6A450B]"
                      : "text-[#315D49]"
                }
              `}
            >
              {summary.stormRisk?.detected
                ? "Storm risk"
                : "Rain chance · next 6 hours"}
            </p>

            <p
              className={`
                mt-0.5
                text-xs
                font-black
                ${
                  summary.stormRisk?.detected
                    ? "text-[#6F2925]"
                    : summary.rainChance >= 60
                      ? "text-[#5F430F]"
                      : "text-[#123F2D]"
                }
              `}
            >
              {summary.stormRisk?.detected
                ? "Storm expected"
                : `${summary.rainChance}% chance of rain`}
            </p>
          </div>

          {/* PERCENTAGE */}

          <div className="shrink-0 text-right">
            <p
              className={`
                text-lg
                font-black
                ${
                  summary.stormRisk?.detected
                    ? "text-[#7D2622]"
                    : summary.rainChance >= 60
                      ? "text-[#6A450B]"
                      : "text-[#123F2D]"
                }
              `}
            >
              {summary.rainChance}%
            </p>
          </div>
        </div>
      </div>

    {/* NEXT 6 HOURS */}
      {summary.nextSixHours?.length > 0 && (
        <div
          className="
            relative
            mt-3
            overflow-hidden
            rounded-2xl
            border
            border-black/5
            bg-white/35
            px-1
            py-2
            backdrop-blur-sm
          "
        >
          <WeatherForecastStrip
            hours={
              summary.nextSixHours
            }
          />
        </div>
      )}

      </motion.div>

      {/* ======================================================
          ALERT CARD
      ====================================================== */}

      {alert && (
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
            rounded-2xl
            border
            border-[var(--border)]
            bg-[var(--surface)]
            p-3.5
            shadow-[0_7px_22px_rgba(18,63,45,0.05)]
          "
        >
          <div
            className="
              flex
              items-start
              gap-3
            "
          >
            {/* ICON */}

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
              {alert.icon || (
                <ThermometerSun size={16} />
              )}
            </div>

            {/* CONTENT */}

            <div
              className="
                min-w-0
                flex-1
              "
            >
              <p
                className="
                  text-xs
                  font-bold
                  text-[var(--foreground)]
                "
              >
                {alert.title}
              </p>

              <p
                className="
                  mt-1
                  text-[11px]
                  leading-5
                  text-[var(--muted)]
                "
              >
                {alert.message}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* ======================================================
          NOTIFICATION ACTIONS
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
                inline-flex
                flex-1
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#123F2D]
                px-3
                py-2.5
                text-xs
                font-bold
                text-white
                shadow-[0_8px_18px_rgba(18,63,45,0.18)]
                transition
                hover:-translate-y-0.5
                active:scale-[0.98]
              "
            >
              <BellRing size={14} />

              {summary.ui
                ?.enableNotifications ||
                "Enable notifications"}
            </button>
          )}

        {permissionEnabled && (
          <div
            className="
              flex
              flex-1
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-[#35A873]/20
              bg-[#E3F2E9]
              px-3
              py-2.5
              text-xs
              font-bold
              text-[#123F2D]
            "
          >
            <CheckCircle2
              size={14}
            />

            {summary.ui
              ?.notificationsEnabled ||
              "Notifications enabled"}
          </div>
        )}

        {permissionDenied && (
          <div
            className="
              flex
              flex-1
              items-center
              justify-center
              rounded-xl
              border
              border-[var(--border)]
              bg-[var(--surface-soft)]
              px-3
              py-2.5
              text-center
              text-[10px]
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

        {/* REFRESH */}

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
          <RefreshCw size={14} />
        </button>
      </div>
    </div>
  );
};

export default WeatherNotice;