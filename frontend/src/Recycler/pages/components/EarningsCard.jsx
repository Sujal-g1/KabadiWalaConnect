import {
  ArrowUpRight,
  Wallet,
} from "lucide-react";

import useTranslation from "../../../i18n/useTranslation";

const EarningsCard = ({ earnings }) => {
  const { t } = useTranslation();

  return (
    <section
      className="
        rounded-[28px]
        border border-[var(--border)]
        bg-[var(--surface)]
        p-5
      "
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[var(--muted)]">
            {t("dashboard.totalEarnings")}
          </p>

          <p className="mt-2 text-[clamp(2rem,8vw,2.5rem)] font-semibold tracking-tight">
            ₹{earnings.total.toLocaleString("en-IN")}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent)] text-[var(--primary)]">
          <Wallet size={20} strokeWidth={1.8} />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-[var(--surface-soft)] p-3">
          <p className="text-xs text-[var(--muted)]">
            {t("dashboard.todayEarnings")}
          </p>

          <p className="mt-1 font-semibold">
            ₹{earnings.today.toLocaleString("en-IN")}
          </p>
        </div>

        <div className="rounded-2xl bg-[var(--surface-soft)] p-3">
          <p className="text-xs text-[var(--muted)]">
            {t("dashboard.pendingPayments")}
          </p>

          <p className="mt-1 font-semibold">
            ₹{earnings.pending.toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      <button
        type="button"
        className="
          mt-4
          flex
          w-full
          items-center
          justify-between
          rounded-2xl
          border border-[var(--border)]
          px-4 py-3
          text-sm
          font-medium
          transition
          hover:bg-[var(--surface-soft)]
        "
      >
        {t("navigation.earnings")}

        <ArrowUpRight size={17} />
      </button>
    </section>
  );
};

export default EarningsCard;