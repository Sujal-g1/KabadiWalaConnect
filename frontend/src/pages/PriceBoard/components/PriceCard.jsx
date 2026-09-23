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

const materialIcons = {
  CRT: "🖥️",
  LCD: "📺",
  PCB: "🔌",
  Cables: "🔗",
  Battery: "🔋",
  Motor: "⚙️",
  "Mixed Plastic": "♻️",
  Copper: "🟠",
  Aluminium: "⚪",
  Iron: "🔩",
};

const PriceCard = ({
  price,
  selected = false,
}) => {
  const { t } = useTranslation();

  const TrendIcon =
    trendIcons[price.trend] ||
    ArrowRight;

  const icon =
    materialIcons[price.material] ||
    "♻️";

  return (
    <article
      className={`
        rounded-[26px]
        border
        p-5
        transition-all
        duration-200

        ${
          selected
            ? `
              border-[var(--primary)]
              bg-[var(--accent)]
              shadow-sm
            `
            : `
              border-[var(--border)]
              bg-[var(--surface)]
              hover:-translate-y-0.5
              hover:border-[var(--primary)]
            `
        }
      `}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="
              flex h-11 w-11
              shrink-0
              items-center justify-center
              rounded-2xl
              bg-[var(--surface-soft)]
              text-xl
            "
          >
            {icon}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">
              {price.material}
            </p>

            {price.subcategory && (
              <p className="mt-1 truncate text-xs text-[var(--muted)]">
                {price.subcategory}
              </p>
            )}
          </div>
        </div>

        <div
          className="
            flex h-9 w-9
            shrink-0
            items-center justify-center
            rounded-xl
            bg-[var(--surface-soft)]
            text-[var(--primary)]
          "
        >
          <TrendIcon
            size={17}
            strokeWidth={2}
          />
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-end gap-2">
          <span className="text-3xl font-semibold tracking-tight">
            ₹{Math.round(price.price)}
          </span>

          <span className="mb-1 text-sm text-[var(--muted)]">
            / {price.unit || "kg"}
          </span>
        </div>

        <p className="mt-1 text-xs text-[var(--muted)]">
          {t("priceBoard.prevailingPrice")}
        </p>
      </div>

      {price.minPrice != null &&
        price.maxPrice != null && (
          <div
            className="
              mt-4
              rounded-xl
              bg-[var(--surface-soft)]
              px-3 py-2.5
            "
          >
            <p className="text-[11px] text-[var(--muted)]">
              {t("priceBoard.marketRange")}
            </p>

            <p className="mt-1 text-sm font-medium">
              ₹{Math.round(price.minPrice)}
              {" – "}
              ₹{Math.round(price.maxPrice)}
            </p>
          </div>
        )}

      <div className="mt-4 flex items-center gap-1.5 text-xs text-[var(--muted)]">
        <Clock3 size={13} />

        <span>
          {new Date(
            price.recordedAt
          ).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>
    </article>
  );
};

export default PriceCard;