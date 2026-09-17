import React from "react";
import { Settings } from "lucide-react";

import useAuthStore from "../../../store/authStore";
import useTranslation from "../../../i18n/useTranslation";
import LanguageSelector from "../../../components/LanguageSelector";

const RecyclerDashboardHeader = ({ onSettings }) => {
  const user = useAuthStore((state) => state.user);
  const { t } = useTranslation();

  const firstName = user?.firstName || "Recycler";

  return (
    <header className="flex items-center justify-between gap-4">
      <div className="min-w-0">
        <p className="text-sm text-[var(--muted)]">
          {t("dashboard.greeting")}
        </p>

        <h1 className="mt-1 truncate text-[clamp(1.5rem,5vw,2rem)] font-semibold tracking-tight">
          {firstName}
        </h1>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <LanguageSelector />

        <button
          type="button"
          onClick={onSettings}
          className="
            flex h-11 w-11
            items-center justify-center
            rounded-full
            border border-[var(--border)]
            bg-[var(--surface)]
            text-[var(--muted)]
            transition
            hover:text-[var(--foreground)]
            hover:scale-95
            active:scale-95
          "
          aria-label={t("navigation.settings")}
        >
          <Settings size={19} strokeWidth={1.8} />
        </button>
      </div>
    </header>
  );
};

export default RecyclerDashboardHeader;