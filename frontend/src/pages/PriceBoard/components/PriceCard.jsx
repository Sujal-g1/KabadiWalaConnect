import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Clock3,
} from "lucide-react";

import useTranslation from "../../../i18n/useTranslation";

const trendIcons = {
  rising: ArrowUpRight,
  falling: ArrowDownRight,
  stable: ArrowRight,
};

const PriceCard = ({ price }) => {
  const { t } = useTranslation();

  const TrendIcon =
    trendIcons[price.trend] || ArrowRight;

  return (
    <article
      className="
        rounded-[26px]
        border border-[var(--border)]
        bg-[var(--surface)]
        p-5
        transition
        hover:-translate-y-0.5
      "
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-[var(--muted)]">
            {price.material}
          </p>

          {price.subcategory && (
            <p className="mt-1 text-xs text-[var(--muted-foreground)]">
              {price.subcategory}
            </p>
          )}
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--accent)] text-[var(--primary)]">
          <TrendIcon size={17} strokeWidth={2} />
        </div>
      </div>

      <div className="mt-6 flex items-end gap-2">
        <span className="text-3xl font-semibold tracking-tight">
          ₹{price.price}
        </span>

        <span className="mb-1 text-sm text-[var(--muted)]">
          / {price.unit}
        </span>
      </div>

      {price.minPrice != null &&
        price.maxPrice != null && (
          <div className="mt-3">
            <p className="text-xs text-[var(--muted)]">
              {t("priceBoard.marketRange")}
            </p>

            <p className="mt-1 text-sm font-medium">
              ₹{price.minPrice} – ₹{price.maxPrice}
            </p>
          </div>
        )}

      <div className="mt-5 flex items-center gap-1.5 text-xs text-[var(--muted)]">
        <Clock3 size={13} />

        <span>
          {new Date(
            price.recordedAt
          ).toLocaleDateString()}
        </span>
      </div>
    </article>
  );
};

export default PriceCard;