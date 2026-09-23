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

import {
  useState,
} from "react";

import {
  Outlet,
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
    <div className="
      min-h-screen
      bg-[var(--background)]
      text-[var(--foreground)]
    ">
      <div className="
        flex
        min-h-screen
      ">
        <Sidebar
          collapsed={
            sidebarCollapsed
          }
          setCollapsed={
            setSidebarCollapsed
          }
        />

        <div className="
          min-w-0
          flex-1
        ">
          <MobileHeader
            onMenuClick={() =>
              setMobileMenuOpen(
                true
              )
            }
          />

          <PageContainer>
            <Outlet />
          </PageContainer>
        </div>
      </div>

      <BottomNavigation
        onMoreClick={() =>
          setMobileMenuOpen(
            true
          )
        }
      />

      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu
            onClose={() =>
              setMobileMenuOpen(
                false
              )
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

  const { user, clearUser } =
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

  const goTo = (
    path
  ) => {
    navigate(path);
    onClose();
  };

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
              duration: 0.24,
              delay:
                index * 0.035,
            }}
            whileTap={{
              scale: 0.98,
            }}
            onClick={() =>
              goTo(item.path)
            }
            className="
              group
              flex
              w-full
              items-center
              gap-3
              rounded-2xl
              px-3
              py-2.5
              text-left
              transition-all
              duration-200
              hover:bg-[var(--surface-soft)]
            "
          >
            <span
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-[var(--surface-soft)]
                text-[var(--muted)]
                transition-all
                duration-200
                group-hover:bg-indigo-500/10
                group-hover:text-indigo-500
              "
            >
              <Icon
                size={18}
                strokeWidth={2}
              />
            </span>

            <span className="
              min-w-0
              flex-1
              truncate
              text-sm
              font-semibold
              text-[var(--foreground)]
            ">
              {item.label}
            </span>

            <ChevronRight
              size={16}
              className="
                shrink-0
                text-[var(--muted)]
                opacity-50
              "
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
          duration: 0.22,
        }}
        onClick={onClose}
        className="
          absolute
          inset-0
          bg-black/45
          backdrop-blur-sm
        "
      />

      {/* ======================================================
          SHEET
      ====================================================== */}

      <motion.div
        initial={{
          x: "100%",
          opacity: 0.7,
        }}
        animate={{
          x: 0,
          opacity: 1,
        }}
        exit={{
          x: "100%",
          opacity: 0.7,
        }}
        transition={{
          type: "spring",
          stiffness: 330,
          damping: 32,
        }}
        className="
          absolute
          right-0
          top-0
          flex
          h-full
          w-[88%]
          max-w-[390px]
          flex-col
          overflow-hidden
          border-l
          border-[var(--border)]
          bg-[var(--surface)]/96
          shadow-2xl
          backdrop-blur-2xl
        "
      >
        {/* ====================================================
            HEADER
        ==================================================== */}

        <div className="
          relative
          shrink-0
          border-b
          border-[var(--border)]
          px-4
          pb-4
          pt-5
        ">
          <div className="
            absolute
            inset-x-8
            top-0
            h-px
            bg-gradient-to-r
            from-transparent
            via-indigo-500/60
            to-transparent
          " />

          <div className="
            flex
            items-center
            justify-between
          ">
            <div className="
              flex
              items-center
              gap-3
            ">
              <div className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-2xl
                bg-[var(--surface-soft)]
                p-1.5
                ring-1
                ring-[var(--border)]
              ">
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

              <div>
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
                  tracking-[0.2em]
                  text-[var(--muted)]
                ">
                  Connect
                </p>
              </div>
            </div>

            <motion.button
              type="button"
              whileTap={{
                scale: 0.9,
              }}
              onClick={onClose}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-[var(--surface-soft)]
                text-[var(--muted)]
                transition
                hover:text-[var(--foreground)]
              "
            >
              <X size={19} />
            </motion.button>
          </div>

          {/* LOCATION */}

          <div className="
            mt-4
            flex
            items-center
            gap-1.5
            text-[11px]
            font-medium
            text-[var(--muted)]
          ">
            <MapPin
              size={12}
              className="text-indigo-400"
            />

            <span className="truncate">
              {city && state
                ? `${city}, ${state}`
                : state ||
                  city ||
                  "Location unavailable"}
            </span>
          </div>

          {/* ==================================================
              QUICK CREATE
          ================================================== */}

          <motion.button
            type="button"
            whileTap={{
              scale: 0.98,
            }}
            onClick={() =>
              goTo(
                "/collector/lots/create"
              )
            }
            className="
              mt-4
              flex
              w-full
              items-center
              gap-3
              rounded-2xl
              bg-gradient-to-r
              from-indigo-500
              via-violet-500
              to-purple-500
              p-3
              text-left
              text-white
              shadow-lg
              shadow-indigo-500/20
            "
          >
            <span className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-white/15
            ">
              <Plus
                size={19}
                strokeWidth={2.5}
              />
            </span>

            <span className="
              flex-1
            ">
              <span className="
                block
                text-[9px]
                font-bold
                uppercase
                tracking-[0.14em]
                text-white/65
              ">
                Quick action
              </span>

              <span className="
                mt-0.5
                block
                text-sm
                font-black
              ">
                Create New Lot
              </span>
            </span>

            <ChevronRight
              size={17}
              className="text-white/70"
            />
          </motion.button>
        </div>

        {/* ====================================================
            MENU CONTENT
        ==================================================== */}

        <div className="
          flex-1
          overflow-y-auto
          px-3
          py-5
        ">
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
            ACCOUNT FOOTER
        ==================================================== */}

        <div className="
          shrink-0
          border-t
          border-[var(--border)]
          p-3
        ">
          <div className="
            mb-2
            flex
            items-center
            gap-3
            rounded-2xl
            bg-[var(--surface-soft)]
            p-3
          ">
            <div className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-gradient-to-br
              from-indigo-500
              to-violet-500
              text-sm
              font-black
              text-white
            ">
              {user?.firstName
                ?.charAt(0)
                ?.toUpperCase() ||
                "U"}
            </div>

            <div className="
              min-w-0
              flex-1
            ">
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

          <motion.button
            type="button"
            whileTap={{
              scale: 0.98,
            }}
            onClick={handleLogout}
            className="
              flex
              w-full
              items-center
              gap-3
              rounded-2xl
              px-3
              py-2.5
              text-left
              text-sm
              font-semibold
              text-[var(--muted)]
              transition
              hover:bg-rose-500/10
              hover:text-rose-500
            "
          >
            <span className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-[var(--surface-soft)]
            ">
              <LogOut
                size={18}
              />
            </span>

            {t(
              "common.logout"
            )}
          </motion.button>
        </div>
      </motion.div>
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
    <section className="
      mb-6
    ">
      <p className="
        mb-2
        px-3
        text-[9px]
        font-black
        uppercase
        tracking-[0.18em]
        text-[var(--muted)]
      ">
        {title}
      </p>

      <div className="space-y-1">
        {renderItems(items)}
      </div>
    </section>
  );
};

export default AppShell;