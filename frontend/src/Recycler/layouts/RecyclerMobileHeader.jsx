import {
  Bell,
  Menu,
  Search,
} from "lucide-react";

import useAuthStore from "../../store/authStore";

const RecyclerMobileHeader = ({
  onMenu,
}) => {
  const user = useAuthStore(
    (state) => state.user
  );

  const initials =
    user?.firstName?.charAt(0)?.toUpperCase() ||
    "R";

  return (
    <header
      className="
        sticky
        top-0
        z-30
        flex
        h-16
        items-center
        justify-between
        border-b
        border-[var(--border)]
        bg-[var(--background)]/90
        px-4
        backdrop-blur-xl
        lg:hidden
      "
    >
      <button
        type="button"
        onClick={onMenu}
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          text-[var(--muted)]
          transition
          hover:bg-[var(--surface-soft)]
        "
        aria-label="Open menu"
      >
        <Menu size={21} />
      </button>

      <div
        className="
          flex
          items-center
          gap-2
        "
      >
        <div
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-lg
            bg-[var(--primary)]
            text-sm
            text-[var(--primary-foreground)]
          "
        >
          ♻
        </div>

        <span className="text-sm font-bold">
          Recycler
        </span>
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            text-[var(--muted)]
          "
        >
          <Search size={19} />
        </button>

        <button
          type="button"
          className="
            relative
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            text-[var(--muted)]
          "
        >
          <Bell size={19} />

          <span
            className="
              absolute
              right-2
              top-2
              h-1.5
              w-1.5
              rounded-full
              bg-[var(--primary)]
            "
          />
        </button>

        <div
          className="
            ml-1
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            bg-[var(--accent)]
            text-xs
            font-bold
            text-[var(--primary)]
          "
        >
          {initials}
        </div>
      </div>
    </header>
  );
};

export default RecyclerMobileHeader;