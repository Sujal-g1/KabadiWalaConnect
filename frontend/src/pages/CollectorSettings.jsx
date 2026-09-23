import {
  ArrowLeft,
  ChevronRight,
  Info,
  LogOut,
  Palette,
  UserRound,
  ShieldCheck,
} from "lucide-react";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import ThemeSelector from "../components/ThemeSelector";
import LanguageSelector from "../components/LanguageSelector";
import useTranslation from "../i18n/useTranslation";

import useAuthStore from "../store/authStore";

const CollectorSettings = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const user = useAuthStore(
    (state) => state.user
  );

  const clearUser = useAuthStore(
    (state) => state.clearUser
  );

  const handleLogout = () => {
    clearUser();

    navigate("/", {
      replace: true,
    });
  };

  const displayName =
    user?.firstName ||
    user?.name ||
    "Collector";

  const phoneNumber =
    user?.phoneNumber ||
    user?.phone ||
    "";

  const initials =
    `${user?.firstName?.charAt(0) || ""}${
      user?.lastName?.charAt(0) || ""
    }`
      .trim()
      .toUpperCase() ||
    displayName.charAt(0).toUpperCase();

  return (
    <main className="w-full">
      <div
        className="
          relative
          mx-auto
          w-full
          max-w-3xl
          overflow-hidden
          px-4
          py-5
          pb-32
          sm:px-6
          sm:py-8
        "
      >
        {/* =====================================================
            BACKGROUND LIGHT
        ===================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            -right-32
            -top-24
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
            top-[480px]
            h-72
            w-72
            rounded-full
            bg-teal-300/[0.035]
            blur-[100px]
          "
        />

        {/* =====================================================
            HEADER
        ===================================================== */}

        <motion.header
          initial={{
            opacity: 0,
            y: 8,
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
            z-10
            flex
            items-center
            gap-3
          "
        >
          {/* BACK BUTTON */}

          <motion.button
            type="button"
            onClick={() =>
              navigate("/collector")
            }
            whileHover={{
              x: -2,
              y: -1,
            }}
            whileTap={{
              scale: 0.94,
            }}
            aria-label="Back to dashboard"
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-2xl
              border
              border-[var(--border)]
              bg-[var(--surface)]
              text-[var(--foreground)]
              shadow-[0_8px_24px_rgba(18,63,45,0.06)]
              transition-all
              duration-300
              hover:shadow-[0_12px_28px_rgba(18,63,45,0.10)]
            "
          >
            <ArrowLeft size={19} />
          </motion.button>

          {/* TITLE */}

          <div className="min-w-0">
            <p
              className="
                text-[10px]
                font-black
                uppercase
                tracking-[0.16em]
                text-[var(--muted)]
              "
            >
              Account
            </p>

            <h1
              className="
                mt-0.5
                text-2xl
                font-black
                tracking-tight
                text-[var(--foreground)]
              "
            >
              {t("navigation.settings")}
            </h1>
          </div>
        </motion.header>

        {/* =====================================================
            PROFILE CARD
        ===================================================== */}

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
            delay: 0.04,
          }}
          className="relative z-10 mt-7"
        >
          <div
            className="
              group
              relative
              overflow-hidden
              rounded-[28px]
              border
              border-[var(--border)]
              bg-[var(--surface)]
              p-px
              shadow-[0_14px_40px_rgba(18,63,45,0.08)]
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:shadow-[0_20px_48px_rgba(18,63,45,0.11)]
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
                opacity-60
              "
            />

            <div
              className="
                relative
                overflow-hidden
                rounded-[27px]
                bg-[linear-gradient(135deg,var(--surface)_0%,var(--surface-soft)_100%)]
                p-5
                sm:p-6
              "
            >
              {/* DECORATIVE LIGHT */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-12
                  -top-12
                  h-36
                  w-36
                  rounded-full
                  bg-emerald-300/[0.05]
                  blur-[60px]
                "
              />

              <div
                className="
                  relative
                  z-10
                  flex
                  items-center
                  gap-4
                "
              >
                {/* AVATAR */}

                <motion.div
                  whileHover={{
                    scale: 1.04,
                    rotate: -2,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 18,
                  }}
                  className="
                    relative
                    flex
                    h-16
                    w-16
                    shrink-0
                    items-center
                    justify-center
                    rounded-[20px]
                    border
                    border-[var(--border)]
                    bg-[var(--surface)]
                    text-xl
                    font-black
                    text-[var(--primary)]
                    shadow-[0_10px_26px_rgba(18,63,45,0.08)]
                  "
                >
                  {initials}

                  {/* ONLINE */}

                  <span
                    className="
                      absolute
                      bottom-0.5
                      right-0.5
                      h-3
                      w-3
                      rounded-full
                      border-2
                      border-[var(--surface)]
                      bg-emerald-400
                    "
                  />
                </motion.div>

                {/* USER INFO */}

                <div className="min-w-0 flex-1">
                  <p
                    className="
                      truncate
                      text-lg
                      font-black
                      tracking-tight
                      text-[var(--foreground)]
                    "
                  >
                    {displayName}
                  </p>

                  {phoneNumber ? (
                    <p
                      className="
                        mt-1
                        truncate
                        text-sm
                        font-medium
                        text-[var(--muted)]
                      "
                    >
                      {phoneNumber}
                    </p>
                  ) : (
                    <p
                      className="
                        mt-1
                        text-sm
                        font-medium
                        text-[var(--muted)]
                      "
                    >
                      Collector account
                    </p>
                  )}
                </div>

                {/* VERIFIED */}

                <div
                  className="
                    hidden
                    shrink-0
                    items-center
                    gap-1.5
                    rounded-full
                    border
                    border-[var(--border)]
                    bg-[var(--surface)]
                    px-2.5
                    py-1.5
                    text-[10px]
                    font-bold
                    text-[var(--muted)]
                    shadow-[0_5px_14px_rgba(18,63,45,0.04)]
                    sm:flex
                  "
                >
                  <ShieldCheck
                    size={13}
                    className="text-[var(--primary)]"
                  />

                  Verified
                </div>
              </div>

              {/* BOTTOM ACCENT */}

              <div
                className="
                  pointer-events-none
                  absolute
                  bottom-0
                  left-6
                  h-[2px]
                  w-12
                  rounded-full
                  bg-[var(--primary)]
                  opacity-45
                "
              />
            </div>
          </div>
        </motion.section>

        {/* =====================================================
            APPEARANCE
        ===================================================== */}

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
            delay: 0.08,
          }}
          className="relative z-10 mt-8"
        >
          <SectionLabel
            icon={Palette}
            label="Appearance"
          />

          <SettingsCard>
            <div className="p-4 sm:p-5">
              <ThemeSelector />
            </div>
          </SettingsCard>
        </motion.section>

        {/* =====================================================
            LANGUAGE
        ===================================================== */}

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
            delay: 0.12,
          }}
          className="relative z-10 mt-6"
        >
          <SectionLabel
            icon={Info}
            label="Language"
          />

          <SettingsCard>
            <div className="p-4 sm:p-5">
              <LanguageSelector />
            </div>
          </SettingsCard>
        </motion.section>

        {/* =====================================================
            ACCOUNT
        ===================================================== */}

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
          className="relative z-10 mt-8"
        >
          <SectionLabel
            icon={UserRound}
            label="Account"
          />

          <SettingsCard>
            <motion.button
              type="button"
              onClick={() =>
                navigate(
                  "/collector/profile"
                )
              }
              whileHover={{
                y: -1,
              }}
              whileTap={{
                scale: 0.995,
              }}
              className="
                group/profile
                relative
                flex
                min-h-[76px]
                w-full
                items-center
                gap-3
                overflow-hidden
                px-5
                text-left
                transition-all
                duration-300
              "
            >
              {/* LEFT ACCENT */}

              <span
                className="
                  absolute
                  left-0
                  top-1/2
                  h-6
                  w-0.5
                  -translate-y-1/2
                  rounded-r-full
                  bg-[var(--primary)]
                  opacity-0
                  transition-all
                  duration-300
                  group-hover/profile:h-9
                  group-hover/profile:opacity-70
                "
              />

              {/* ICON */}

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
                  border-[var(--border)]
                  bg-[var(--surface-soft)]
                  text-[var(--muted)]
                  shadow-[0_5px_14px_rgba(18,63,45,0.04)]
                  transition-all
                  duration-300
                  group-hover/profile:scale-105
                  group-hover/profile:text-[var(--foreground)]
                "
              >
                <UserRound size={17} />
              </div>

              {/* TEXT */}

              <div className="min-w-0 flex-1">
                <p
                  className="
                    text-sm
                    font-bold
                    text-[var(--foreground)]
                  "
                >
                  Profile
                </p>

                <p
                  className="
                    mt-0.5
                    text-xs
                    font-medium
                    text-[var(--muted)]
                  "
                >
                  View and manage your profile
                </p>
              </div>

              {/* ARROW */}

              <div
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-transparent
                  text-[var(--muted)]
                  transition-all
                  duration-300
                  group-hover/profile:border-[var(--border)]
                  group-hover/profile:bg-[var(--surface)]
                  group-hover/profile:text-[var(--foreground)]
                  group-hover/profile:shadow-sm
                "
              >
                <ChevronRight
                  size={17}
                  className="
                    transition-transform
                    duration-300
                    group-hover/profile:translate-x-0.5
                  "
                />
              </div>
            </motion.button>
          </SettingsCard>
        </motion.section>

        {/* =====================================================
            LOGOUT
        ===================================================== */}

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
            delay: 0.20,
          }}
          className="relative z-10 mt-8"
        >
          <motion.button
            type="button"
            onClick={handleLogout}
            whileHover={{
              y: -1,
            }}
            whileTap={{
              scale: 0.99,
            }}
            className="
              group/logout
              relative
              flex
              min-h-14
              w-full
              items-center
              justify-center
              gap-2
              overflow-hidden
              rounded-2xl
              border
              border-[var(--border)]
              bg-[var(--surface)]
              px-5
              text-sm
              font-black
              text-[var(--danger)]
              shadow-[0_8px_24px_rgba(18,63,45,0.05)]
              transition-all
              duration-300
              hover:shadow-[0_12px_30px_rgba(18,63,45,0.08)]
            "
          >
            {/* SUBTLE HOVER SURFACE */}

            <span
              className="
                pointer-events-none
                absolute
                inset-0
                bg-[var(--danger)]
                opacity-0
                transition-opacity
                duration-300
                group-hover/logout:opacity-[0.025]
              "
            />

            <LogOut
              size={18}
              className="
                relative
                z-10
                transition-transform
                duration-300
                group-hover/logout:-translate-x-0.5
              "
            />

            <span className="relative z-10">
              Log out
            </span>
          </motion.button>
        </motion.section>

        {/* =====================================================
            APP INFORMATION
        ===================================================== */}

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
            delay: 0.24,
          }}
          className="relative z-10 mt-8"
        >
          <div
            className="
              group/info
              relative
              overflow-hidden
              rounded-[24px]
              border
              border-[var(--border)]
              bg-[var(--surface)]
              p-4
              shadow-[0_8px_24px_rgba(18,63,45,0.05)]
              transition-all
              duration-300
              hover:shadow-[0_12px_30px_rgba(18,63,45,0.08)]
              sm:p-5
            "
          >
            {/* TOP LINE */}

            <div
              className="
                pointer-events-none
                absolute
                left-7
                right-7
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
                flex
                items-center
                justify-between
                gap-4
              "
            >
              <div className="min-w-0">
                <p
                  className="
                    text-sm
                    font-black
                    text-[var(--foreground)]
                  "
                >
                  Kabadiwala Connect
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    font-medium
                    text-[var(--muted)]
                  "
                >
                  E-Waste collection platform
                </p>
              </div>

              <span
                className="
                  shrink-0
                  rounded-lg
                  border
                  border-[var(--border)]
                  bg-[var(--surface)]
                  px-2.5
                  py-1
                  text-[10px]
                  font-bold
                  text-[var(--muted)]
                  shadow-sm
                "
              >
                v1.0
              </span>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
};

/* ============================================================
   SETTINGS CARD
============================================================ */

const SettingsCard = ({
  children,
}) => {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-[26px]
        border
        border-[var(--border)]
        bg-[var(--surface)]
        shadow-[0_9px_28px_rgba(18,63,45,0.055)]
        transition-all
        duration-300
        hover:shadow-[0_14px_34px_rgba(18,63,45,0.08)]
      "
    >
      {/* SPARK BORDER */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-[26px]
          bg-[conic-gradient(from_180deg_at_50%_50%,transparent_0deg,transparent_250deg,rgba(255,255,255,0.85)_286deg,rgba(255,255,255,0.18)_312deg,transparent_345deg)]
          opacity-55
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-px
          rounded-[25px]
          bg-[var(--surface)]
        "
      />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

/* ============================================================
   SECTION LABEL
============================================================ */

const SectionLabel = ({
  icon: Icon,
  label,
}) => {
  return (
    <div
      className="
        mb-3
        flex
        items-center
        gap-2
        px-1
      "
    >
      <div
        className="
          flex
          h-7
          w-7
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
        <Icon
          size={14}
          strokeWidth={2.2}
        />
      </div>

      <p
        className="
          text-[10px]
          font-black
          uppercase
          tracking-[0.15em]
          text-[var(--muted)]
        "
      >
        {label}
      </p>
    </div>
  );
};

export default CollectorSettings;