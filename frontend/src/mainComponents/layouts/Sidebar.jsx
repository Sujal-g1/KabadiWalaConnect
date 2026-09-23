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
  Sparkles,
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
import { logoutFirebase } from "../../services/auth/googleAuth";

const Sidebar = ({
  collapsed,
  setCollapsed,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, clearUser } =
    useAuthStore();

  const { t } = useTranslation();

  /* ==========================================================
     NAVIGATION
  ========================================================== */

  const mainItems = [
    {
      label: t("navigation.dashboard"),
      icon: LayoutDashboard,
      path: "/collector",
    },
    {
      label: t("navigation.myLots"),
      icon: Package,
      path: "/collector/lots",
    },
    {
      label: t("navigation.prices"),
      icon: IndianRupee,
      path: "/collector/prices",
    },
    {
      label: t("navigation.rewards"),
      icon: Gift,
      path: "/collector/rewards",
    },
    {
      label: t("navigation.recyclers"),
      icon: Recycle,
      path: "/collector/recyclers",
    },
  ];

  const activityItems = [
    {
      label: t("navigation.earnings"),
      icon: Wallet,
      path: "/collector/earnings",
    },
    {
      label: t("navigation.transactions"),
      icon: ShieldCheck,
      path: "/collector/transactions",
    },
  ];

  const accountItems = [
    {
      label: t("navigation.profile"),
      icon: UserRound,
      path: "/collector/profile",
    },
    {
      label: t("navigation.settings"),
      icon: Settings,
      path: "/collector/settings",
    },
  ];

  /* ==========================================================
     ACTIVE STATE
  ========================================================== */

  const isActive = (path) => {
    if (path === "/collector") {
      return location.pathname === "/collector";
    }

    return location.pathname.startsWith(path);
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
     RENDER NAV ITEMS
  ========================================================== */

  const renderItems = (
    items,
    sectionIndex
  ) =>
    items.map((item, index) => {
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
            x: -10,
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
            x: collapsed ? 0 : 3,
          }}
          whileTap={{
            scale: 0.98,
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
            group relative flex w-full
            items-center gap-3
            overflow-hidden
            rounded-2xl
            px-3 py-2.5
            text-left
            transition-all duration-300
            ${
              collapsed
                ? "justify-center"
                : ""
            }
            ${
              active
                ? "text-[var(--primary)]"
                : "text-[var(--muted)] hover:text-[var(--foreground)]"
            }
          `}
        >
          {/* ==================================================
              ACTIVE BACKGROUND
          ================================================== */}

          {active && (
            <motion.div
              layoutId="collector-sidebar-active"
              className="
                absolute inset-0
                rounded-2xl
                bg-[var(--accent)]
              "
              transition={{
                type: "spring",
                stiffness: 380,
                damping: 30,
              }}
            />
          )}

          {/* ==================================================
              HOVER BACKGROUND
          ================================================== */}

          {!active && (
            <span
              className="
                absolute inset-0
                rounded-2xl
                bg-[var(--surface-soft)]
                opacity-0
                transition-opacity
                duration-300
                group-hover:opacity-100
              "
            />
          )}

          {/* ==================================================
              LEFT ACTIVE INDICATOR
          ================================================== */}

          {active && !collapsed && (
            <motion.span
              layoutId="collector-sidebar-indicator"
              className="
                absolute left-0
                top-1/2
                h-6 w-1
                -translate-y-1/2
                rounded-r-full
                bg-[var(--primary)]
              "
            />
          )}

          {/* ==================================================
              ICON
          ================================================== */}

          <span
            className={`
              relative z-10
              flex h-10 w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              transition-all duration-300
              ${
                active
                  ? "bg-white/40 shadow-sm"
                  : "bg-[var(--surface-soft)] group-hover:scale-105 group-hover:bg-[var(--accent)]"
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

          <AnimatePresence initial={false}>
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
                  relative z-10
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
              className="relative z-10"
            >
              <ChevronRight
                size={15}
                strokeWidth={2.4}
              />
            </motion.span>
          )}
        </motion.button>
      );
    });

  /* ==========================================================
     SECTION HEADER
  ========================================================== */

  const SectionTitle = ({
    children,
  }) => (
    <AnimatePresence initial={false}>
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
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        hidden
        h-screen
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
          TOP / BRAND
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
        {/* Subtle top glow */}

        <div
          className="
            pointer-events-none
            absolute
            left-0
            top-0
            h-px
            w-full
            bg-gradient-to-r
            from-transparent
            via-[var(--primary)]
            to-transparent
            opacity-30
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
              flex h-12 w-12
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-[var(--surface-soft)]
              p-1.5
              ring-1
              ring-[var(--border)]
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
                absolute inset-0
                rounded-2xl
                shadow-[0_0_24px_var(--glow)]
              "
            />
          </motion.div>

          <AnimatePresence initial={false}>
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
                <p className="
                  text-[15px]
                  font-black
                  tracking-tight
                  text-[var(--foreground)]
                ">
                  Kabadiwala
                </p>

                <p className="
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[0.24em]
                  text-[var(--muted)]
                ">
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
            }}
            whileTap={{
              scale: 0.94,
            }}
            onClick={() =>
              setCollapsed(true)
            }
            className="
              flex h-8 w-8
              items-center
              justify-center
              rounded-xl
              text-[var(--muted)]
              transition
              hover:bg-[var(--surface-soft)]
              hover:text-[var(--foreground)]
            "
            title="Collapse sidebar"
          >
            <ChevronLeft size={17} />
          </motion.button>
        )}
      </div>

      {/* ======================================================
          QUICK ACTION
      ====================================================== */}

      {!collapsed && (
        <div className="px-3 pt-4">
          <motion.button
            type="button"
            whileHover={{
              y: -1,
            }}
            whileTap={{
              scale: 0.98,
            }}
            onClick={() =>
              navigate(
                "/collector/lots/create"
              )
            }
            className="
              group relative
              flex w-full
              items-center
              gap-3
              overflow-hidden
              rounded-2xl
              bg-[var(--primary)]
              px-3
              py-3
              text-left
              shadow-lg
              shadow-[var(--glow)]
            "
          >
            <span
              className="
                absolute inset-0
                bg-white/10
                opacity-0
                transition
                group-hover:opacity-100
              "
            />

            <span className="
              relative z-10
              flex h-9 w-9
              items-center
              justify-center
              rounded-xl
              bg-white/15
            ">
              <Plus
                size={18}
                strokeWidth={2.5}
              />
            </span>

            <span className="
              relative z-10
              flex-1
              text-xs
              font-black
              tracking-tight
            ">
              Create New Lot
            </span>

            <ChevronRight
              size={15}
              className="
                relative z-10
                transition-transform
                group-hover:translate-x-0.5
              "
            />
          </motion.button>
        </div>
      )}

      {/* ======================================================
          NAVIGATION
      ====================================================== */}

      <div className="
        flex-1
        overflow-y-auto
        px-3
        py-5
        scrollbar-thin
      ">
        <SectionTitle>
          {t("navigation.main")}
        </SectionTitle>

        <div className="space-y-1">
          {renderItems(
            mainItems,
            0
          )}
        </div>

        <SectionTitle>
          {t("navigation.activity")}
        </SectionTitle>

        <div className="mt-7 space-y-1">
          {renderItems(
            activityItems,
            1
          )}
        </div>

        <SectionTitle>
          {t("navigation.account")}
        </SectionTitle>

        <div className="mt-7 space-y-1">
          {renderItems(
            accountItems,
            2
          )}
        </div>
      </div>

      {/* ======================================================
          USER AREA
      ====================================================== */}

      <div className="
        shrink-0
        border-t
        border-[var(--border)]
        p-3
      ">
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
              bg-[var(--surface-soft)]
              p-3
              ring-1
              ring-[var(--border)]
            "
          >
            {/* subtle glow */}

            <div className="
              pointer-events-none
              absolute
              -right-8
              -top-8
              h-20
              w-20
              rounded-full
              bg-[var(--primary)]/10
              blur-2xl
            " />

            <div className="
              relative
              flex
              items-center
              gap-3
            ">
              {/* AVATAR */}

              <div className="
                relative
                flex h-10 w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-[var(--accent)]
                text-sm
                font-black
                text-[var(--primary)]
              ">
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
                    bg-emerald-400
                    ring-2
                    ring-[var(--surface-soft)]
                  "
                />
              </div>

              {/* USER */}

              <div className="min-w-0">
                <p className="
                  truncate
                  text-sm
                  font-bold
                  text-[var(--foreground)]
                ">
                  {user?.firstName ||
                    "Collector"}
                </p>

                <p className="
                  truncate
                  text-[10px]
                  text-[var(--muted)]
                ">
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
                flex h-10 w-10
                items-center
                justify-center
                rounded-xl
                bg-[var(--accent)]
                text-sm
                font-black
                text-[var(--primary)]
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
                  bg-emerald-400
                  ring-2
                  ring-[var(--surface)]
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
            scale: 0.98,
          }}
          onClick={handleLogout}
          title={
            collapsed
              ? t("common.logout")
              : undefined
          }
          className={`
            group
            flex w-full
            items-center
            gap-3
            rounded-2xl
            px-3 py-2.5
            text-sm
            font-semibold
            text-[var(--muted)]
            transition-all duration-300
            hover:bg-[var(--danger)]/10
            hover:text-[var(--danger)]
            ${
              collapsed
                ? "justify-center"
                : ""
            }
          `}
        >
          <span className="
            flex h-10 w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-[var(--surface-soft)]
            transition
            group-hover:bg-[var(--danger)]/10
          ">
            <LogOut size={18} />
          </span>

          {!collapsed && (
            <span>
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
              flex w-full
              items-center
              justify-center
              rounded-2xl
              py-2.5
              text-[var(--muted)]
              transition
              hover:bg-[var(--surface-soft)]
              hover:text-[var(--foreground)]
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