import {
  Bell,
  Menu,
  MapPin,
  ChevronRight,
} from "lucide-react";

import {
  motion,
} from "framer-motion";

import {
  useNavigate,
} from "react-router-dom";

import logo from "../../assets/images/logo.webp";

import useAuthStore from "../../store/authStore";
import useRegionStore from "../../store/regionStore";
import useTranslation from "../../i18n/useTranslation";

const MobileHeader = ({
  onMenuClick,
}) => {
  const navigate = useNavigate();

  const { user } =
    useAuthStore();

  const { t } =
    useTranslation();

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

  const firstName =
    user?.firstName ||
    "Collector";

  const initials =
    `${user?.firstName?.charAt(0) || ""}${user?.lastName?.charAt(0) || ""}`
      .trim()
      .toUpperCase() || "U";

  /* ==========================================================
     LOCATION
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
        sticky top-0 z-40
        px-3 pt-3
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
          overflow-hidden
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
            SUBTLE TOP LIGHT
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
            via-indigo-400/60
            to-transparent
          "
        />

        <div className="
          flex
          items-center
          justify-between
          gap-3
        ">
          {/* ==================================================
              LEFT
          ================================================== */}

          <div className="
            flex
            min-w-0
            items-center
            gap-2.5
          ">
            {/* MENU */}

            <motion.button
              type="button"
              whileTap={{
                scale: 0.9,
              }}
              onClick={onMenuClick}
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
                navigate("/collector")
              }
              className="
                flex
                min-w-0
                items-center
                gap-2.5
                text-left
              "
            >
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

              <div className="
                min-w-0
              ">
                <p className="
                  truncate
                  text-[14px]
                  font-black
                  tracking-tight
                  text-[var(--foreground)]
                ">
                  Kabadiwala Connect
                </p>

              { /*  <div className="
                  mt-0.5
                  flex
                  max-w-[180px]
                  items-center
                  gap-1
                  text-[9px]
                  font-semibold
                  text-[var(--muted)]
                ">
                  <MapPin
                    size={10}
                    className="
                      shrink-0
                      text-indigo-400
                    "
                  />

                  <span className="truncate">
                    {locationLabel}
                  </span>
                </div>
                */} 
              </div>
            </button>
          </div>

          {/* ==================================================
              RIGHT 
          ================================================== */}

          <div className="
            flex
            shrink-0
            items-center
            gap-1.5
          ">
            {/* NOTIFICATION */}

            <motion.button
              type="button"
              whileTap={{
                scale: 0.9,
              }}
              className="
                relative
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                text-[var(--muted)]
                transition
                hover:bg-[var(--surface-soft)]
                hover:text-[var(--foreground)]
              "
            >
              <Bell
                size={18}
                strokeWidth={2}
              />

              <span
                className="
                  absolute
                  right-2
                  top-2
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-rose-500
                  ring-2
                  ring-[var(--surface)]
                "
              />
            </motion.button>

            {/* PROFILE */}

            <motion.button
              type="button"
              whileTap={{
                scale: 0.9,
              }}
              onClick={() =>
                navigate(
                  "/collector/settings"
                )
              }
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-gradient-to-br
                from-indigo-500
                to-violet-500
                text-xs
                font-black
                text-white
                shadow-md
                shadow-indigo-500/20
              "
            >
              {initials}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </header>
  );
};

export default MobileHeader;