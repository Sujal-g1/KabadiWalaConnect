import {
  Home,
  Package,
  Plus,
  IndianRupee,
  MoreHorizontal,
} from "lucide-react";

import {
  motion,
} from "framer-motion";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import useTranslation from "../../i18n/useTranslation";

const BottomNavigation = ({
  onMoreClick,
}) => {
  const navigate =
    useNavigate();

  const location =
    useLocation();

  const { t } =
    useTranslation();

  /* ==========================================================
     ACTIVE
  ========================================================== */

  const isActive = (
    path
  ) => {
    if (
      path === "/collector"
    ) {
      return (
        location.pathname ===
        "/collector"
      );
    }

    return location.pathname.startsWith(
      path
    );
  };

  /* ==========================================================
     NAV ITEM
  ========================================================== */

  const NavItem = ({
    path,
    icon: Icon,
    label,
  }) => {
    const active =
      isActive(path);

    return (
      <button
        type="button"
        onClick={() =>
          navigate(path)
        }
        className="
          relative
          flex
          min-w-[58px]
          flex-1
          flex-col
          items-center
          justify-center
          gap-1
          py-1
        "
      >
        {/* ACTIVE PILL */}

        {active && (
          <motion.span
            layoutId="mobile-nav-active"
            className="
              absolute
              -top-1
              h-1
              w-7
              rounded-full
              bg-indigo-500
            "
            transition={{
              type: "spring",
              stiffness: 450,
              damping: 30,
            }}
          />
        )}

        {/* ICON WRAPPER */}

        <motion.span
          animate={{
            y: active ? -1 : 0,
            scale: active ? 1.04 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 24,
          }}
          className={`
            flex
            h-9
            w-10
            items-center
            justify-center
            rounded-xl
            transition-colors
            ${
              active
                ? "bg-indigo-500/10 text-indigo-500"
                : "text-[var(--muted)]"
            }
          `}
        >
          <Icon
            size={19}
            strokeWidth={
              active
                ? 2.4
                : 2
            }
          />
        </motion.span>

        <span
          className={`
            text-[9px]
            font-bold
            tracking-tight
            transition-colors
            ${
              active
                ? "text-indigo-500"
                : "text-[var(--muted)]"
            }
          `}
        >
          {label}
        </span>
      </button>
    );
  };

  return (
    <nav
      className="
        fixed
        inset-x-0
        bottom-0
        z-50
        px-3
        pb-[max(8px,env(safe-area-inset-bottom))]
        lg:hidden
      "
    >
      <div
        className="
          relative
          mx-auto
          max-w-md
        "
      >
        {/* ====================================================
            NAV BAR
        ==================================================== */}

        <div
          className="
            relative
            flex
            h-[68px]
            items-center
            gap-1
            overflow-visible
            rounded-[24px]
            border
            border-[var(--border)]
            bg-[var(--surface)]/92
            px-2
            shadow-2xl
            shadow-black/10
            backdrop-blur-2xl
          "
        >
          {/* LEFT */}

          <NavItem
            path="/collector"
            icon={Home}
            label={t(
              "navigation.home"
            )}
          />

          <NavItem
            path="/collector/lots"
            icon={Package}
            label={t(
              "navigation.myLots"
            )}
          />

          {/* ==================================================
              CENTER CREATE BUTTON
          ================================================== */}

          <div className="
            flex
            h-full
            w-[68px]
            shrink-0
            items-start
            justify-center
          ">
            <motion.button
              type="button"
              whileHover={{
                y: -2,
                scale: 1.04,
              }}
              whileTap={{
                scale: 0.93,
              }}
              onClick={() =>
                navigate(
                  "/collector/lots/create"
                )
              }
              aria-label="Create lot"
              className="
                relative
                -mt-7
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-[22px]
                bg-gradient-to-br
                from-amber-400
                via-orange-500
                to-rose-500
                text-white
                shadow-xl
                shadow-orange-500/25
                ring-4
                ring-[var(--background)]
              "
            >
              {/* Rotating outline */}

              <motion.span
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="
                  pointer-events-none
                  absolute
                  inset-1
                  rounded-[18px]
                  border
                  border-white/20
                  border-dashed
                "
              />

              <Plus
                size={27}
                strokeWidth={2.4}
              />
            </motion.button>
          </div>

          <NavItem
            path="/collector/prices"
            icon={IndianRupee}
            label={t(
              "navigation.prices"
            )}
          />

          {/* MORE */}

          <button
            type="button"
            onClick={onMoreClick}
            className="
              relative
              flex
              min-w-[58px]
              flex-1
              flex-col
              items-center
              justify-center
              gap-1
              py-1
            "
          >
            <motion.span
              whileTap={{
                scale: 0.9,
              }}
              className="
                flex
                h-9
                w-10
                items-center
                justify-center
                rounded-xl
                text-[var(--muted)]
              "
            >
              <MoreHorizontal
                size={20}
                strokeWidth={2}
              />
            </motion.span>

            <span className="
              text-[9px]
              font-bold
              text-[var(--muted)]
            ">
              {t(
                "common.more"
              )}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default BottomNavigation;