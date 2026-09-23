import {
  useId,
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
  Activity,
} from "lucide-react";

import { motion } from "framer-motion";

import useTranslation from "../../../i18n/useTranslation";

const PriceHistory = ({
  history = [],
  material,
  subcategory,
}) => {
  const { t } =
    useTranslation();

  const [range, setRange] =
    useState(30);

  const gradientId =
    `priceGradient-${useId()}`;

  /* ==========================================================
     FILTER HISTORY
  ========================================================== */

  const filteredHistory =
    useMemo(() => {
      if (!history.length) {
        return [];
      }

      const sorted =
        [...history].sort(
          (a, b) =>
            new Date(
              a.recordedAt
            ) -
            new Date(
              b.recordedAt
            )
        );

      return sorted.slice(
        -range
      );
    }, [
      history,
      range,
    ]);

  /* ==========================================================
     CHART DATA
  ========================================================== */

  const chartData =
    useMemo(() => {
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

          price: Number(
            item.price
          ),
        })
      );
    }, [
      filteredHistory,
    ]);

  /* ==========================================================
     STATISTICS
  ========================================================== */

  const statistics =
    useMemo(() => {
      if (
        !filteredHistory.length
      ) {
        return null;
      }

      const values =
        filteredHistory.map(
          (item) =>
            Number(item.price)
        );

      const current =
        values[
          values.length - 1
        ];

      const previous =
        values.length > 1
          ? values[
              values.length - 2
            ]
          : current;

      const highest =
        Math.max(...values);

      const lowest =
        Math.min(...values);

      const average =
        values.reduce(
          (sum, value) =>
            sum + value,
          0
        ) / values.length;

      const change =
        previous !== 0
          ? ((current -
              previous) /
              previous) *
            100
          : 0;

      const periodChange =
        values[0] !== 0
          ? ((current -
              values[0]) /
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
    }, [
      filteredHistory,
    ]);

  /* ==========================================================
     EMPTY
  ========================================================== */

  if (!history.length) {
    return (
      <section
        className="
          rounded-[24px]
          border
          border-[var(--border)]
          bg-[var(--surface)]
          p-5
          shadow-sm
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-[var(--accent)]
              text-[var(--primary)]
            "
          >
            <TrendingUp size={18} />
          </div>

          <div>
            <h2 className="font-bold">
              {t(
                "priceBoard.priceHistory"
              )}
            </h2>

            <p
              className="
                mt-1
                text-xs
                text-[var(--muted)]
              "
            >
              No historical data available.
            </p>
          </div>
        </div>
      </section>
    );
  }

  /* ==========================================================
     MAIN
  ========================================================== */

  return (
    <section
      className="
        overflow-hidden
        rounded-[26px]
        border
        border-[var(--border)]
        bg-[var(--surface)]
        shadow-sm
      "
    >
      {/* ====================================================
          HEADER
      ==================================================== */}

      <div
        className="
          p-4
          sm:p-5
        "
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-[var(--accent)]
                text-[var(--primary)]
              "
            >
              <Activity size={17} />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2
                  className="
                    truncate
                    text-sm
                    font-bold
                    text-[var(--foreground)]
                  "
                >
                  {t(
                    "priceBoard.priceHistory"
                  )}
                </h2>
              </div>

              <p
                className="
                  mt-0.5
                  truncate
                  text-[11px]
                  text-[var(--muted)]
                "
              >
                {material}
                {subcategory
                  ? ` · ${subcategory}`
                  : ""}
              </p>
            </div>
          </div>

          {/* RANGE */}

          <div
            className="
              flex
              shrink-0
              rounded-xl
              border
              border-[var(--border)]
              bg-[var(--background)]
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
                    px-2
                    py-1.5
                    text-[10px]
                    font-bold
                    transition

                    ${
                      range ===
                      days
                        ? `
                          bg-[var(--primary)]
                          text-[var(--primary-foreground)]
                          shadow-sm
                        `
                        : `
                          text-[var(--muted)]
                        `
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

      {/* ====================================================
          STATISTICS
      ==================================================== */}

      {statistics && (
        <div
          className="
            grid
            grid-cols-2
            gap-2
            px-4
            sm:grid-cols-4
            sm:px-5
          "
        >
          <Stat
            label="Current"
            value={`₹${Math.round(
              statistics.current
            ).toLocaleString(
              "en-IN"
            )}`}
            highlight
          />

          <Stat
            label="Average"
            value={`₹${Math.round(
              statistics.average
            ).toLocaleString(
              "en-IN"
            )}`}
          />

          <Stat
            label="Highest"
            value={`₹${Math.round(
              statistics.highest
            ).toLocaleString(
              "en-IN"
            )}`}
          />

          <Stat
            label="Lowest"
            value={`₹${Math.round(
              statistics.lowest
            ).toLocaleString(
              "en-IN"
            )}`}
          />
        </div>
      )}

      {/* ====================================================
          CHANGE
      ==================================================== */}

      {statistics && (
        <div className="px-4 pt-4 sm:px-5">
          <div
            className="
              flex
              items-center
              justify-between
              gap-3
              rounded-2xl
              border
              border-[var(--border)]
              bg-[var(--background)]
              px-3.5
              py-3
            "
          >
            <div className="min-w-0">
              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-wider
                  text-[var(--muted)]
                "
              >
                Change over {range} days
              </p>

              <p
                className="
                  mt-1
                  truncate
                  text-xs
                  font-semibold
                "
              >
                ₹
                {Math.round(
                  statistics.lowest
                ).toLocaleString(
                  "en-IN"
                )}
                {" – "}
                ₹
                {Math.round(
                  statistics.highest
                ).toLocaleString(
                  "en-IN"
                )}
              </p>
            </div>

            <div
              className={`
                flex
                shrink-0
                items-center
                gap-1
                text-sm
                font-extrabold

                ${
                  statistics.periodChange >
                  0
                    ? "text-[var(--primary)]"
                    : statistics.periodChange <
                        0
                      ? "text-[var(--danger)]"
                      : "text-[var(--muted)]"
                }
              `}
            >
              {statistics.periodChange >
                0 && (
                <ArrowUpRight
                  size={16}
                />
              )}

              {statistics.periodChange <
                0 && (
                <ArrowDownRight
                  size={16}
                />
              )}

              {statistics.periodChange ===
                0 && (
                <Minus size={16} />
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

      {/* ====================================================
          CHART
      ==================================================== */}

      <div
        className="
          mt-3
          h-[240px]
          w-full
          px-1
          sm:h-[290px]
          sm:px-3
        "
      >
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <AreaChart
            data={chartData}
            margin={{
              top: 16,
              right: 8,
              left: -20,
              bottom: 4,
            }}
          >
            <defs>
              <linearGradient
                id={gradientId}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="var(--primary)"
                  stopOpacity={0.22}
                />

                <stop
                  offset="100%"
                  stopColor="var(--primary)"
                  stopOpacity={0.01}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="var(--border)"
              strokeDasharray="4 5"
              vertical={false}
            />

            <XAxis
              dataKey="date"
              tick={{
                fill: "var(--muted)",
                fontSize: 9,
              }}
              axisLine={false}
              tickLine={false}
              minTickGap={28}
            />

            <YAxis
              tick={{
                fill: "var(--muted)",
                fontSize: 9,
              }}
              axisLine={false}
              tickLine={false}
              width={44}
              domain={["auto", "auto"]}
              tickFormatter={(value) =>
                `₹${Math.round(
                  value
                )}`
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
                  "0 12px 30px rgba(0,0,0,0.08)",
                padding:
                  "10px 12px",
              }}
              labelStyle={{
                color:
                  "var(--muted)",
                marginBottom: 4,
                fontSize: 10,
              }}
              formatter={(
                value
              ) => [
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
              fill={`url(#${gradientId})`}
              strokeWidth={2.5}
              dot={false}
              activeDot={{
                r: 5,
                fill: "var(--primary)",
                stroke:
                  "var(--surface)",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* ====================================================
          FOOTER
      ==================================================== */}

      <div
        className="
          flex
          items-center
          justify-between
          gap-3
          border-t
          border-[var(--border)]
          px-4
          py-3.5
          text-[10px]
          text-[var(--muted)]
          sm:px-5
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

/* ============================================================
   STAT
============================================================ */

const Stat = ({
  label,
  value,
  highlight = false,
}) => {
  return (
    <div
      className={`
        rounded-2xl
        border
        px-3
        py-3

        ${
          highlight
            ? `
              border-[var(--primary)]/20
              bg-[var(--accent)]
            `
            : `
              border-[var(--border)]
              bg-[var(--background)]
            `
        }
      `}
    >
      <p
        className="
          text-[9px]
          font-semibold
          uppercase
          tracking-wider
          text-[var(--muted)]
        "
      >
        {label}
      </p>

      <p
        className={`
          mt-1
          text-sm
          font-extrabold
          ${
            highlight
              ? "text-[var(--primary)]"
              : "text-[var(--foreground)]"
          }
        `}
      >
        {value}
      </p>
    </div>
  );
};

export default PriceHistory;