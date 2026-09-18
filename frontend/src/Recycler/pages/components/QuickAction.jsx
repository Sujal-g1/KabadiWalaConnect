import { ArrowUpRight, Camera } from "lucide-react";

import useTranslation from "../../../i18n/useTranslation";

const QuickAction = ({ onClick }) => {
  const { t } = useTranslation();

  return (
    <button
      type="button"
      onClick={onClick}
      className="
        group
        relative
        w-full
        overflow-hidden
        rounded-[30px]
        bg-[var(--primary)]
        p-5
        text-left
        text-[var(--primary-foreground)]
        shadow-[0_16px_40px_rgba(0,0,0,0.08)]
        transition
        hover:-translate-y-0.5
        active:scale-[0.99]
      "
    >
      <div className="relative z-10 flex items-center justify-between gap-5">
        <div>
          <div
            className="
              mb-5
              flex h-11 w-11
              items-center justify-center
              rounded-2xl
              bg-[var(--primary-foreground)]/12
            "
          >
            <Camera size={21} strokeWidth={1.8} />
          </div>

          <h2 className="text-xl font-semibold">
            {t("dashboard.sellEwaste")}
          </h2>

          <p className="mt-1 text-sm opacity-65">
            {t("dashboard.sellEwasteSubtitle")}
          </p>
        </div>

        <div
          className="
            flex h-12 w-12 shrink-0
            items-center justify-center
            rounded-full
            bg-[var(--primary-foreground)]/10
            transition-transform
            group-hover:translate-x-1
          "
        >
          <ArrowUpRight size={21} />
        </div>
      </div>

      <div
        className="
          absolute
          -right-16
          -top-16
          h-40
          w-40
          rounded-full
          border border-[var(--primary-foreground)]/10
        "
      />

      <div
        className="
          absolute
          -bottom-24
          right-8
          h-48
          w-48
          rounded-full
          border border-[var(--primary-foreground)]/5
        "
      />
    </button>
  );
};

export default QuickAction;