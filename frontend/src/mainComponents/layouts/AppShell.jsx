import {
  LayoutDashboard,
  Package,
  IndianRupee,
  Gift,
  Recycle,
  Wallet,
  ShieldCheck,
  UserRound,
  Settings,
  LogOut,
  X,
  Plus,
  MapPin,
  ChevronRight,
} from "lucide-react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import { useState } from "react";

import {
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

import Sidebar from "./Sidebar";
import MobileHeader from "./MobileHeader";
import BottomNavigation from "./BottomNavigation";
import PageContainer from "./PageContainer";

import logo from "../../assets/images/logo.webp";

import useAuthStore from "../../store/authStore";
import useRegionStore from "../../store/regionStore";
import useTranslation from "../../i18n/useTranslation";

import {
  logoutFirebase,
} from "../../services/auth/googleAuth";

const AppShell = ({
  children,
}) => {
  const [
    sidebarCollapsed,
    setSidebarCollapsed,
  ] = useState(false);

  const [
    mobileMenuOpen,
    setMobileMenuOpen,
  ] = useState(false);

  return (
    <div
      className="
        flex
        h-screen
        min-h-0
        overflow-hidden
        bg-[var(--background)]
        text-[var(--foreground)]
      "
    >
      {/* ======================================================
          DESKTOP SIDEBAR
      ====================================================== */}

      <Sidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      {/* ======================================================
          MAIN APPLICATION AREA
      ====================================================== */}

      <main
        className="
          flex
          min-w-0
          min-h-0
          flex-1
          flex-col
          overflow-hidden
          bg-[var(--background)]
        "
      >
        {/* MOBILE HEADER */}

        <MobileHeader
          onMenuClick={() =>
            setMobileMenuOpen(true)
          }
        />

        {/* MAIN PAGE SCROLL */}

        <div
          className="
            min-h-0
            flex-1
            overflow-x-hidden
            overflow-y-auto
            overscroll-contain
            [scrollbar-width:thin]
            [scrollbar-color:var(--border)_transparent]
          "
        >
          <PageContainer>
            <Outlet />
          </PageContainer>
        </div>
      </main>

      {/* ======================================================
          MOBILE BOTTOM NAV
      ====================================================== */}

      <BottomNavigation
        onMoreClick={() =>
          setMobileMenuOpen(true)
        }
      />

      {/* ======================================================
          MOBILE MENU
      ====================================================== */}

      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu
            onClose={() =>
              setMobileMenuOpen(false)
            }
          />
        )}
      </AnimatePresence>
    </div>
  );
};

/* ============================================================
   MOBILE MENU
============================================================ */

const MobileMenu = ({
  onClose,
}) => {
  const navigate =
    useNavigate();

  const location =
    useLocation();

  const {
    user,
    clearUser,
  } = useAuthStore();

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

  /* ==========================================================
     LOCATION
  ========================================================== */

  const locationLabel =
    city && state
      ? `${city}, ${state}`
      : state ||
        city ||
        "Location unavailable";

  /* ==========================================================
     USER
  ========================================================== */

  const firstName =
    user?.firstName ||
    "Collector";

  const initials =
    `${user?.firstName?.charAt(0) || ""}${user?.lastName?.charAt(0) || ""}`
      .trim()
      .toUpperCase() || "U";

  /* ==========================================================
     NAVIGATION
  ========================================================== */

  const goTo = (path) => {
    navigate(path);
    onClose();
  };

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

  const handleLogout =
    async () => {
      try {
        await logoutFirebase();

        clearUser();

        onClose();

        navigate("/");
      } catch (error) {
        console.error(
          "Logout failed:",
          error
        );
      }
    };

  /* ==========================================================
     NAV ITEMS
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
     RENDER NAV ITEMS
  ========================================================== */

  const renderItems = (
    items
  ) =>
    items.map(
      (
        item,
        index
      ) => {
        const Icon =
          item.icon;

        const active =
          isActive(item.path);

        return (
          <motion.button
            key={item.path}
            type="button"
            initial={{
              opacity: 0,
              x: 18,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.25,
              delay:
                index * 0.045,
              ease: "easeOut",
            }}
            whileHover={{
              x: 2,
            }}
            whileTap={{
              scale: 0.985,
            }}
            onClick={() =>
              goTo(item.path)
            }
            className={`
              group/item
              relative
              flex
              w-full
              items-center
              gap-3
              overflow-hidden
              rounded-2xl
              border
              px-3
              py-3
              text-left
              transition-all
              duration-300

              ${
                active
                  ? `
                    border-[var(--border)]
                    bg-[var(--surface)]
                    text-[var(--primary)]
                    shadow-[0_10px_25px_rgba(18,63,45,0.08)]
                  `
                  : `
                    border-transparent
                    bg-transparent
                    text-[var(--foreground)]
                    hover:border-[var(--border)]
                    hover:bg-[var(--surface)]
                    hover:shadow-[0_8px_22px_rgba(18,63,45,0.055)]
                  `
              }
            `}
          >
            {/* ACTIVE INDICATOR */}

            {active && (
              <motion.span
                layoutId="mobile-menu-active"
                className="
                  absolute
                  left-0
                  top-1/2
                  h-8
                  w-1
                  -translate-y-1/2
                  rounded-r-full
                  bg-[var(--primary)]
                  shadow-[0_0_12px_rgba(24,121,78,0.18)]
                "
                transition={{
                  type: "spring",
                  stiffness: 380,
                  damping: 30,
                }}
              />
            )}

            {/* ICON */}

            <span
              className={`
                relative
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-[14px]
                border
                transition-all
                duration-300

                ${
                  active
                    ? `
                      border-[var(--border)]
                      bg-[var(--surface)]
                      text-[var(--primary)]
                      shadow-[0_7px_18px_rgba(18,63,45,0.07)]
                    `
                    : `
                      border-[var(--border)]
                      bg-[var(--surface-soft)]
                      text-[var(--muted)]
                      group-hover/item:scale-105
                      group-hover/item:bg-[var(--surface)]
                      group-hover/item:text-[var(--foreground)]
                      group-hover/item:shadow-[0_7px_18px_rgba(18,63,45,0.06)]
                    `
                }
              `}
            >
              <Icon
                size={19}
                strokeWidth={
                  active ? 2.35 : 2
                }
              />
            </span>

            {/* LABEL */}

            <span
              className="
                min-w-0
                flex-1
                truncate
                text-[13px]
                font-bold
              "
            >
              {item.label}
            </span>

            {/* ARROW */}

            <ChevronRight
              size={16}
              strokeWidth={2}
              className={`
                shrink-0
                transition-all
                duration-300
                ${
                  active
                    ? "text-[var(--primary)] opacity-100"
                    : "text-[var(--muted)] opacity-35 group-hover/item:translate-x-0.5 group-hover/item:opacity-70"
                }
              `}
            />
          </motion.button>
        );
      }
    );

  return (
    <div
      className="
        fixed
        inset-0
        z-[70]
        lg:hidden
      "
    >
      {/* ======================================================
          BACKDROP
      ====================================================== */}

      <motion.button
        type="button"
        aria-label="Close menu"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        transition={{
          duration: 0.25,
        }}
        onClick={onClose}
        className="
          absolute
          inset-0
          bg-black/50
          backdrop-blur-[2px]
        "
      />

      {/* ======================================================
          DRAWER
      ====================================================== */}

      <motion.aside
        initial={{
          x: "100%",
        }}
        animate={{
          x: 0,
        }}
        exit={{
          x: "100%",
        }}
        transition={{
          type: "spring",
          stiffness: 340,
          damping: 32,
          mass: 0.85,
        }}
        className="
          absolute
          right-0
          top-0
          flex
          h-full
          w-[92%]
          max-w-[420px]
          flex-col
          overflow-hidden
          rounded-l-[30px]
          border-l
          border-[var(--border)]
          bg-[var(--surface)]
          shadow-[-20px_0_70px_rgba(0,0,0,0.16)]
        "
      >
        {/* ====================================================
            HERO HEADER
        ==================================================== */}

        <div
          className="
            relative
            shrink-0
            overflow-hidden
            px-4
            pb-4
            pt-5
          "
        >
          {/* DARK HERO BACKGROUND */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-[linear-gradient(145deg,#04110b_0%,#092619_42%,#115337_100%)]
            "
          />

          {/* SOFT GREEN LIGHT */}

          <div
            className="
              pointer-events-none
              absolute
              -right-16
              -top-20
              h-44
              w-44
              rounded-full
              bg-emerald-300/10
              blur-[60px]
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-20
              left-1/3
              h-32
              w-32
              rounded-full
              bg-teal-300/[0.09]
              blur-[50px]
            "
          />

          {/* HEADER CONTENT */}

          <div
            className="
              relative
              z-10
              flex
              items-start
              justify-between
              gap-3
            "
          >
            {/* USER / BRAND */}

            <div
              className="
                flex
                min-w-0
                items-center
                gap-3
              "
            >
              {/* LOGO */}

              <div
                className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-[16px]
                  border
                  border-white/15
                  bg-white/[0.08]
                  p-1.5
                  shadow-[0_10px_25px_rgba(0,0,0,0.16)]
                  backdrop-blur-md
                "
              >
                <img
                  src={logo}
                  alt="Kabadiwala Connect"
                  className="
                    h-full
                    w-full
                    object-contain
                  "
                />
              </div>

              <div className="min-w-0">
                <p
                  className="
                    truncate
                    text-lg
                    font-black
                    tracking-tight
                    text-white
                  "
                >
                  Kabadiwala
                </p>

                <p
                  className="
                    text-[9px]
                    font-black
                    uppercase
                    tracking-[0.22em]
                    text-white/55
                  "
                >
                  Connect
                </p>
              </div>
            </div>

            {/* CLOSE */}

            <motion.button
              type="button"
              whileTap={{
                scale: 0.9,
              }}
              onClick={onClose}
              aria-label="Close menu"
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-white/10
                bg-white/[0.08]
                text-white/75
                backdrop-blur-md
                transition-all
                duration-200
                hover:bg-white/[0.14]
                hover:text-white
              "
            >
              <X size={19} />
            </motion.button>
          </div>

          {/* USER MESSAGE */}

          <div
            className="
              relative
              z-10
              mt-5
            "
          >
            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.16em]
                text-white/45
              "
            >
              Welcome back
            </p>

            <div
              className="
                mt-1
                flex
                items-center
                gap-2
              "
            >
              <h2
                className="
                  truncate
                  text-[22px]
                  font-black
                  tracking-tight
                  text-white
                "
              >
                {firstName}
              </h2>

              <span
                className="
                  flex
                  h-5
                  w-5
                  items-center
                  justify-center
                  rounded-full
                  bg-emerald-400
                  text-[8px]
                  font-black
                  text-[#062015]
                  shadow-[0_0_12px_rgba(52,211,153,0.3)]
                "
              >
                ✓
              </span>
            </div>
          </div>

          {/* LOCATION PILL */}

          <div
            className="
              relative
              z-10
              mt-4
              inline-flex
              max-w-full
              items-center
              gap-2
              rounded-full
              border
              border-white/10
              bg-white/[0.07]
              px-3
              py-2
              text-white/70
              backdrop-blur-md
            "
          >
            <MapPin
              size={12}
              className="shrink-0 text-emerald-300"
            />

            <span
              className="
                truncate
                text-[10px]
                font-bold
              "
            >
              {locationLabel}
            </span>

            <span
              className="
                ml-1
                h-1.5
                w-1.5
                shrink-0
                rounded-full
                bg-emerald-300
              "
            />
          </div>
        </div>

        {/* ====================================================
            QUICK ACTION
        ==================================================== */}

        <div
          className="
            shrink-0
            px-4
            pt-4
          "
        >
          <motion.button
            type="button"
            whileHover={{
              y: -2,
            }}
            whileTap={{
              scale: 0.985,
            }}
            onClick={() =>
              goTo(
                "/collector/lots/create"
              )
            }
            className="
              group/create
              relative
              flex
              w-full
              items-center
              gap-3
              overflow-hidden
              rounded-[22px]
              border
              border-white/10
              bg-[linear-gradient(125deg,#03100a_0%,#082418_38%,#0c3a26_70%,#12553a_100%)]
              p-3.5
              text-left
              text-white
              shadow-[0_14px_35px_rgba(3,18,12,0.22)]
              transition-all
              duration-300
              hover:shadow-[0_18px_42px_rgba(3,18,12,0.28)]
            "
          >
            {/* ACCENT LIGHT */}

            <div
              className="
                pointer-events-none
                absolute
                -right-10
                -top-10
                h-28
                w-28
                rounded-full
                bg-emerald-300/10
                blur-[35px]
              "
            />

            {/* ICON */}

            <div
              className="
                relative
                z-10
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-[15px]
                border
                border-white/10
                bg-white/[0.08]
                shadow-[0_8px_20px_rgba(0,0,0,0.16)]
              "
            >
              <Plus
                size={20}
                strokeWidth={2.5}
              />
            </div>

            {/* TEXT */}

            <div
              className="
                relative
                z-10
                min-w-0
                flex-1
              "
            >
              <p
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.16em]
                  text-white/45
                "
              >
                Quick action
              </p>

              <p
                className="
                  mt-0.5
                  text-sm
                  font-black
                  tracking-tight
                "
              >
                Create New Lot
              </p>

              <p
                className="
                  mt-0.5
                  truncate
                  text-[10px]
                  font-medium
                  text-white/55
                "
              >
                Photograph and value your e-waste
              </p>
            </div>

            {/* ARROW */}

            <div
              className="
                relative
                z-10
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-white/10
                bg-white/[0.06]
                transition-transform
                duration-300
                group-hover/create:translate-x-1
              "
            >
              <ChevronRight
                size={17}
                className="text-white/75"
              />
            </div>
          </motion.button>
        </div>

        {/* ====================================================
            NAVIGATION
        ==================================================== */}

        <div
          className="
            min-h-0
            flex-1
            overflow-y-auto
            overscroll-contain
            px-4
            py-5
            [scrollbar-width:thin]
            [scrollbar-color:var(--border)_transparent]
          "
        >
          <MenuSection
            title={t(
              "navigation.main"
            )}
            items={mainItems}
            renderItems={renderItems}
          />

          <MenuSection
            title={t(
              "navigation.activity"
            )}
            items={activityItems}
            renderItems={renderItems}
          />

          <MenuSection
            title={t(
              "navigation.account"
            )}
            items={accountItems}
            renderItems={renderItems}
          />
        </div>

        {/* ====================================================
            FOOTER
        ==================================================== */}

        <div
          className="
            shrink-0
            border-t
            border-[var(--border)]
            bg-[var(--surface)]
            px-4
            pb-4
            pt-3
          "
        >
          {/* USER CARD */}

          <div
            className="
              mb-2.5
              flex
              items-center
              gap-3
              rounded-2xl
              border
              border-[var(--border)]
              bg-[var(--surface-soft)]
              p-3
              shadow-[0_6px_18px_rgba(18,63,45,0.045)]
            "
          >
            {/* AVATAR */}

            <div
              className="
                relative
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-[14px]
                border
                border-[var(--border)]
                bg-[linear-gradient(145deg,#071a11_0%,#0b3021_50%,#18794e_100%)]
                text-sm
                font-black
                text-white
                shadow-[0_8px_20px_rgba(18,63,45,0.14)]
              "
            >
              {initials}

              <span
                className="
                  absolute
                  bottom-0.5
                  right-0.5
                  h-2.5
                  w-2.5
                  rounded-full
                  border-2
                  border-[var(--surface-soft)]
                  bg-emerald-300
                "
              />
            </div>

            <div className="min-w-0 flex-1">
              <p
                className="
                  truncate
                  text-sm
                  font-black
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

            {/* PROFILE ARROW */}

            <button
              type="button"
              onClick={() =>
                goTo(
                  "/collector/settings"
                )
              }
              className="
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-lg
                border
                border-[var(--border)]
                bg-[var(--surface)]
                text-[var(--muted)]
                transition-all
                duration-200
                hover:text-[var(--foreground)]
              "
            >
              <ChevronRight
                size={14}
              />
            </button>
          </div>

          {/* LOGOUT */}

          <motion.button
            type="button"
            whileTap={{
              scale: 0.98,
            }}
            onClick={handleLogout}
            className="
              group/logout
              flex
              w-full
              items-center
              gap-3
              rounded-2xl
              border
              border-transparent
              px-2
              py-2
              text-left
              text-sm
              font-bold
              text-[var(--muted)]
              transition-all
              duration-200
              hover:border-[var(--border)]
              hover:bg-[var(--surface)]
              hover:text-[var(--danger)]
            "
          >
            <span
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                border
                border-[var(--border)]
                bg-[var(--surface-soft)]
                transition-colors
                group-hover/logout:text-[var(--danger)]
              "
            >
              <LogOut
                size={18}
              />
            </span>

            <span>
              {t("common.logout")}
            </span>
          </motion.button>
        </div>
      </motion.aside>
    </div>
  );
};

/* ============================================================
   MENU SECTION
============================================================ */

const MenuSection = ({
  title,
  items,
  renderItems,
}) => {
  return (
    <section className="mb-7">
      <div
        className="
          mb-2.5
          flex
          items-center
          gap-3
          px-1
        "
      >
        <p
          className="
            shrink-0
            text-[9px]
            font-black
            uppercase
            tracking-[0.18em]
            text-[var(--muted-foreground)]
          "
        >
          {title}
        </p>

        <div
          className="
            h-px
            flex-1
            bg-[var(--border)]
          "
        />
      </div>

      <div className="space-y-1.5">
        {renderItems(items)}
      </div>
    </section>
  );
};

export default AppShell;