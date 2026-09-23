import {
  BarChart3,
  Boxes,
  ChevronRight,
  CircleDollarSign,
  FileCheck2,
  Home,
  LogOut,
  PackageSearch,
  Settings,
  Truck,
  UserRound,
  Wallet,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

import useAuthStore from "../../store/authStore";

const sections = [
  {
    title: "Overview",
    items: [
      {
        label: "Dashboard",
        icon: Home,
        path: "/recycler",
      },
    ],
  },

  {
    title: "Procurement",
    items: [
      {
        label: "Marketplace",
        icon: PackageSearch,
        path: "/recycler/marketplace",
      },
      {
        label: "My Offers",
        icon: FileCheck2,
        path: "/recycler/offers",
      },
    ],
  },

  {
    title: "Operations",
    items: [
      {
        label: "Pickups",
        icon: Truck,
        path: "/recycler/pickups",
      },
      {
        label: "Handovers",
        icon: FileCheck2,
        path: "/recycler/handovers",
      },
      {
        label: "Intake",
        icon: Boxes,
        path: "/recycler/intake",
      },
    ],
  },

  {
    title: "Finance",
    items: [
      {
        label: "Payments",
        icon: Wallet,
        path: "/recycler/payments",
      },
      {
        label: "Buying Rates",
        icon: CircleDollarSign,
        path: "/recycler/rates",
      },
    ],
  },

  {
    title: "Insights",
    items: [
      {
        label: "Inventory",
        icon: Boxes,
        path: "/recycler/inventory",
      },
      {
        label: "Analytics",
        icon: BarChart3,
        path: "/recycler/analytics",
      },
      {
        label: "Traceability",
        icon: FileCheck2,
        path: "/recycler/traceability",
      },
    ],
  },
];

const RecyclerSidebar = () => {
  const navigate = useNavigate();
  const clearUser = useAuthStore(
    (state) => state.clearUser
  );

  const handleLogout = () => {
    clearUser();
    navigate("/");
  };

  return (
    <aside
      className="
        hidden
        lg:flex
        fixed
        inset-y-0
        left-0
        z-40
        w-[260px]
        flex-col
        border-r
        border-[var(--border)]
        bg-[var(--surface)]
      "
    >
      {/* Brand */}
      <div className="flex h-20 items-center px-6">
        <button
          type="button"
          onClick={() => navigate("/recycler")}
          className="flex items-center gap-3"
        >
          <div
            className="
              flex h-10 w-10
              items-center justify-center
              rounded-xl
              bg-[var(--primary)]
              text-[var(--primary-foreground)]
            "
          >
            ♻
          </div>

          <div className="text-left">
            <p className="text-sm font-bold tracking-tight">
              Kabadiwala
            </p>

            <p className="text-xs text-[var(--muted)]">
              Connect
            </p>
          </div>
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 pb-6">
        <div className="space-y-7">
          {sections.map((section) => (
            <div key={section.title}>
              <p
                className="
                  mb-2
                  px-3
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.14em]
                  text-[var(--muted)]
                "
              >
                {section.title}
              </p>

              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end={item.path === "/recycler"}
                      className={({ isActive }) =>
                        `
                        group
                        flex
                        items-center
                        gap-3
                        rounded-xl
                        px-3
                        py-2.5
                        text-sm
                        font-medium
                        transition
                        ${
                          isActive
                            ? `
                              bg-[var(--accent)]
                              text-[var(--primary)]
                            `
                            : `
                              text-[var(--muted)]
                              hover:bg-[var(--surface-soft)]
                              hover:text-[var(--foreground)]
                            `
                        }
                        `
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <Icon
                            size={18}
                            strokeWidth={
                              isActive
                                ? 2
                                : 1.7
                            }
                          />

                          <span className="flex-1">
                            {item.label}
                          </span>

                          {isActive && (
                            <ChevronRight
                              size={15}
                              strokeWidth={2}
                            />
                          )}
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div
        className="
          border-t
          border-[var(--border)]
          p-4
        "
      >
        <NavLink
          to="/recycler/profile"
          className="
            flex
            items-center
            gap-3
            rounded-xl
            px-3
            py-2.5
            text-sm
            text-[var(--muted)]
            transition
            hover:bg-[var(--surface-soft)]
            hover:text-[var(--foreground)]
          "
        >
          <UserRound size={18} />
          Profile
        </NavLink>

        <NavLink
          to="/recycler/settings"
          className="
            mt-1
            flex
            items-center
            gap-3
            rounded-xl
            px-3
            py-2.5
            text-sm
            text-[var(--muted)]
            transition
            hover:bg-[var(--surface-soft)]
            hover:text-[var(--foreground)]
          "
        >
          <Settings size={18} />
          Settings
        </NavLink>

        <button
          type="button"
          onClick={handleLogout}
          className="
            mt-1
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            px-3
            py-2.5
            text-sm
            text-[var(--muted)]
            transition
            hover:bg-red-50
            hover:text-red-600
          "
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default RecyclerSidebar;