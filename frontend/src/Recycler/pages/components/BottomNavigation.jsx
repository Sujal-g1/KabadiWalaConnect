import {
  Home,
  Package,
  IndianRupee,
  MapPin,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useTranslation from "../../../i18n/useTranslation";

const BottomNavigation = () => {
  const { t } = useTranslation();
 const navigate = useNavigate();

  const items = [
  {
    key: "home",
    label: t("navigation.home"),
    icon: Home,
    path: "/collector",
    active: true,
  },
  {
    key: "lots",
    label: t("navigation.lots"),
    icon: Package,
    path: "/collector/lots",
  },
  {
    key: "prices",
    label: t("navigation.prices"),
    icon: IndianRupee,
    path: "/collector/prices",
  },
  {
    key: "recyclers",
    label: t("navigation.recyclers"),
    icon: MapPin,
    path: "/collector/recyclers",
  },
  {
    key: "profile",
    label: t("navigation.profile"),
    icon: User,
    path: "/collector/profile",
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
        border-t border-[var(--border)]
        bg-[var(--background)]/90
        backdrop-blur-xl
        lg:hidden
      "
    >
      <div
        className="
          mx-auto
          flex
          max-w-lg
          items-center
          justify-around
          px-2
          pb-[max(8px,env(safe-area-inset-bottom))]
          pt-2
        "
      >
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <button
             onClick={() => navigate(item.path)}
              key={item.key}
              type="button"
              className={`
                flex
                min-w-[58px]
                flex-col
                items-center
                gap-1
                rounded-2xl
                px-3
                py-2
                transition
                ${
                  item.active
                    ? "text-[var(--primary)]"
                    : "text-[var(--muted)]"
                }
              `}
            >
              <Icon
                size={20}
                strokeWidth={item.active ? 2.2 : 1.7}
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

export default BottomNavigation;