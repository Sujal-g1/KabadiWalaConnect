import {
  Package,
  Wallet,
} from "lucide-react";

import useTranslation from "../../../i18n/useTranslation";

const ActivitySummary = ({
  activeLots,
  pendingPayments,
}) => {
  const { t } = useTranslation();

  return (
    <section>
      <h2 className="mb-3 text-lg font-semibold">
        {t("dashboard.recentTransactions")}
      </h2>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-[26px] border border-[var(--border)] bg-[var(--surface)] p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--accent)] text-[var(--primary)]">
            <Package size={19} strokeWidth={1.8} />
          </div>

          <p className="mt-5 text-3xl font-semibold">
            {activeLots}
          </p>

          <p className="mt-1 text-sm text-[var(--muted)]">
            {t("dashboard.activeLots")}
          </p>
        </div>

        <div className="rounded-[26px] border border-[var(--border)] bg-[var(--surface)] p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--accent)] text-[var(--primary)]">
            <Wallet size={19} strokeWidth={1.8} />
          </div>

          <p className="mt-5 text-3xl font-semibold">
            ₹{pendingPayments.toLocaleString("en-IN")}
          </p>

          <p className="mt-1 text-sm text-[var(--muted)]">
            {t("dashboard.pendingPayments")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ActivitySummary;