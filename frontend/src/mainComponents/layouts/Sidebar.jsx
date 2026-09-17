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
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.webp";
import useAuthStore from "../../store/authStore";
import { logoutFirebase } from "../../services/auth/googleAuth";
import useTranslation from "../../i18n/useTranslation";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, clearUser } = useAuthStore();
  const { t } = useTranslation();

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

  const isActive = (path) => {
    if (path === "/collector") {
      return location.pathname === "/collector";
    }

    return location.pathname.startsWith(path);
  };

  const handleLogout = async () => {
    try {
      await logoutFirebase();
      clearUser();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const renderItems = (items) =>
    items.map((item) => {
      const Icon = item.icon;
      const active = isActive(item.path);

      return (
        <button
          key={item.path}
          onClick={() => navigate(item.path)}
          className={`
            group flex w-full items-center gap-3 rounded-xl
            px-3 py-3 text-left transition-all duration-200
            ${
              active
                ? "bg-[var(--accent)] text-[var(--primary)]"
                : "text-[var(--muted)] hover:bg-[var(--surface-soft)] hover:text-[var(--foreground)]"
            }
            ${collapsed ? "justify-center" : ""}
          `}
        >
          <Icon
            size={19}
            strokeWidth={active ? 2.3 : 1.9}
            className="shrink-0"
          />

          {!collapsed && (
            <span className="truncate text-sm font-medium">
              {item.label}
            </span>
          )}
        </button>
      );
    });

  return (
    <aside
      className={`
        hidden lg:flex
        h-screen shrink-0 flex-col
        border-r border-[var(--border)]
        bg-[var(--surface)]
        transition-[width] duration-300
        ${collapsed ? "w-[76px]" : "w-[240px]"}
      `}
    >
      {/* Logo */}
      <div
        className={`
          flex h-[76px] items-center
          border-b border-[var(--border)]
          px-4
          ${collapsed ? "justify-center" : "justify-between"}
        `}
      >
        {!collapsed && (
          <button
            onClick={() => navigate("/collector")}
            className="flex items-center gap-3"
          >
            <img 
           src={logo}
            alt="Logo" 
            className="flex h-13 w-13" />

            <div className="text-left">
              <p className="text-lg font-bold tracking-tight text-[var(--foreground)]">
                Kabadiwala
              </p>

              <p className="text-sm font-medium uppercase tracking-[0.16em] text-[var(--muted)]">
                Connect
              </p>
            </div>
          </button>
        )}

        {collapsed && (
          <button
            onClick={() => navigate("/collector")}
          >
          <img 
           src={logo}
            alt="Logo" 
            className="flex h-13 w-13" />
          </button>
        )}

        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--muted)] transition hover:bg-[var(--surface-soft)] hover:text-[var(--foreground)]"
          >
            <ChevronLeft size={18} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-5">
        <p
          className={`
            mb-2 px-3 text-[10px] font-semibold uppercase
            tracking-[0.16em] text-[var(--muted-foreground)]
            ${collapsed ? "hidden" : ""}
          `}
        >
          {t("navigation.main")}
        </p>

        <div className="space-y-1">
          {renderItems(mainItems)}
        </div>

        <p
          className={`
            mb-2 mt-7 px-3 text-[10px] font-semibold uppercase
            tracking-[0.16em] text-[var(--muted-foreground)]
            ${collapsed ? "hidden" : ""}
          `}
        >
          {t("navigation.activity")}
        </p>

        <div className="space-y-1">
          {renderItems(activityItems)}
        </div>

        <p
          className={`
            mb-2 mt-7 px-3 text-[10px] font-semibold uppercase
            tracking-[0.16em] text-[var(--muted-foreground)]
            ${collapsed ? "hidden" : ""}
          `}
        >
          {t("navigation.account")}
        </p>

        <div className="space-y-1">
          {renderItems(accountItems)}
        </div>
      </div>

      {/* User */}
      <div className="border-t border-[var(--border)] p-3">
        {!collapsed ? (
          <div className="mb-2 flex items-center gap-3 rounded-xl bg-[var(--surface-soft)] p-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-bold text-[var(--primary)]">
              {user?.firstName?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[var(--foreground)]">
                {user?.firstName || "Collector"}
              </p>

              <p className="truncate text-xs text-[var(--muted)]">
                {user?.email || "Collector account"}
              </p>
            </div>
          </div>
        ) : null}

        <button
          onClick={handleLogout}
          className={`
            flex w-full items-center gap-3 rounded-xl
            px-3 py-3 text-sm font-medium
            text-[var(--muted)]
            transition hover:bg-[var(--surface-soft)]
            hover:text-[var(--danger)]
            ${collapsed ? "justify-center" : ""}
          `}
        >
          <LogOut size={18} />

          {!collapsed && <span>{t("common.logout")}</span>}
        </button>

        {collapsed && (
          <button
            onClick={() => setCollapsed(false)}
            className="mt-1 flex w-full items-center justify-center rounded-xl py-3 text-[var(--muted)] transition hover:bg-[var(--surface-soft)]"
          >
            <ChevronLeft className="rotate-180" size={18} />
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;