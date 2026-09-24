import {
  Bell,
  MapPin,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import useAuthStore from "../../../store/authStore";
import useRegionStore from "../../../store/regionStore";
import useWeatherAlerts from "../../../hooks/useWeatherAlerts";
import WeatherNotice from "../../../components/Weather/WeatherNotice.jsx";

import EWasteAIButton from "../../../components/EWasteAIButton.jsx";
import { useState } from "react";
import useTranslation from "../../../i18n/useTranslation.js";

const DashboardHeader = () => {
  const navigate = useNavigate();

  const { user } = useAuthStore();
    const { t } = useTranslation();

   const [showNotifications, setShowNotifications] = useState(false);

   const {
  alerts: weatherAlerts,
  weather,
  summary: weatherSummary,
  loading: weatherLoading,
  checkWeather,
  requestNotificationPermission,
  notificationPermission,
} = useWeatherAlerts();

  /* ==========================================================
     GLOBAL DETECTED LOCATION
  ========================================================== */

  const city = useRegionStore(
    (state) => state.city
  );

  const state = useRegionStore(
    (state) => state.state
  );

  const locationStatus = useRegionStore(
    (state) => state.status
  );

  const firstName =
    user?.firstName || "Collector";

  const initials =
    `${user?.firstName?.charAt(0) || ""}${user?.lastName?.charAt(0) || ""}`
      .trim()
      .toUpperCase() || "U";

  /* ==========================================================
     GREETING
  ========================================================== */

 const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) {
    return t("greetings.morning");
  }

  if (hour < 17) {
    return t("greetings.afternoon");
  }

  if (hour < 21) {
    return t("greetings.evening");
  }

  return t("greetings.night");
};

  /* ==========================================================
     LOCATION LABEL
  ========================================================== */

  const locationLabel =
    city && state
      ? `${city}, ${state}`
      : state ||
        city ||
        (locationStatus === "loading"
          ? "Detecting location..."
          : "Location unavailable");

  return (
    <motion.div
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
        ease: "easeOut",
      }}
      className="
        relative
        mb-7
        flex
        items-start
        justify-between
        gap-4
      "
    >
      {/* ======================================================
          LEFT
      ====================================================== */}

      <div className="min-w-0">
        {/* LOCATION */}
        <div
          className="
            mb-2.5
            mr-2
            inline-flex
            max-w-full
            items-center
            gap-1.5
            rounded-full
            border
            border-[var(--border)]
            bg-[var(--surface)]
            px-2.5
            py-1.5
            text-[11px]
            font-semibold
            text-[var(--muted)]
            shadow-[0_5px_16px_rgba(18,63,45,0.045)]
          "
        >
          <MapPin
            size={13}
            strokeWidth={2.2}
            className="shrink-0 text-[var(--primary)]"
          />

          <span className="truncate">
            {locationLabel}
          </span>
        </div>

        {/* WEATHER SNAPSHOT */}
        {weatherSummary && !weatherLoading && (
          <button
            type="button"
            onClick={() => setShowNotifications(true)}
            className="
              mb-3
              inline-flex
              max-w-full
              items-center
              gap-2
              rounded-full
              border
              border-[#35A873]/20
              bg-[linear-gradient(135deg,#E3F2E9_0%,#B8DFC8_100%)]
              px-3
              py-1.5
              text-[10px]
              font-bold
              text-[#123F2D]
              shadow-[0_6px_18px_rgba(18,63,45,0.07)]
              transition-all
              duration-200
              hover:-translate-y-0.5
              active:scale-[0.98]
            "
          >
            <span className="text-sm leading-none">
              {weatherSummary.icon}
            </span>

            <span className="truncate">
              {weatherSummary.temperature}°C · {weatherSummary.label}
            </span>

            {weatherSummary.rainChance >= 30 && (
              <span className="shrink-0 rounded-full bg-white/55 px-1.5 py-0.5 text-[9px]">
                {weatherSummary.rainChance}% rain
              </span>
            )}
          </button>
        )}

        {/* GREETING */}
        <h1
          className="
            text-2xl
            font-black
            tracking-tight
            text-[var(--foreground)]
            sm:text-3xl
          "
        >
          {getGreeting()}, {firstName}
        </h1>

        {/* SUBTITLE */}

        <p
          className="
            mt-1.5
            text-sm
            font-medium
            leading-5
            text-[var(--muted)]
          "
        >
          {t("dashboard.happen")}
        </p>
      </div>

      {/* ======================================================
          RIGHT ACTIONS
      ====================================================== */}

      <div
        className="
          flex
          shrink-0
          items-center
          gap-2
        "
      >
        {/* ==================================================
            ECO-MITRA
        ================================================== */}

        <motion.button
          type="button"
          onClick={() => navigate("/seva-ai")}
          aria-label="Open SEVA-AI"
          title="SEVA-AI"
          whileHover={{
            y: -2,
          }}
          whileTap={{
            scale: 0.97,
          }}
          className="flex h-10 items-center gap-2 rounded-xl border border-[var(--border)] 
          bg-[var(--surface)] px-3 text-sm font-semibold text-[var(--foreground)] 
          shadow-sm transition hover:border-[var(--primary)] hover:bg-[var(--accent)] transition-all  duration-300"
        >
          {/* SPARK */}

          <motion.span
            initial={{
              x: "-120%",
              opacity: 0,
            }}
            whileHover={{
              x: "150%",
              opacity: 1,
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
              w-8
              rotate-[18deg]
              bg-gradient-to-r
              from-transparent
              via-white/70
              to-transparent
              blur-sm
            "
          />

          {/* MOBILE */}

          <Sparkles
            size={17}
            strokeWidth={2.2}
            className="
              relative
              z-10
              text-[var(--primary)]
              sm:hidden
            "
          />

          {/* DESKTOP */}

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


        <EWasteAIButton />

        {/* ==================================================
            NOTIFICATIONS
        ================================================== */}

        <motion.button
          type="button"
          onClick={() => setShowNotifications(!showNotifications)}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.96 }}
          className="
            group/bell
            relative
            hidden
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
            border-[var(--border)]
            bg-[var(--surface)]
            text-[var(--muted)]
            shadow-[0_6px_18px_rgba(18,63,45,0.05)]
            transition-all
            duration-300
            hover:border-[var(--foreground)]/15
            hover:text-[var(--foreground)]
            hover:shadow-[0_10px_24px_rgba(18,63,45,0.08)]
            sm:flex
          "
        >
          <Bell
            size={18}
            strokeWidth={2}
            className="transition-transform duration-300 group-hover/bell:-rotate-6"
          />

          {weatherAlerts.length > 0 && (
            <span
              className={`absolute right-2 top-2 h-1.5 w-1.5 rounded-full ${
                weatherAlerts[0]?.severity === "high"
                  ? "bg-[#B34A45]"
                  : weatherAlerts[0]?.severity === "medium"
                    ? "bg-[#E6A43B]"
                    : "bg-[#35A873]"
              }`}
            />
          )}
        </motion.button>

        {showNotifications && (
          <div
            className="fixed right-4 top-20 z-50 w-[min(23rem,calc(100vw-2rem))] max-h-[calc(100vh-6rem)] overflow-y-auto rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[0_24px_60px_rgba(18,63,45,0.18)] sm:right-8"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#18794E]">
                  Weather
                </p>
                <h3 className="mt-1 text-base font-bold text-[var(--foreground)]">
                  Notifications
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setShowNotifications(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--muted)] transition hover:bg-[var(--surface-soft)] hover:text-[var(--foreground)]"
                aria-label="Close notifications"
              >
                ×
              </button>
            </div>

            <WeatherNotice
              summary={weatherSummary}
              alerts={weatherAlerts}
              loading={weatherLoading}
              notificationPermission={notificationPermission}
              onEnableNotifications={requestNotificationPermission}
              onRefresh={checkWeather}
            />
          </div>
        )}

        {/* ==================================================
            PROFILE
        ================================================== */}

      <motion.button
  type="button"
  onClick={() =>
    navigate("/collector/settings")
  }
  whileHover={{
    y: -2,
  }}
  whileTap={{
    scale: 0.96,
  }}
  className="
    group/profile
    relative
    flex
    h-10
    w-10
    items-center
    justify-center
    overflow-hidden
    rounded-xl

    bg-gradient-to-br
    from-indigo-500
    to-violet-500

    text-xs
    font-black
    text-white

    shadow-md
    shadow-indigo-500/20

    transition-all
    duration-300

    hover:shadow-lg
    hover:shadow-indigo-500/30
  "
>

  <span
    className="
      relative
      z-10
      transition-transform
      duration-300
      group-hover/profile:scale-105
    "
  >
    {initials}
  </span>
    </motion.button>
      
      

      </div>

      {/* ======================================================
          HEADER SPARK LINE
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -bottom-4
          left-0
          h-px
          w-full
          bg-gradient-to-r
          from-[var(--border)]
          via-transparent
          to-[var(--border)]
          opacity-60
        "
      />
    </motion.div>
  );
};

export default DashboardHeader;