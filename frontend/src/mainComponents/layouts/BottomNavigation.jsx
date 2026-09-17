import {
  Home,
  Package,
  Plus,
  IndianRupee,
  MoreHorizontal,
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/collector") {
      return location.pathname === "/collector";
    }

    return location.pathname.startsWith(path);
  };

  return (
    <nav
      className="
        fixed inset-x-0 bottom-0 z-50
        border-t border-[var(--border)]
        bg-[var(--surface)]/95
        px-2 pb-[max(8px,env(safe-area-inset-bottom))]
        pt-2 backdrop-blur-xl
        lg:hidden
      "
    >
      <div className="mx-auto flex max-w-md items-end justify-around">
        {/* Home */}
        <button
          onClick={() => navigate("/collector")}
          className={`
            flex min-w-[56px] flex-col items-center gap-1
            rounded-xl px-3 py-1.5 text-[10px] font-medium
            ${
              isActive("/collector")
                ? "text-[var(--primary)]"
                : "text-[var(--muted)]"
            }
          `}
        >
          <Home size={19} />
          <span>Home</span>
        </button>

        {/* Lots */}
        <button
          onClick={() => navigate("/collector/lots")}
          className={`
            flex min-w-[56px] flex-col items-center gap-1
            rounded-xl px-3 py-1.5 text-[10px] font-medium
            ${
              isActive("/collector/lots")
                ? "text-[var(--primary)]"
                : "text-[var(--muted)]"
            }
          `}
        >
          <Package size={19} />
          <span>Lots</span>
        </button>

        {/* Create */}
        <button
          onClick={() => navigate("/collector/lots/create")}
          className="-mt-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--primary)] text-[var(--primary-foreground)] shadow-lg transition active:scale-95"
          aria-label="Create lot"
        >
          <Plus size={25} strokeWidth={2.2} />
        </button>

        {/* Prices */}
        <button
          onClick={() => navigate("/collector/prices")}
          className={`
            flex min-w-[56px] flex-col items-center gap-1
            rounded-xl px-3 py-1.5 text-[10px] font-medium
            ${
              isActive("/collector/prices")
                ? "text-[var(--primary)]"
                : "text-[var(--muted)]"
            }
          `}
        >
          <IndianRupee size={19} />
          <span>Prices</span>
        </button>

        {/* More */}
        <button
          onClick={() => navigate("/collector/settings")}
          className={`
            flex min-w-[56px] flex-col items-center gap-1
            rounded-xl px-3 py-1.5 text-[10px] font-medium
            ${
              isActive("/collector/settings")
                ? "text-[var(--primary)]"
                : "text-[var(--muted)]"
            }
          `}
        >
          <MoreHorizontal size={19} />
          <span>More</span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNavigation;