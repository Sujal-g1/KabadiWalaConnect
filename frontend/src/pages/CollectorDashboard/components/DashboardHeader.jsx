import { useState } from "react";

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

import EWasteAIButton from "../../../components/EWasteAIButton.jsx";

const DashboardHeader = () => {
  console.log("COLLECTOR DASHBOARD HEADER LOADED");
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const { user } = useAuthStore();

  const {
    alerts: weatherAlerts,
    checkWeather,
  } = useWeatherAlerts();
  console.log("WEATHER HOOK LOADED", weatherAlerts);
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
      return "Good Morning";
    }

    if (hour < 17) {
      return "Good Afternoon";
    }

    if (hour < 21) {
      return "Good Evening";
    }

    return "Good Night";
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
    <div className="mb-7 flex items-start justify-between gap-4">
      {/* ======================================================
          LEFT
      ====================================================== */}

      <div className="min-w-0">
        {/* LOCATION */}

        <div className="mb-2 flex items-center gap-1.5 text-xs text-[var(--muted)]">
          <MapPin
            size={14}
            className="shrink-0"
          />

          <span className="truncate">
            {locationLabel}
          </span>
        </div>

        {/* GREETING */}

        <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
          {getGreeting()}, {firstName}
        </h1>

        {/* SUBTITLE */}

        <p className="mt-1 text-sm text-[var(--muted)]">
          Here's what's happening with your collection.
        </p>
      </div>

      {/* ======================================================
          RIGHT
      ====================================================== */}

      <div className="flex shrink-0 items-center gap-2">

        {/* voice assis */}
        <motion.button
        type="button"
        onClick={() => navigate("/seva-ai")}
        aria-label="Open SEVA-AI"
        title="SEVA-AI"
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
      className="flex h-10 items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-sm font-semibold text-[var(--foreground)] shadow-sm transition hover:border-[var(--primary)] hover:bg-[var(--accent)]"
    >
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
        </motion.button>

        <EWasteAIButton />

        {/* NOTIFICATIONS */}
        <button
          type="button"
          onClick={() => setShowNotifications(!showNotifications)}
          className="
            relative hidden h-10 w-10
            items-center justify-center
            rounded-xl border
            border-[var(--border)]
            bg-[var(--surface)]
            text-[var(--muted)]
            transition
            hover:bg-[var(--surface-soft)]
            sm:flex
          "
        >
          <Bell size={19} />

          {weatherAlerts.length > 0 && (
            <span
              className="
                absolute right-2 top-2
                h-1.5 w-1.5
                rounded-full
                bg-[var(--danger)]
              "
            />
          )}
        </button>
          {showNotifications && (
              <div className="fixed right-8 top-20 z-50 w-80 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-[var(--foreground)]">
                    Notifications
                  </h3>

                  <button
                    type="button"
                    onClick={() => setShowNotifications(false)}
                    className="text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
                  >
                    Close
                  </button>
                </div>

                <div className="mt-4 space-y-3">
                  {weatherAlerts.length > 0 ? (
                    weatherAlerts.map((alert, index) => (
                      <div
                        key={index}
                        className="rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] p-3"
                      >
                        <p className="text-sm font-medium text-[var(--foreground)]">
                          {alert.title || "Weather Alert"}
                        </p>

                        <p className="mt-1 text-xs text-[var(--muted)]">
                          {alert.message || "Weather conditions may require your attention."}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-xl bg-[var(--surface-soft)] p-4 text-center">
                      <p className="text-sm font-medium text-[var(--foreground)]">
                        No new notifications
                      </p>

                      <p className="mt-1 text-xs text-[var(--muted)]">
                        You're all caught up.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}


        {/* PROFILE */}

        <button
          type="button"
          onClick={() =>
            navigate(
              "/collector/settings"
            )
          }
          className="
            flex h-10 w-10
            items-center justify-center
            rounded-xl
            bg-[var(--surface-soft)]
            text-xs font-bold
            text-[var(--foreground)]
          "
        >
          {initials}
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;