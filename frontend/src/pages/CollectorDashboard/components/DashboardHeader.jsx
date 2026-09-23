import {
  Bell,
  MapPin,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import useAuthStore from "../../../store/authStore";
import useRegionStore from "../../../store/regionStore";

import EWasteAIButton from "../../../components/EWasteAIButton.jsx";

const DashboardHeader = () => {
  const navigate = useNavigate();

  const { user } = useAuthStore();

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
          Here's what's happening with your collection.
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
          className="
            group/mitra
            relative
            flex
            h-10
            items-center
            gap-2
            overflow-hidden
            rounded-xl
            border
            border-[var(--border)]
            bg-[var(--surface)]
            px-3
            text-sm
            font-semibold
            text-[var(--foreground)]
            shadow-[0_6px_18px_rgba(18,63,45,0.06)]
            transition-all
            duration-300
            hover:border-[var(--foreground)]/20
            hover:shadow-[0_10px_25px_rgba(18,63,45,0.10)]
          "
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

        {/* ==================================================
            E-WASTE AI
        ================================================== */}

        <EWasteAIButton />

        {/* ==================================================
            NOTIFICATIONS
        ================================================== */}

        <motion.button
          type="button"
          whileHover={{
            y: -2,
          }}
          whileTap={{
            scale: 0.96,
          }}
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
            className="
              transition-transform
              duration-300
              group-hover/bell:-rotate-6
            "
          />

          {/* NOTIFICATION DOT */}

          <span
            className="
              absolute
              right-2
              top-2
              h-1.5
              w-1.5
              rounded-full
              bg-[var(--danger)]
              shadow-[0_0_8px_rgba(207,82,100,0.35)]
            "
          />
        </motion.button>

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
            border
            border-[var(--border)]
            bg-[var(--surface)]
            text-xs
            font-black
            text-[var(--foreground)]
            shadow-[0_6px_18px_rgba(18,63,45,0.06)]
            transition-all
            duration-300
            hover:border-[var(--foreground)]/15
            hover:shadow-[0_10px_24px_rgba(18,63,45,0.10)]
          "
        >
          {/* PROFILE SPARK */}

          <span
            className="
              pointer-events-none
              absolute
              inset-0
              rounded-xl
              ring-1
              ring-inset
              ring-white/50
            "
          />

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