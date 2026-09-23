import {
  ArrowDownRight,
  ArrowUpRight,
  ArrowRight,
  Clock3,
  Volume2,
  Check,
} from "lucide-react";

import { motion } from "framer-motion";

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

const trendStyles = {
  rising: {
    icon: "text-[var(--primary)]",
    bg: "bg-[var(--accent)]",
    label: "Rising",
  },

  falling: {
    icon: "text-[var(--danger)]",
    bg: "bg-[var(--danger)]/10",
    label: "Falling",
  },

  stable: {
    icon: "text-[var(--muted)]",
    bg: "bg-[var(--surface-soft)]",
    label: "Stable",
  },
};

const PriceCard = ({
  price,
  selected = false,
  onSpeak,
}) => {
  const { t } = useTranslation();

  const TrendIcon =
    trendIcons[price.trend] ||
    ArrowRight;

  const icon =
    materialIcons[price.material] ||
    "♻️";

  const trend =
    trendStyles[price.trend] ||
    trendStyles.stable;

  const recordedDate =
    price.recordedAt
      ? new Date(
          price.recordedAt
        ).toLocaleDateString(
          "en-IN",
          {
            day: "numeric",
            month: "short",
            year: "numeric",
          }
        )
      : "—";

  return (
    <motion.article
      animate={{
        y: selected ? -2 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 350,
        damping: 25,
      }}
      className={`
        relative
        overflow-hidden
        rounded-[24px]
        border
        p-4
        transition-all
        duration-200

        ${
          selected
            ? `
              border-[var(--primary)]/45
              bg-[var(--surface)]
              shadow-[0_12px_30px_rgba(18,63,45,0.09)]
            `
            : `
              border-[var(--border)]
              bg-[var(--surface)]
              shadow-sm
              hover:-translate-y-0.5
              hover:shadow-md
            `
        }
      `}
    >
      {/* =====================================================
          SELECTED EDGE
      ===================================================== */}

      {selected && (
        <div
          className="
            absolute
            inset-y-4
            left-0
            w-1
            rounded-r-full
            bg-[var(--primary)]
          "
        />
      )}

      {/* =====================================================
          TOP
      ===================================================== */}

      <div className="flex items-start gap-3">
        {/* MATERIAL ICON */}

        <div
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-2xl
            bg-[var(--surface-soft)]
            text-xl
          "
        >
          {icon}
        </div>

        {/* TITLE */}

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p
              className="
                truncate
                text-sm
                font-bold
                text-[var(--foreground)]
              "
            >
              {price.material}
            </p>

            {selected && (
              <span
                className="
                  flex
                  h-5
                  w-5
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[var(--primary)]
                  text-white
                "
              >
                <Check
                  size={11}
                  strokeWidth={3}
                />
              </span>
            )}
          </div>

          {price.subcategory && (
            <p
              className="
                mt-0.5
                truncate
                text-[11px]
                text-[var(--muted)]
              "
            >
              {price.subcategory}
            </p>
          )}
        </div>

        {/* TREND */}

        <div
          className={`
            flex
            shrink-0
            items-center
            gap-1
            rounded-full
            px-2
            py-1.5
            text-[9px]
            font-bold
            ${trend.bg}
            ${trend.icon}
          `}
        >
          <TrendIcon
            size={12}
            strokeWidth={2.4}
          />

          <span className="hidden sm:inline">
            {trend.label}
          </span>
        </div>
      </div>

      {/* =====================================================
          PRICE
      ===================================================== */}

      <div className="mt-5">
        <div className="flex items-end gap-2">
          <span
            className="
              text-[2rem]
              font-extrabold
              tracking-tight
              text-[var(--foreground)]
            "
          >
            ₹
            {Math.round(
              Number(price.price || 0)
            ).toLocaleString("en-IN")}
          </span>

          <span
            className="
              mb-1
              text-xs
              font-medium
              text-[var(--muted)]
            "
          >
            / {price.unit || "kg"}
          </span>
        </div>

        <p
          className="
            mt-0.5
            text-[10px]
            uppercase
            tracking-wider
            text-[var(--muted)]
          "
        >
          {t(
            "priceBoard.prevailingPrice"
          )}
        </p>
      </div>

      {/* =====================================================
          RANGE
      ===================================================== */}

      {price.minPrice != null &&
        price.maxPrice != null && (
          <div
            className="
              mt-4
              rounded-2xl
              border
              border-[var(--border)]
              bg-[var(--background)]
              px-3
              py-2.5
            "
          >
            <div className="flex items-center justify-between">
              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-wider
                  text-[var(--muted)]
                "
              >
                {t(
                  "priceBoard.marketRange"
                )}
              </p>

              <span
                className="
                  text-[10px]
                  font-semibold
                  text-[var(--primary)]
                "
              >
                / {price.unit || "kg"}
              </span>
            </div>

            <p
              className="
                mt-1
                text-sm
                font-bold
                text-[var(--foreground)]
              "
            >
              ₹
              {Math.round(
                Number(
                  price.minPrice
                )
              ).toLocaleString(
                "en-IN"
              )}
              {" – "}
              ₹
              {Math.round(
                Number(
                  price.maxPrice
                )
              ).toLocaleString(
                "en-IN"
              )}
            </p>
          </div>
        )}

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <div
        className="
          mt-4
          flex
          items-center
          justify-between
          gap-3
        "
      >
        <div
          className="
            flex
            min-w-0
            items-center
            gap-1.5
            text-[10px]
            text-[var(--muted)]
          "
        >
          <Clock3
            size={12}
            className="shrink-0"
          />

          <span className="truncate">
            {recordedDate}
          </span>
        </div>

        {/* SPEAK CONTROL */}

        {onSpeak && (
          <div
            role="button"
            tabIndex={0}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onSpeak(price);
            }}
            onKeyDown={(event) => {
              if (
                event.key ===
                  "Enter" ||
                event.key === " "
              ) {
                event.preventDefault();
                event.stopPropagation();
                onSpeak(price);
              }
            }}
            aria-label={`Hear price for ${price.material}`}
            className="
              flex
              h-9
              w-9
              shrink-0
              cursor-pointer
              items-center
              justify-center
              rounded-xl
              border
              border-[var(--border)]
              bg-[var(--background)]
              text-[var(--muted)]
              transition
              hover:border-[var(--primary)]/40
              hover:text-[var(--primary)]
              active:scale-95
            "
          >
            <Volume2 size={15} />
          </div>
        )}
      </div>
    </motion.article>
  );
};

export default PriceCard;