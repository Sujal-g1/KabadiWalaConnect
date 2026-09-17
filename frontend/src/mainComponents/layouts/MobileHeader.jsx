import {
  Bell,
  Menu,
  Search,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import useAuthStore from "../../store/authStore";

const MobileHeader = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const initials =
    `${user?.firstName?.charAt(0) || ""}${user?.lastName?.charAt(0) || ""}`
      .trim()
      .toUpperCase() || "U";

  return (
    <header
      className="
        sticky top-0 z-40 flex h-16 items-center
        justify-between border-b border-[var(--border)]
        bg-[var(--background)]/95 px-4 backdrop-blur-xl
        lg:hidden
      "
    >
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="
            flex h-10 w-10 items-center justify-center
            rounded-xl text-[var(--foreground)]
            transition hover:bg-[var(--surface-soft)]
          "
          aria-label="Open menu"
        >
          <Menu size={21} />
        </button>

        <button
          onClick={() => navigate("/collector")}
          className="flex items-center gap-2"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)]">
            <span className="text-sm">♻</span>
          </div>

          <span className="text-sm font-bold tracking-tight text-[var(--foreground)]">
            KabadiWala
          </span>
        </button>
      </div>

      <div className="flex items-center gap-1">
        <button
          className="
            flex h-10 w-10 items-center justify-center
            rounded-xl text-[var(--muted)]
            hover:bg-[var(--surface-soft)]
          "
        >
          <Search size={19} />
        </button>

        <button
          className="
            relative flex h-10 w-10 items-center justify-center
            rounded-xl text-[var(--muted)]
            hover:bg-[var(--surface-soft)]
          "
        >
          <Bell size={19} />

          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[var(--danger)]" />
        </button>

        <button
          onClick={() => navigate("/collector/settings")}
          className="
            ml-1 flex h-9 w-9 items-center justify-center
            rounded-full bg-[var(--surface-soft)]
            text-xs font-bold text-[var(--foreground)]
          "
        >
          {initials}
        </button>
      </div>
    </header>
  );
};

export default MobileHeader;