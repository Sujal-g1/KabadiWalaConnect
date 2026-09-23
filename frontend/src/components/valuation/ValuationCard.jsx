import {
  ArrowDown,
  ArrowUp,
  Calculator,
} from "lucide-react";

import useTranslation from "../../i18n/useTranslation";

const ValuationCard = ({
  valuation,
}) => {
  const { t } = useTranslation();

  if (!valuation) {
    return null;
  }

  return (
    <section
      className="
        overflow-hidden
        rounded-[28px]
        border border-[var(--border)]
        bg-[var(--surface)]
      "
    >
      <div className="p-5">
        <div className="flex items-center gap-3">
          <div
            className="
              flex h-11 w-11
              items-center justify-center
              rounded-2xl
              bg-[var(--accent)]
              text-[var(--primary)]
            "
          >
            <Calculator
              size={20}
              strokeWidth={1.8}
            />
          </div>

          <div>
            <p className="text-sm text-[var(--muted)]">
              {t("priceBoard.currentRate")}
            </p>

            <p className="font-medium">
              {valuation.material}
            </p>
          </div>
        </div>

        <div className="mt-7">
          <p className="text-sm text-[var(--muted)]">
            {t("prices.estimatedValue")}
          </p>

          <p className="mt-1 text-4xl font-semibold tracking-tight">
            ₹
            {valuation.estimatedValue.toLocaleString(
              "en-IN"
            )}
          </p>
        </div>

        <div className="mt-6 rounded-2xl bg-[var(--surface-soft)] p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--muted)]">
              {valuation.weight} kg × ₹
              {valuation.rate}
            </span>

            <span className="font-medium">
              ₹
              {valuation.estimatedValue.toLocaleString(
                "en-IN"
              )}
            </span>
          </div>
        </div>
      </div>

      {valuation.marketRange && (
        <div className="grid grid-cols-2 border-t border-[var(--border)]">
          <div className="p-4">
            <div className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
              <ArrowDown size={13} />

              {t("priceBoard.marketRange")}
            </div>

            <p className="mt-1 font-medium">
              ₹{valuation.marketRange.min}
            </p>
          </div>

          <div className="border-l border-[var(--border)] p-4">
            <div className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
              <ArrowUp size={13} />

              {t("priceBoard.marketRange")}
            </div>

            <p className="mt-1 font-medium">
              ₹{valuation.marketRange.max}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ValuationCard;