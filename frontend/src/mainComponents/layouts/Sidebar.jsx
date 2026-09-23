import {
  LayoutDashboard,
  Package,
  IndianRupee,
  Recycle,
  Wallet,
  ShieldCheck,
  UserRound,
  Settings,
  LogOut,
  ChevronLeft,
  Gift,
  Plus,
  ChevronRight,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import logo from "../../assets/images/logo.webp";

import useAuthStore from "../../store/authStore";
import useTranslation from "../../i18n/useTranslation";
import {
  logoutFirebase,
} from "../../services/auth/googleAuth";

const Sidebar = ({
  collapsed,
  setCollapsed,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    user,
    clearUser,
  } = useAuthStore();

  const { t } =
    useTranslation();

  /* ==========================================================
     NAVIGATION
  ========================================================== */

  const mainItems = [
    {
      label: t(
        "navigation.dashboard"
      ),
      icon: LayoutDashboard,
      path: "/collector",
    },
    {
      label: t(
        "navigation.myLots"
      ),
      icon: Package,
      path: "/collector/lots",
    },
    {
      label: t(
        "navigation.prices"
      ),
      icon: IndianRupee,
      path: "/collector/prices",
    },
    {
      label: t(
        "navigation.rewards"
      ),
      icon: Gift,
      path: "/collector/rewards",
    },
    {
      label: t(
        "navigation.recyclers"
      ),
      icon: Recycle,
      path: "/collector/recyclers",
    },
  ];

  const activityItems = [
    {
      label: t(
        "navigation.earnings"
      ),
      icon: Wallet,
      path: "/collector/earnings",
    },
    {
      label: t(
        "navigation.transactions"
      ),
      icon: ShieldCheck,
      path: "/collector/transactions",
    },
  ];

  const accountItems = [
    {
      label: t(
        "navigation.profile"
      ),
      icon: UserRound,
      path: "/collector/profile",
    },
    {
      label: t(
        "navigation.settings"
      ),
      icon: Settings,
      path: "/collector/settings",
    },
  ];

  /* ==========================================================
     ACTIVE STATE
  ========================================================== */

  const isActive = (path) => {
    if (path === "/collector") {
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
     LOGOUT
  ========================================================== */

  const handleLogout = async () => {
    try {
      await logoutFirebase();
      clearUser();
      navigate("/");
    } catch (error) {
      console.error(
        "Logout failed:",
        error
      );
    }
  };

  /* ==========================================================
     NAV ITEM
  ========================================================== */

  const NavItem = ({
    item,
    index,
    sectionIndex,
  }) => {
    const Icon = item.icon;
    const active = isActive(
      item.path
    );

    return (
      <motion.button
        key={item.path}
        type="button"
        initial={{
          opacity: 0,
          x: -8,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.25,
          delay:
            sectionIndex * 0.05 +
            index * 0.035,
        }}
        whileHover={{
          x: collapsed ? 0 : 2,
        }}
        whileTap={{
          scale: 0.985,
        }}
        onClick={() =>
          navigate(item.path)
        }
        title={
          collapsed
            ? item.label
            : undefined
        }
        className={`
          group/nav
          relative
          flex
          w-full
          items-center
          gap-3
          overflow-hidden
          rounded-2xl
          border
          px-3
          py-2.5
          text-left
          transition-all
          duration-300

          ${
            collapsed
              ? "justify-center"
              : ""
          }

          ${
            active
              ? `
                border-[var(--border)]
                bg-[var(--surface)]
                text-[var(--primary)]
                shadow-[0_8px_24px_rgba(18,63,45,0.08)]
              `
              : `
                border-transparent
                bg-transparent
                text-[var(--muted)]
                hover:border-[var(--border)]
                hover:bg-[var(--surface)]
                hover:text-[var(--foreground)]
                hover:shadow-[0_7px_20px_rgba(18,63,45,0.055)]
              `
          }
        `}
      >
        {/* ==================================================
            ACTIVE SPARK BORDER
        ================================================== */}

        {active && (
          <>
            <div
              className="
                pointer-events-none
                absolute
                inset-0
                rounded-2xl
                bg-[conic-gradient(from_180deg_at_50%_50%,transparent_0deg,transparent_250deg,rgba(255,255,255,0.9)_286deg,rgba(255,255,255,0.25)_310deg,transparent_340deg)]
                opacity-70
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                inset-px
                rounded-[15px]
                bg-[var(--surface)]
              "
            />
          </>
        )}

        {/* ==================================================
            MOVING SPARK
        ================================================== */}

        <motion.span
          initial={{
            x: "-150%",
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
            z-20
            w-5
            rotate-[20deg]
            bg-gradient-to-r
            from-transparent
            via-white/55
            to-transparent
            blur-sm
            opacity-0
            transition-opacity
            duration-200
            group-hover/nav:opacity-100
          "
        />

        {/* ==================================================
            ACTIVE LEFT INDICATOR
        ================================================== */}

        {active && (
          <motion.span
            layoutId="collector-sidebar-indicator"
            transition={{
              type: "spring",
              stiffness: 380,
              damping: 30,
            }}
            className="
              absolute
              left-0
              top-1/2
              z-30
              h-7
              w-1
              -translate-y-1/2
              rounded-r-full
              bg-[var(--primary)]
              shadow-[0_0_12px_rgba(24,121,78,0.18)]
            "
          />
        )}

        {/* ==================================================
            ICON
        ================================================== */}

        <span
          className={`
            relative
            z-30
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
            transition-all
            duration-300

            ${
              active
                ? `
                  border-[var(--border)]
                  bg-[var(--surface)]
                  text-[var(--primary)]
                  shadow-[0_6px_18px_rgba(18,63,45,0.07)]
                `
                : `
                  border-transparent
                  bg-[var(--surface-soft)]
                  text-[var(--muted)]
                  group-hover/nav:border-[var(--border)]
                  group-hover/nav:bg-[var(--surface)]
                  group-hover/nav:text-[var(--foreground)]
                  group-hover/nav:scale-105
                  group-hover/nav:shadow-[0_6px_16px_rgba(18,63,45,0.06)]
                `
            }
          `}
        >
          <Icon
            size={18}
            strokeWidth={
              active ? 2.4 : 2
            }
          />
        </span>

        {/* ==================================================
            LABEL
        ================================================== */}

        <AnimatePresence
          initial={false}
        >
          {!collapsed && (
            <motion.span
              initial={{
                opacity: 0,
                width: 0,
              }}
              animate={{
                opacity: 1,
                width: "auto",
              }}
              exit={{
                opacity: 0,
                width: 0,
              }}
              transition={{
                duration: 0.2,
              }}
              className="
                relative
                z-30
                min-w-0
                flex-1
                truncate
                text-sm
                font-semibold
              "
            >
              {item.label}
            </motion.span>
          )}
        </AnimatePresence>

        {/* ==================================================
            ARROW
        ================================================== */}

        {!collapsed && (
          <motion.span
            animate={{
              opacity: active ? 1 : 0,
              x: active ? 0 : -4,
            }}
            className="
              relative
              z-30
              text-[var(--muted)]
            "
          >
            <ChevronRight
              size={15}
              strokeWidth={2.3}
            />
          </motion.span>
        )}
      </motion.button>
    );
  };

  /* ==========================================================
     RENDER ITEMS
  ========================================================== */

  const renderItems = (
    items,
    sectionIndex
  ) =>
    items.map(
      (item, index) => (
        <NavItem
          key={item.path}
          item={item}
          index={index}
          sectionIndex={sectionIndex}
        />
      )
    );

  /* ==========================================================
     SECTION TITLE
  ========================================================== */

  const SectionTitle = ({
    children,
  }) => (
    <AnimatePresence
      initial={false}
    >
      {!collapsed && (
        <motion.p
          initial={{
            opacity: 0,
            y: 4,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: 4,
          }}
          className="
            mb-2
            px-3
            text-[9px]
            font-black
            uppercase
            tracking-[0.18em]
            text-[var(--muted-foreground)]
          "
        >
          {children}
        </motion.p>
      )}
    </AnimatePresence>
  );

  return (
    <motion.aside
      initial={false}
      animate={{
        width: collapsed
          ? 78
          : 252,
      }}
      transition={{
        duration: 0.32,
        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      }}
      className="
        hidden
        h-screen
        min-h-0
        shrink-0
        overflow-hidden
        border-r
        border-[var(--border)]
        bg-[var(--surface)]
        lg:flex
        lg:flex-col
      "
    >
      {/* ======================================================
          HEADER / BRAND
          Fixed
      ====================================================== */}

      <div
        className={`
          relative
          flex
          h-[82px]
          shrink-0
          items-center
          border-b
          border-[var(--border)]
          px-3

          ${
            collapsed
              ? "justify-center"
              : "justify-between"
          }
        `}
      >
        {/* TOP SPARK */}

        <div
          className="
            pointer-events-none
            absolute
            left-5
            right-5
            top-0
            h-px
            bg-gradient-to-r
            from-transparent
            via-white/80
            to-transparent
            opacity-70
          "
        />

        {/* BRAND */}

        <motion.button
          type="button"
          whileTap={{
            scale: 0.97,
          }}
          onClick={() =>
            navigate("/collector")
          }
          className={`
            flex
            items-center

            ${
              collapsed
                ? "justify-center"
                : "gap-3"
            }
          `}
        >
          <motion.div
            whileHover={{
              rotate: 3,
              scale: 1.05,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 18,
            }}
            className="
              relative
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              overflow-hidden
              rounded-2xl
              border
              border-[var(--border)]
              bg-[var(--surface)]
              p-1.5
              shadow-[0_8px_22px_rgba(18,63,45,0.07)]
            "
          >
            <img
              src={logo}
              alt="Logo"
              className="
                h-full
                w-full
                object-contain
              "
            />

            <span
              className="
                pointer-events-none
                absolute
                inset-0
                rounded-2xl
                ring-1
                ring-inset
                ring-white/60
              "
            />
          </motion.div>

          <AnimatePresence
            initial={false}
          >
            {!collapsed && (
              <motion.div
                initial={{
                  opacity: 0,
                  x: -8,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: -8,
                }}
                transition={{
                  duration: 0.22,
                }}
                className="text-left"
              >
                <p
                  className="
                    text-[15px]
                    font-black
                    tracking-tight
                    text-[var(--foreground)]
                  "
                >
                  Kabadiwala
                </p>

                <p
                  className="
                    text-[9px]
                    font-black
                    uppercase
                    tracking-[0.24em]
                    text-[var(--muted)]
                  "
                >
                  Connect
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* COLLAPSE */}

        {!collapsed && (
          <motion.button
            type="button"
            whileHover={{
              scale: 1.05,
              y: -1,
            }}
            whileTap={{
              scale: 0.94,
            }}
            onClick={() =>
              setCollapsed(true)
            }
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-xl
              border
              border-transparent
              text-[var(--muted)]
              transition-all
              duration-300
              hover:border-[var(--border)]
              hover:bg-[var(--surface)]
              hover:text-[var(--foreground)]
              hover:shadow-[0_6px_16px_rgba(18,63,45,0.07)]
            "
            title="Collapse sidebar"
          >
            <ChevronLeft
              size={17}
            />
          </motion.button>
        )}
      </div>

      {/* ======================================================
          QUICK ACTION
          Fixed
      ====================================================== */}

      {!collapsed && (
        <div className="shrink-0 px-3 pt-4">
          <motion.button
            type="button"
            whileHover={{
              y: -1,
            }}
            whileTap={{
              scale: 0.985,
            }}
            onClick={() =>
              navigate(
                "/collector/lots/create"
              )
            }
            className="
              group/quick
              relative
              flex
              w-full
              items-center
              gap-3
              overflow-hidden
              rounded-2xl
              border
              border-white/10
              bg-[linear-gradient(120deg,#020806_0%,#06140d_28%,#0a2418_57%,#0d3926_100%)]
              px-3
              py-3
              text-left
              text-white
              shadow-[0_12px_30px_rgba(2,12,8,0.30)]
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:shadow-[0_16px_38px_rgba(2,12,8,0.38)]
            "
          >
            {/* SPARK BORDER */}

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                rounded-2xl
                bg-[conic-gradient(from_180deg_at_50%_50%,transparent_0deg,transparent_245deg,rgba(255,255,255,0.8)_285deg,rgba(255,255,255,0.18)_310deg,transparent_345deg)]
                opacity-50
                transition-opacity
                duration-300
                group-hover/quick:opacity-100
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                inset-px
                rounded-[15px]
                bg-[linear-gradient(120deg,#020806_0%,#06140d_28%,#0a2418_57%,#0d3926_100%)]
              "
            />

            {/* MOVING SPARK */}

            <motion.span
              initial={{
                x: "-130%",
              }}
              whileHover={{
                x: "150%",
              }}
              transition={{
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="
                pointer-events-none
                absolute
                -inset-y-5
                left-0
                z-20
                w-5
                rotate-[20deg]
                bg-gradient-to-r
                from-transparent
                via-white/45
                to-transparent
                blur-sm
              "
            />

            <span
              className="
                relative
                z-30
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-white/10
                bg-white/[0.08]
                text-white
                shadow-[0_7px_18px_rgba(0,0,0,0.18)]
              "
            >
              <Plus
                size={18}
                strokeWidth={2.5}
              />
            </span>

            <span
              className="
                relative
                z-30
                flex-1
                text-xs
                font-black
                tracking-tight
              "
            >
              Create New Lot
            </span>

            <ChevronRight
              size={15}
              className="
                relative
                z-30
                transition-transform
                duration-300
                group-hover/quick:translate-x-1
              "
            />
          </motion.button>
        </div>
      )}

      {/* ======================================================
          NAVIGATION
          ONLY THIS AREA SCROLLS
      ====================================================== */}

      <div
        className="
          min-h-0
          flex-1
          overflow-y-auto
          overflow-x-hidden
          overscroll-contain
          px-3
          py-5
          [scrollbar-width:thin]
          [scrollbar-color:var(--border)_transparent]
        "
      >
        <SectionTitle>
          {t("navigation.main")}
        </SectionTitle>

        <div className="space-y-1">
          {renderItems(
            mainItems,
            0
          )}
        </div>

        <div className="mt-7">
          <SectionTitle>
            {t("navigation.activity")}
          </SectionTitle>

          <div className="space-y-1">
            {renderItems(
              activityItems,
              1
            )}
          </div>
        </div>

        <div className="mt-7">
          <SectionTitle>
            {t("navigation.account")}
          </SectionTitle>

          <div className="space-y-1">
            {renderItems(
              accountItems,
              2
            )}
          </div>
        </div>
      </div>

      {/* ======================================================
          USER AREA
          Fixed
      ====================================================== */}

      <div
        className="
          shrink-0
          border-t
          border-[var(--border)]
          p-3
        "
      >
        {!collapsed ? (
          <motion.div
            initial={{
              opacity: 0,
              y: 6,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="
              relative
              mb-2
              overflow-hidden
              rounded-2xl
              border
              border-[var(--border)]
              bg-[var(--surface)]
              p-3
              shadow-[0_7px_22px_rgba(18,63,45,0.055)]
            "
          >
            {/* SPARK BORDER */}

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                rounded-2xl
                opacity-60
              "
            >
              <div
                className="
                  absolute
                  inset-0
                  rounded-2xl
                  bg-[conic-gradient(from_180deg_at_50%_50%,transparent_0deg,transparent_255deg,rgba(255,255,255,0.8)_285deg,transparent_330deg)]
                "
              />

              <div
                className="
                  absolute
                  inset-px
                  rounded-[15px]
                  bg-[var(--surface)]
                "
              />
            </div>

            <div
              className="
                relative
                z-10
                flex
                items-center
                gap-3
              "
            >
              <div
                className="
                  relative
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
                  text-sm
                  font-black
                  text-[var(--primary)]
                  shadow-[0_6px_16px_rgba(18,63,45,0.06)]
                "
              >
                {user?.firstName
                  ?.charAt(0)
                  ?.toUpperCase() ||
                  "U"}

                <span
                  className="
                    absolute
                    bottom-0
                    right-0
                    h-2.5
                    w-2.5
                    rounded-full
                    border-2
                    border-[var(--surface)]
                    bg-emerald-400
                  "
                />
              </div>

              <div className="min-w-0">
                <p
                  className="
                    truncate
                    text-sm
                    font-bold
                    text-[var(--foreground)]
                  "
                >
                  {user?.firstName ||
                    "Collector"}
                </p>

                <p
                  className="
                    truncate
                    text-[10px]
                    font-medium
                    text-[var(--muted)]
                  "
                >
                  {user?.email ||
                    "Collector account"}
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            whileHover={{
              scale: 1.04,
              y: -1,
            }}
            className="
              mb-2
              flex
              justify-center
            "
          >
            <div
              title={
                user?.firstName ||
                "Collector"
              }
              className="
                relative
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                border
                border-[var(--border)]
                bg-[var(--surface)]
                text-sm
                font-black
                text-[var(--primary)]
                shadow-[0_6px_16px_rgba(18,63,45,0.07)]
              "
            >
              {user?.firstName
                ?.charAt(0)
                ?.toUpperCase() ||
                "U"}

              <span
                className="
                  absolute
                  bottom-0
                  right-0
                  h-2.5
                  w-2.5
                  rounded-full
                  border-2
                  border-[var(--surface)]
                  bg-emerald-400
                "
              />
            </div>
          </motion.div>
        )}

        {/* LOGOUT */}

        <motion.button
          type="button"
          whileHover={{
            x: collapsed ? 0 : 2,
          }}
          whileTap={{
            scale: 0.985,
          }}
          onClick={handleLogout}
          title={
            collapsed
              ? t("common.logout")
              : undefined
          }
          className={`
            group/logout
            relative
            flex
            w-full
            items-center
            gap-3
            overflow-hidden
            rounded-2xl
            border
            border-transparent
            px-3
            py-2.5
            text-sm
            font-semibold
            text-[var(--muted)]
            transition-all
            duration-300

            hover:border-[var(--border)]
            hover:bg-[var(--surface)]
            hover:text-[var(--danger)]
            hover:shadow-[0_7px_20px_rgba(18,63,45,0.055)]

            ${
              collapsed
                ? "justify-center"
                : ""
            }
          `}
        >
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
              z-20
              w-5
              rotate-[20deg]
              bg-gradient-to-r
              from-transparent
              via-white/40
              to-transparent
              blur-sm
            "
          />

          <span
            className="
              relative
              z-30
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
              transition-all
              duration-300
              group-hover/logout:shadow-[0_6px_16px_rgba(18,63,45,0.06)]
            "
          >
            <LogOut size={18} />
          </span>

          {!collapsed && (
            <span className="relative z-30">
              {t("common.logout")}
            </span>
          )}
        </motion.button>

        {/* EXPAND */}

        {collapsed && (
          <motion.button
            type="button"
            whileHover={{
              scale: 1.04,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={() =>
              setCollapsed(false)
            }
            title="Expand sidebar"
            className="
              mt-1
              flex
              w-full
              items-center
              justify-center
              rounded-2xl
              border
              border-transparent
              py-2.5
              text-[var(--muted)]
              transition-all
              duration-300
              hover:border-[var(--border)]
              hover:bg-[var(--surface)]
              hover:text-[var(--foreground)]
              hover:shadow-[0_6px_16px_rgba(18,63,45,0.06)]
            "
          >
            <ChevronLeft
              className="rotate-180"
              size={18}
            />
          </motion.button>
        )}
      </div>
    </motion.aside>
  );
};

export default Sidebar;