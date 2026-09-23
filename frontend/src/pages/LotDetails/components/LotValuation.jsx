import {
  IndianRupee,
  TrendingUp,
} from "lucide-react";

const formatAmount = (value) =>
  Number(value).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  });

const LotValuation = ({ lot }) => {
  const hasValue =
    lot.estimatedValue !== null &&
    lot.estimatedValue !== undefined;

  if (!hasValue) {
    return (
      <section
        className="
          rounded-3xl
          border
          border-[var(--border)]
          bg-[var(--surface)]
          p-5
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-[var(--surface-soft)]
              text-[var(--muted)]
            "
          >
            <IndianRupee size={18} />
          </div>

          <div>
            <p className="text-sm font-semibold">
              Estimated Value
            </p>

            <p className="mt-0.5 text-xs text-[var(--muted)]">
              Valuation is not available yet.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="
        overflow-hidden
        rounded-3xl
        border
        border-[var(--primary)]/10
        bg-[var(--accent)]
        p-5
        sm:p-6
      "
    >
      <div className="flex items-start justify-between gap-4">

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
            Estimated Value
          </p>

          <p
            className="
              mt-1
              text-3xl
              font-bold
              tracking-tight
              text-[var(--primary)]
              sm:text-4xl
            "
          >
            ₹{formatAmount(lot.estimatedValue)}
          </p>
        </div>

        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            bg-[var(--surface)]
            text-[var(--primary)]
            shadow-sm
          "
        >
          <TrendingUp size={18} />
        </div>

      </div>

      {lot.estimatedRate !== null &&
        lot.estimatedRate !== undefined && (
          <div className="mt-5 flex items-center justify-between gap-4">

            <span className="text-xs text-[var(--muted)]">
              Estimated rate
            </span>

            <span className="text-sm font-semibold">
              ₹{formatAmount(lot.estimatedRate)}
              /{lot.weightUnit || "kg"}
            </span>

          </div>
        )}

      {(lot.minEstimatedValue !== null ||
        lot.maxEstimatedValue !== null) && (
        <div
          className="
            mt-3
            flex
            items-center
            justify-between
            gap-4
            border-t
            border-[var(--primary)]/10
            pt-3
          "
        >
          <span className="text-xs text-[var(--muted)]">
            Market range
          </span>

          <span className="text-xs font-medium">
            ₹{formatAmount(lot.minEstimatedValue || 0)}
            {" – "}
            ₹{formatAmount(lot.maxEstimatedValue || 0)}
          </span>
        </div>
      )}

      <p className="mt-4 text-[11px] leading-4 text-[var(--muted)]">
        This is an estimated value. Final amount may change
        after actual weighing and recycler confirmation.
      </p>
    </section>
  );
};

export default LotValuation;