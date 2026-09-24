import {
  ArrowDownRight,
  ArrowUpRight,
  Clock3,
  Volume2,
} from "lucide-react";

const PriceCard = ({
  price,
  selected = false,
  onSpeak,
}) => {
  const trend = price?.trend || "stable";
  const isToday = price?.isToday ?? true;

  const trendPositive =
    trend === "rising";

  const trendNegative =
    trend === "falling";

  return (
    <article
      className={`
        group
        relative
        overflow-hidden
        rounded-[24px]
        border
        p-4
        transition-all
        duration-300
        ${
          selected
            ? "border-[#35A873]/45 bg-[linear-gradient(135deg,#F3FBF6_0%,#E3F2E9_100%)] shadow-[0_16px_38px_rgba(18,63,45,0.13)]"
            : "border-[var(--border)] bg-[linear-gradient(135deg,var(--surface)_0%,var(--surface)_80%,var(--accent)_150%)] shadow-[0_10px_28px_rgba(18,63,45,0.06)] hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(18,63,45,0.10)]"
        }
      `}
    >
      {selected && (
        <div className="absolute left-0 top-0 h-full w-1 bg-[linear-gradient(180deg,#123F2D,#35A873,#278F8B)]" />
      )}

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-sm font-extrabold text-[var(--foreground)]">
              {price.material}
            </h3>

            {isToday && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#123F2D] px-2 py-1 text-[8px] font-bold uppercase tracking-[0.08em] text-[#DDF7E8]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#65D39A]" />
                Today
              </span>
            )}
          </div>

          <p className="mt-1 truncate text-[11px] text-[var(--muted)]">
            {price.subcategory}
          </p>
        </div>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onSpeak?.(price);
          }}
          className="
            flex h-9 w-9 shrink-0 items-center justify-center
            rounded-xl
            border border-[var(--border)]
            bg-[var(--surface)]
            text-[var(--muted)]
            shadow-[0_5px_14px_rgba(18,63,45,0.05)]
            transition
            hover:text-[#18794E]
            active:scale-95
          "
          aria-label={`Speak ${price.subcategory} price`}
        >
          <Volume2 size={15} />
        </button>
      </div>

      <div className="mt-6 flex items-end justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
            Current rate
          </p>

          <div className="mt-1 flex items-end gap-1.5">
            <span className="text-2xl font-black tracking-tight text-[var(--foreground)]">
              ₹{Math.round(price.price)}
            </span>

            <span className="pb-1 text-[10px] font-semibold text-[var(--muted)]">
              /kg
            </span>
          </div>
        </div>

        <div
          className={`
            flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold
            ${
              trendPositive
                ? "bg-[#E3F2E9] text-[#18794E]"
                : trendNegative
                  ? "bg-[#FBEAE8] text-[#B34A45]"
                  : "bg-[var(--surface-soft)] text-[var(--muted)]"
            }
          `}
        >
          {trendPositive ? (
            <ArrowUpRight size={13} />
          ) : trendNegative ? (
            <ArrowDownRight size={13} />
          ) : null}

          {Math.abs(
            Number(price.changePercent || 0)
          ).toFixed(1)}
          %
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5">
          <p className="text-[9px] uppercase tracking-[0.1em] text-[var(--muted)]">
            Range
          </p>

          <p className="mt-1 text-xs font-bold text-[var(--foreground)]">
            ₹{Math.round(price.minPrice)}–
            {Math.round(price.maxPrice)}
          </p>
        </div>

        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5">
          <p className="text-[9px] uppercase tracking-[0.1em] text-[var(--muted)]">
            Updated
          </p>

          <p className="mt-1 flex items-center gap-1 text-xs font-bold text-[#18794E]">
            <Clock3 size={11} />

            {isToday
              ? "Today"
              : new Date(
                  price.recordedAt
                ).toLocaleDateString(
                  "en-IN",
                  {
                    day: "2-digit",
                    month: "short",
                  }
                )}
          </p>
        </div>
      </div>
    </article>
  );
};

export default PriceCard;
