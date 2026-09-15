import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import ThemeSelector from "../components/ThemeSelector";
import useTranslation from "../i18n/useTranslation";

const CollectorSettings = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="mx-auto max-w-2xl px-4 py-5 sm:px-6">
        <header className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/collector")}
            className="
              flex h-11 w-11
              items-center justify-center
              rounded-full
              border border-[var(--border)]
              bg-[var(--surface)]
            "
          >
            <ArrowLeft size={19} />
          </button>

          <h1 className="text-xl font-semibold">
            {t("navigation.settings")}
          </h1>
        </header>

        <section className="mt-8">
          <p className="mb-3 text-sm font-medium text-[var(--muted)]">
            Appearance
          </p>

          <div className="rounded-[26px] border border-[var(--border)] bg-[var(--surface)] p-4">
            <ThemeSelector />
          </div>
        </section>
      </div>
    </main>
  );
};

export default CollectorSettings;