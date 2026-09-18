import {
  useMemo,
  useState,
} from "react";

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
  ArrowDownRight,
  ArrowUpRight,
  Minus,
  TrendingUp,
} from "lucide-react";

import useTranslation from "../../../i18n/useTranslation";

const PriceHistory = ({
  history = [],
  material,
  subcategory,
}) => {
  const { t } = useTranslation();

  const [range, setRange] =
    useState(30);

  const filteredHistory = useMemo(() => {
    if (!history.length) {
      return [];
    }

    const sorted = [...history].sort(
      (a, b) =>
        new Date(a.recordedAt) -
        new Date(b.recordedAt)
    );

    return sorted.slice(-range);
  }, [history, range]);

  const chartData = useMemo(() => {
    return filteredHistory.map(
      (item) => ({
        date: new Date(
          item.recordedAt
        ).toLocaleDateString(
          "en-IN",
          {
            day: "2-digit",
            month: "short",
          }
        ),

        fullDate: new Date(
          item.recordedAt
        ).toLocaleDateString(
          "en-IN",
          {
            day: "numeric",
            month: "short",
            year: "numeric",
          }
        ),

        price: Number(item.price),
      })
    );
  }, [filteredHistory]);

  const statistics = useMemo(() => {
    if (!filteredHistory.length) {
      return null;
    }

    const values =
      filteredHistory.map((item) =>
        Number(item.price)
      );

    const current =
      values[values.length - 1];

    const previous =
      values.length > 1
        ? values[values.length - 2]
        : current;

    const highest = Math.max(
      ...values
    );

    const lowest = Math.min(
      ...values
    );

    const average =
      values.reduce(
        (sum, value) =>
          sum + value,
        0
      ) / values.length;

    const change =
      previous !== 0
        ? ((current - previous) /
            previous) *
          100
        : 0;

    const periodChange =
      values[0] !== 0
        ? ((current - values[0]) /
            values[0]) *
          100
        : 0;

    return {
      current,
      previous,
      highest,
      lowest,
      average,
      change,
      periodChange,
    };
  }, [filteredHistory]);

  if (!history.length) {
    return (
      <section
        className="
          rounded-[26px]
          border border-[var(--border)]
          bg-[var(--surface)]
          p-5
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
              flex h-10 w-10
              items-center justify-center
              rounded-xl
              bg-[var(--accent)]
              text-[var(--primary)]
            "
          >
            <TrendingUp size={18} />
          </div>

          <div>
            <h2 className="font-semibold">
              {t(
                "priceBoard.priceHistory"
              )}
            </h2>

            <p className="mt-1 text-xs text-[var(--muted)]">
              No historical data available
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
        rounded-[26px]
        border border-[var(--border)]
        bg-[var(--surface)]
      "
    >
      {/* Header */}
      <div className="p-5 pb-0">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <div
                className="
                  flex h-10 w-10
                  shrink-0
                  items-center justify-center
                  rounded-xl
                  bg-[var(--accent)]
                  text-[var(--primary)]
                "
              >
                <TrendingUp size={18} />
              </div>

              <div className="min-w-0">
                <h2 className="font-semibold">
                  {t(
                    "priceBoard.priceHistory"
                  )}
                </h2>

                <p className="mt-1 truncate text-xs text-[var(--muted)]">
                  {material}
                  {subcategory
                    ? ` · ${subcategory}`
                    : ""}
                </p>
              </div>
            </div>
          </div>

          {/* Range */}
          <div
            className="
              flex shrink-0
              rounded-xl
              bg-[var(--surface-soft)]
              p-1
            "
          >
            {[7, 30, 90].map(
              (days) => (
                <button
                  key={days}
                  type="button"
                  onClick={() =>
                    setRange(days)
                  }
                  className={`
                    rounded-lg
                    px-2.5 py-1.5
                    text-xs
                    font-medium
                    transition
                    ${
                      range === days
                        ? "bg-[var(--surface)] text-[var(--foreground)] shadow-sm"
                        : "text-[var(--muted)]"
                    }
                  `}
                >
                  {days}D
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Statistics */}
      {statistics && (
        <div className="mt-5 grid grid-cols-2 border-y border-[var(--border)] sm:grid-cols-4">
          <Stat
            label="Current"
            value={`₹${Math.round(
              statistics.current
            )}`}
          />

          <Stat
            label="Average"
            value={`₹${Math.round(
              statistics.average
            )}`}
          />

          <Stat
            label="Highest"
            value={`₹${Math.round(
              statistics.highest
            )}`}
          />

          <Stat
            label="Lowest"
            value={`₹${Math.round(
              statistics.lowest
            )}`}
          />
        </div>
      )}

      {/* Change */}
      {statistics && (
        <div className="px-5 pt-5">
          <div
            className={`
              flex items-center justify-between
              rounded-2xl
              px-4 py-3
              ${
                statistics.periodChange >
                0
                  ? "bg-success/10"
                  : statistics.periodChange <
                    0
                  ? "bg-danger/10"
                  : "bg-[var(--surface-soft)]"
              }
            `}
          >
            <div>
              <p className="text-xs text-[var(--muted)]">
                Change over {range} days
              </p>

              <p className="mt-1 text-sm font-medium">
                ₹
                {Math.round(
                  statistics.lowest
                )}{" "}
                — ₹
                {Math.round(
                  statistics.highest
                )}
              </p>
            </div>

            <div
              className={`
                flex items-center gap-1
                text-sm font-semibold
                ${
                  statistics.periodChange >
                  0
                    ? "text-success"
                    : statistics.periodChange <
                      0
                    ? "text-danger"
                    : "text-[var(--muted)]"
                }
              `}
            >
              {statistics.periodChange >
                0 && (
                <ArrowUpRight
                  size={17}
                />
              )}

              {statistics.periodChange <
                0 && (
                <ArrowDownRight
                  size={17}
                />
              )}

              {statistics.periodChange ===
                0 && (
                <Minus size={17} />
              )}

              {statistics.periodChange >
              0
                ? "+"
                : ""}
              {statistics.periodChange.toFixed(
                1
              )}
              %
            </div>
          </div>
        </div>
      )}

      {/* Chart */}
      <div className="mt-5 h-64 w-full px-2 sm:h-72 sm:px-4">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <AreaChart
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: -15,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient
                id="priceGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="var(--primary)"
                  stopOpacity={0.25}
                />

                <stop
                  offset="100%"
                  stopColor="var(--primary)"
                  stopOpacity={0.02}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="var(--border)"
              strokeDasharray="4 4"
              vertical={false}
            />

            <XAxis
              dataKey="date"
              tick={{
                fill: "var(--muted)",
                fontSize: 10,
              }}
              axisLine={false}
              tickLine={false}
              minTickGap={30}
            />

            <YAxis
              tick={{
                fill: "var(--muted)",
                fontSize: 10,
              }}
              axisLine={false}
              tickLine={false}
              width={45}
              domain={["auto", "auto"]}
              tickFormatter={(value) =>
                `₹${Math.round(value)}`
              }
            />

            <Tooltip
              cursor={{
                stroke:
                  "var(--border)",
              }}
              contentStyle={{
                background:
                  "var(--surface)",
                border:
                  "1px solid var(--border)",
                borderRadius:
                  "14px",
                color:
                  "var(--foreground)",
                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.08)",
              }}
              labelStyle={{
                color:
                  "var(--muted)",
                marginBottom: 4,
              }}
              formatter={(value) => [
                `₹${Math.round(
                  value
                )} / kg`,
                "Price",
              ]}
            />

            <Area
              type="monotone"
              dataKey="price"
              stroke="var(--primary)"
              fill="url(#priceGradient)"
              strokeWidth={2.5}
              dot={false}
              activeDot={{
                r: 5,
                fill: "var(--primary)",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}
      <div
        className="
          flex items-center justify-between
          border-t border-[var(--border)]
          px-5 py-4
          text-xs text-[var(--muted)]
        "
      >
        <span>
          {filteredHistory.length} records
        </span>

        <span>
          Reference market data
        </span>
      </div>
    </section>
  );
};

const Stat = ({
  label,
  value,
}) => {
  return (
    <div
      className="
        border-r
        border-[var(--border)]
        p-4
        last:border-r-0
      "
    >
      <p className="text-[10px] uppercase tracking-wide text-[var(--muted)]">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold">
        {value}
      </p>
    </div>
  );
};

export default PriceHistory;