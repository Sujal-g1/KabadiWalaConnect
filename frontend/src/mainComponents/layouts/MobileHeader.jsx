import {
  Bell,
  Menu,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import logo from "../../assets/images/logo.webp";

import useAuthStore from "../../store/authStore";
import useRegionStore from "../../store/regionStore";
import useTranslation from "../../i18n/useTranslation";
import useWeatherAlerts from "../../hooks/useWeatherAlerts";
import WeatherNoticeMobile from "../../components/Weather/WeatherNoticeMobile";

const MobileHeader = ({
  onMenuClick,
}) => {
  const navigate =
    useNavigate();

  const {
    user,
  } = useAuthStore();

  const {
    t,
  } = useTranslation();

  /* ==========================================================
     WEATHER
  ========================================================== */

  const {
    alerts,
    summary,

    loading,
    notificationPermission,

    checkWeather,
    requestNotificationPermission,

    soundEnabled,
    enableAlertSound,
  } = useWeatherAlerts();

  /* ==========================================================
     UI
  ========================================================== */

  const [
    showWeather,
    setShowWeather,
  ] = useState(false);

  /* ==========================================================
     LOCATION
  ========================================================== */

  const city =
    useRegionStore(
      (state) => state.city
    );

  const state =
    useRegionStore(
      (state) => state.state
    );

  const regionStatus =
    useRegionStore(
      (state) => state.status
    );

  /* ==========================================================
     LOCATION LABEL
  ========================================================== */

  const locationLabel =
    city && state
      ? `${city}, ${state}`
      : state ||
        city ||
        (
          regionStatus ===
          "loading"
            ? "Detecting location..."
            : "Location unavailable"
        );

  return (
    <header
      className="
        sticky
        top-0
        z-40
        px-3
        pt-3
        lg:hidden
      "
    >
      <motion.div
        initial={{
          opacity: 0,
          y: -10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.35,
        }}
        className="
          relative
          overflow-visible
          rounded-2xl
          border
          border-[var(--border)]
          bg-[var(--surface)]/88
          px-3
          py-2.5
          shadow-lg
          shadow-black/5
          backdrop-blur-2xl
        "
      >
        {/* ====================================================
            TOP LIGHT
        ==================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-x-8
            top-0
            h-px
            bg-gradient-to-r
            from-transparent
            via-[var(--primary)]/40
            to-transparent
          "
        />

        {/* ====================================================
            HEADER ROW
        ==================================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-3
          "
        >
          {/* ==================================================
              LEFT
          ================================================== */}

          <div
            className="
              flex
              min-w-0
              items-center
              gap-2.5
            "
          >
            {/* MENU */}

            <motion.button
              type="button"
              whileTap={{
                scale: 0.9,
              }}
              onClick={
                onMenuClick
              }
              aria-label="Open menu"
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
                bg-[var(--surface-soft)]
                text-[var(--foreground)]
                transition
                hover:bg-[var(--accent)]
              "
            >
              <Menu
                size={20}
                strokeWidth={2.2}
              />
            </motion.button>

            {/* BRAND */}

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/collector"
                )
              }
              className="
                flex
                min-w-0
                items-center
                gap-2.5
                text-left
              "
            >
              {/* LOGO */}

              <motion.div
                whileTap={{
                  scale: 0.95,
                }}
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-[var(--surface-soft)]
                  p-1.5
                  ring-1
                  ring-[var(--border)]
                "
              >
                <img
                  src={logo}
                  alt={t(
                    "start.logoAlt"
                  )}
                  className="
                    h-full
                    w-full
                    object-contain
                  "
                />
              </motion.div>

              {/* TEXT */}

              <div
                className="
                  min-w-0
                "
              >
                <p
                  className="
                    truncate
                    text-[14px]
                    font-black
                    tracking-tight
                    text-[var(--foreground)]
                  "
                >
                  Kabadiwala Connect
                </p>

                {/*   */}
              </div>

            </button>
          </div>

          {/* ==================================================
              RIGHT
          ================================================== */}

          <div className="shrink-0">
  <motion.button
    type="button"
    whileTap={{
      scale: 0.9,
    }}
    animate={{
      scale: showWeather ? 1.04 : 1,
    }}
    transition={{
      type: "spring",
      stiffness: 400,
      damping: 20,
    }}
    onClick={() =>
      setShowWeather(
        (current) => !current
      )
    }
    aria-label="Weather notifications"
    aria-expanded={showWeather}
    className={`
      relative
      flex
      h-10
      w-10
      items-center
      justify-center
      rounded-xl
      transition-all
      duration-200

      ${
        showWeather
          ? `
            bg-gradient-to-br
            from-indigo-500
            to-violet-500
            text-white
            shadow-md
            shadow-indigo-500/20
          `
          : `
            text-[var(--muted)]
            hover:bg-[var(--surface-soft)]
            hover:text-[var(--foreground)]
          `
      }
    `}
  >
    <motion.span
      animate={{
        rotate: showWeather
          ? [0, -8, 8, -5, 5, 0]
          : 0,
      }}
      transition={{
        duration: 0.45,
        ease: "easeOut",
      }}
    >
      <Bell
        size={18}
        strokeWidth={2}
      />
    </motion.span>

    {/* ALERT DOT */}

    {!showWeather &&
      alerts.length > 0 && (
        <span
          className="
            absolute
            right-2
            top-2
            h-1.5
            w-1.5
            rounded-full
            bg-[#E6A43B]
            ring-2
            ring-[var(--surface)]
          "
        />
      )}
  </motion.button>
</div>

        </div>

        {/* ====================================================
            WEATHER POPOVER
        ==================================================== */}

        <AnimatePresence>
          {showWeather && (
            <>
              {/* BACKDROP */}

              <motion.button
                type="button"
                aria-label="Close weather"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                onClick={() =>
                  setShowWeather(
                    false
                  )
                }
                className="
                  fixed
                  inset-0
                  z-40
                  bg-black/[0.025]
                  lg:hidden
                "
              />

              {/* PANEL */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: -6,
                  scale: 0.985,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: -6,
                  scale: 0.985,
                }}
                transition={{
                  duration: 0.2,
                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                }}
                className="
                  absolute
                  left-0
                  right-0
                  top-[calc(100%+8px)]
                  z-50
                  max-h-[calc(100vh-90px)]
                  overflow-y-auto
                  rounded-[24px]
                  border
                  border-[var(--border)]
                  bg-[var(--surface)]
                  p-3
                  shadow-2xl
                  shadow-[rgba(18,63,45,0.10)]
                "
              >
                <WeatherNoticeMobile
                  summary={
                    summary
                  }
                  alerts={
                    alerts
                  }
                  loading={
                    loading
                  }
                  notificationPermission={
                    notificationPermission
                  }
                  onEnableNotifications={
                    requestNotificationPermission
                  }
                  onRefresh={
                    checkWeather
                  }
                  soundEnabled={
                    soundEnabled
                  }
                  onEnableSound={
                    enableAlertSound
                  }
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </motion.div>
    </header>
  );
};

export default MobileHeader;