import {
  Bell,
  MapPin,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../store/authStore";
import AIAssistantButton from "../../../components/AI/AIAssistantButton.jsx";

const DashboardHeader = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();


  const firstName =
    user?.firstName || "Collector";

  const initials =
    `${user?.firstName?.charAt(0) || ""}${user?.lastName?.charAt(0) || ""}`
      .trim()
      .toUpperCase() || "U";

  return (
    <div className="mb-7 flex items-start justify-between gap-4">
      <div className="min-w-0">
        <div className="mb-2 flex items-center gap-1.5 text-xs text-[var(--muted)]">
          <MapPin size={14} />

          <span>
            {user?.operatingLocation ||
              "Your location"}
          </span>
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
          Good morning, {firstName}
        </h1>

        <p className="mt-1 text-sm text-[var(--muted)]">
          Here's what's happening with your collection.
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2">

      <AIAssistantButton />

        <button
          className="
            relative hidden h-10 w-10 items-center
            justify-center rounded-xl border
            border-[var(--border)]
            bg-[var(--surface)]
            text-[var(--muted)]
            transition hover:bg-[var(--surface-soft)]
            sm:flex
          "
        >
          <Bell size={19} />

          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[var(--danger)]" />
        </button>

        <button
          onClick={() =>
            navigate("/collector/settings")
          }
          className="
            flex h-10 w-10 items-center justify-center
            rounded-xl bg-[var(--surface-soft)]
            text-xs font-bold text-[var(--foreground)]
          "
        >
          {initials}
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;