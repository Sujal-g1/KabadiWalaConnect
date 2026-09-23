import {
  Home,
  MoreHorizontal,
  PackageSearch,
  Plus,
  Truck,
  Wallet,
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";

const RecyclerBottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    {
      label: "Home",
      icon: Home,
      path: "/recycler",
    },
    {
      label: "Marketplace",
      icon: PackageSearch,
      path: "/recycler/marketplace",
    },
    {
      label: "Add",
      icon: Plus,
      path: null,
      primary: true,
    },
    {
      label: "Pickups",
      icon: Truck,
      path: "/recycler/pickups",
    },
    {
      label: "Payments",
      icon: Wallet,
      path: "/recycler/payments",
    },
  ];

  return (
    <nav
      className="
        fixed
        bottom-0
        left-0
        right-0
        z-40
        border-t
        border-[var(--border)]
        bg-[var(--background)]/95
        backdrop-blur-xl
        lg:hidden
      "
    >
      <div
        className="
          mx-auto
          flex
          max-w-lg
          items-end
          justify-around
          px-2
          pb-[max(8px,env(safe-area-inset-bottom))]
          pt-2
        "
      >
        {items.map((item) => {
          const Icon = item.icon;

          const active =
            item.path &&
            (item.path === "/recycler"
              ? location.pathname ===
                "/recycler"
              : location.pathname.startsWith(
                  item.path
                ));

          if (item.primary) {
            return (
              <button
                key={item.label}
                type="button"
                onClick={() =>
                  navigate(
                    "/recycler/marketplace"
                  )
                }
                className="
                  -mt-7
                  flex
                  flex-col
                  items-center
                  gap-1
                "
              >
                <span
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-full
                    border-4
                    border-[var(--background)]
                    bg-[var(--primary)]
                    text-[var(--primary-foreground)]
                    shadow-lg
                  "
                >
                  <Icon
                    size={23}
                    strokeWidth={2}
                  />
                </span>

                <span
                  className="
                    text-[10px]
                    font-semibold
                    text-[var(--muted)]
                  "
                >
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.label}
              type="button"
              onClick={() =>
                item.path &&
                navigate(item.path)
              }
              className={`
                flex
                min-w-[58px]
                flex-col
                items-center
                gap-1
                rounded-xl
                px-2
                py-1.5
                ${
                  active
                    ? "text-[var(--primary)]"
                    : "text-[var(--muted)]"
                }
              `}
            >
              <Icon
                size={19}
                strokeWidth={
                  active ? 2.2 : 1.7
                }
              />

              <span className="text-[10px] font-medium">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default RecyclerBottomNavigation;