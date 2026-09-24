import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Minus,
  TrendingUp,
} from "lucide-react";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  useMemo,
  useState,
} from "react";

const RANGE_OPTIONS = [
  { label: "7D", value: 7 },
  { label: "30D", value: 30 },
  { label: "90D", value: 90 },
];

const PriceHistory = ({
  history = [],
  material,
  subcategory,
}) => {
  const [range, setRange] =
    useState(30);

  const prepared = useMemo(() => {
    const sorted = [...history].sort(
      (a, b) =>
        new Date(a.recordedAt) -
        new Date(b.recordedAt)
    );

    const visible = sorted.slice(
      -range
    );

    return visible.map(
      (item, index) => {
        const date = new Date(
          item.recordedAt
        );

        return {
          ...item,

          index,

          displayDate:
            date.toLocaleDateString(
              "en-IN",
              {
                day: "2-digit",
                month: "short",
              }
            ),

          displayFullDate:
            date.toLocaleDateString(
              "en-IN",
              {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }
            ),
        };
      }
    );
  }, [history, range]);

  const today = useMemo(
    () =>
      prepared.find(
        (item) => item.isToday
      ) ||
      prepared.at(-1),
    [prepared]
  );

  const previous = useMemo(() => {
    if (!today) return null;

    const index =
      prepared.findIndex(
        (item) =>
          item.id === today.id
      );

    return index > 0
      ? prepared[index - 1]
      : null;
  }, [prepared, today]);

  const currentPrice =
    today?.price ?? 0;

  const previousPrice =
    previous?.price ??
    today?.previousClose ??
    currentPrice;

  const change =
    previousPrice > 0
      ? ((currentPrice -
          previousPrice) /
          previousPrice) *
        100
      : today?.changePercent || 0;

  const direction =
    change > 0.05
      ? "up"
      : change < -0.05
        ? "down"
        : "flat";

  const highest =
    prepared.length
      ? Math.max(
          ...prepared.map(
            (item) =>
              Number(item.price) || 0
          )
        )
      : currentPrice;

  const lowest =
    prepared.length
      ? Math.min(
          ...prepared.map(
            (item) =>
              Number(item.price) || 0
          )
        )
      : currentPrice;

  const average =
    prepared.length
      ? prepared.reduce(
          (sum, item) =>
            sum +
            Number(item.price || 0),
          0
        ) / prepared.length
      : currentPrice;

  if (!prepared.length) {
    return (
      <div
        className="
          rounded-[28px]
          border border-[var(--border)]
          bg-[var(--surface)]
          p-6
          shadow-[0_12px_35px_rgba(18,63,45,0.07)]
        "
      >
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent)] text-[var(--primary)]">
            <Activity size={19} />
          </div>

          <div>
            <p className="text-sm font-bold">
              No history available
            </p>

            <p className="mt-1 text-xs text-[var(--muted)]">
              Price history will appear here once a
              material is selected.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section
      className="
        overflow-hidden
        rounded-[28px]
        border border-[var(--border)]
        bg-[linear-gradient(135deg,var(--surface)_0%,var(--surface)_72%,var(--accent)_155%)]
        shadow-[0_14px_40px_rgba(18,63,45,0.08)]
      "
    >
      {/* Header */}
      <div className="border-b border-[var(--border)] px-5 py-5 sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="
                  inline-flex items-center gap-1.5 rounded-full
                  border border-[#35A873]/25
                  bg-[linear-gradient(135deg,#DDF4E7,#8DCEAA)]
                  px-2.5 py-1
                  text-[9px] font-bold uppercase tracking-[0.12em]
                  text-[#123F2D]
                  shadow-[0_5px_14px_rgba(18,63,45,0.12)]
                "
              >
                <TrendingUp size={11} />
                Market trend
              </span>

              {today?.isToday && (
                <span
                  className="
                    inline-flex items-center gap-1.5 rounded-full
                    border border-[#35A873]/20
                    bg-[#123F2D]
                    px-2.5 py-1
                    text-[9px] font-bold uppercase tracking-[0.12em]
                    text-[#DDF7E8]
                    shadow-[0_5px_14px_rgba(18,63,45,0.15)]
                  "
                >
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#65D39A]" />
                  Live today
                </span>
              )}
            </div>

            <h3 className="mt-3 text-lg font-extrabold tracking-tight text-[var(--foreground)] sm:text-xl">
              {subcategory || material}
            </h3>

            <p className="mt-1 text-xs text-[var(--muted)]">
              {material}
              {subcategory ? " · " : ""}
              {subcategory}
            </p>
          </div>

          <div
            className="
              rounded-2xl
              border border-[var(--border)]
              bg-[var(--surface)]
              px-4 py-3
              shadow-[0_8px_24px_rgba(18,63,45,0.05)]
            "
          >
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
              <CalendarDays size={13} />
              Current rate
            </div>

            <div className="mt-1 flex items-end gap-2">
              <span className="text-2xl font-black tracking-tight text-[var(--foreground)]">
                ₹{Number(currentPrice).toFixed(0)}
              </span>

              <span className="pb-1 text-[10px] font-semibold text-[var(--muted)]">
                / kg
              </span>
            </div>

            <div
              className={`
                mt-1 inline-flex items-center gap-1 text-xs font-bold
                ${
                  direction === "up"
                    ? "text-[#18794E]"
                    : direction === "down"
                      ? "text-[#B34A45]"
                      : "text-[var(--muted)]"
                }
              `}
            >
              {direction === "up" ? (
                <ArrowUpRight size={14} />
              ) : direction === "down" ? (
                <ArrowDownRight size={14} />
              ) : (
                <Minus size={14} />
              )}

              {Math.abs(change).toFixed(2)}%
              <span className="font-medium">
                vs previous point
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="px-3 pb-2 pt-4 sm:px-5">
        <div className="h-[280px] w-full sm:h-[330px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={prepared}
              margin={{
                top: 10,
                right: 12,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient
                  id="priceAreaGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#18794E"
                    stopOpacity={0.28}
                  />
                  <stop
                    offset="100%"
                    stopColor="#18794E"
                    stopOpacity={0.02}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                vertical={false}
                stroke="rgba(18,63,45,0.08)"
                strokeDasharray="4 5"
              />

              <XAxis
                dataKey="displayDate"
                tick={{
                  fontSize: 10,
                  fill: "var(--muted)",
                }}
                axisLine={false}
                tickLine={false}
                minTickGap={22}
              />

              <YAxis
                width={42}
                tick={{
                  fontSize: 10,
                  fill: "var(--muted)",
                }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) =>
                  `₹${Math.round(value)}`
                }
              />

              <Tooltip
                cursor={{
                  stroke: "rgba(24,121,78,0.20)",
                  strokeWidth: 1,
                }}
                contentStyle={{
                  borderRadius: 16,
                  border:
                    "1px solid rgba(18,63,45,0.10)",
                  boxShadow:
                    "0 14px 35px rgba(18,63,45,0.12)",
                  fontSize: 12,
                  background:
                    "rgba(255,255,255,0.96)",
                }}
                formatter={(value) => [
                  `₹${Number(value).toFixed(2)}/kg`,
                  "Price",
                ]}
                labelFormatter={(_, payload) =>
                  payload?.[0]?.payload
                    ?.displayFullDate || ""
                }
              />

              <Area
                type="monotone"
                dataKey="price"
                stroke="#18794E"
                strokeWidth={3}
                fill="url(#priceAreaGradient)"
                activeDot={{
                  r: 6,
                  strokeWidth: 3,
                  stroke: "#fff",
                  fill: "#18794E",
                }}
                dot={(props) => {
                  const isToday =
                    props.payload?.isToday;

                  if (!isToday) {
                    return null;
                  }

                  return (
                    <circle
                      cx={props.cx}
                      cy={props.cy}
                      r={7}
                      fill="#18794E"
                      stroke="#fff"
                      strokeWidth={3}
                    />
                  );
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2 border-t border-[var(--border)] px-4 py-4 sm:grid-cols-4 sm:px-5">
        <Metric
          label="High"
          value={`₹${highest.toFixed(0)}`}
        />

        <Metric
          label="Low"
          value={`₹${lowest.toFixed(0)}`}
        />

        <Metric
          label="Average"
          value={`₹${average.toFixed(0)}`}
        />

        <Metric
          label="Today"
          value={`₹${currentPrice.toFixed(0)}`}
          live
        />
      </div>

      {/* Range */}
      <div className="flex items-center justify-between gap-3 border-t border-[var(--border)] px-5 py-4 sm:px-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">
            View period
          </p>

          <p className="mt-1 flex items-center gap-1.5 text-xs text-[var(--muted)]">
            <Clock3 size={12} />
            Latest point is today's dynamic snapshot
          </p>
        </div>

        <div className="flex items-center rounded-xl border border-[var(--border)] bg-[var(--surface)] p-1">
          {RANGE_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() =>
                setRange(option.value)
              }
              className={`
                rounded-lg px-2.5 py-1.5 text-[10px] font-bold
                transition
                ${
                  range === option.value
                    ? "bg-[#123F2D] text-white shadow-[0_5px_14px_rgba(18,63,45,0.15)]"
                    : "text-[var(--muted)] hover:bg-[var(--surface-soft)]"
                }
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

const Metric = ({
  label,
  value,
  live = false,
}) => (
  <div
    className="
      rounded-2xl
      border border-[var(--border)]
      bg-[var(--surface)]
      px-3 py-3
    "
  >
    <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
      {label}
    </p>

    <p
      className={`
        mt-1 text-sm font-extrabold
        ${
          live
            ? "text-[#18794E]"
            : "text-[var(--foreground)]"
        }
      `}
    >
      {value}
    </p>
  </div>
);

export default PriceHistory;
