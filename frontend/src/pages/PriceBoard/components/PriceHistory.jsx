import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import useTranslation from "../../../i18n/useTranslation";

const PriceHistory = ({
  history,
  material,
}) => {
  const { t } = useTranslation();

  const chartData = [...history]
    .reverse()
    .map((item) => ({
      date: new Date(
        item.recordedAt
      ).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      }),
      price: item.price,
    }));

  if (!history.length) {
    return (
      <div className="rounded-[26px] border border-[var(--border)] bg-[var(--surface)] p-5">
        <p className="text-sm text-[var(--muted)]">
          {t("priceBoard.noData")}
        </p>
      </div>
    );
  }

  return (
    <section
      className="
        rounded-[26px]
        border border-[var(--border)]
        bg-[var(--surface)]
        p-5
      "
    >
      <div className="flex items-start justify-between">
        <div>
          <h2 className="font-semibold">
            {t("priceBoard.priceHistory")}
          </h2>

          <p className="mt-1 text-xs text-[var(--muted)]">
            {material}
          </p>
        </div>

        <span className="text-xs text-[var(--muted)]">
          {history.length}{" "}
          {t("priceBoard.records")}
        </span>
      </div>

      <div className="mt-6 h-56 w-full">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <AreaChart data={chartData}>
            <XAxis
              dataKey="date"
              tick={{
                fill: "var(--muted)",
                fontSize: 11,
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{
                fill: "var(--muted)",
                fontSize: 11,
              }}
              axisLine={false}
              tickLine={false}
              width={40}
              domain={["auto", "auto"]}
            />

            <Tooltip
              contentStyle={{
                background:
                  "var(--surface)",
                border:
                  "1px solid var(--border)",
                borderRadius: "14px",
                color:
                  "var(--foreground)",
              }}
              labelStyle={{
                color: "var(--muted)",
              }}
              formatter={(value) => [
                `₹${value}`,
                "Price",
              ]}
            />

            <Area
              type="monotone"
              dataKey="price"
              stroke="var(--primary)"
              fill="var(--accent)"
              strokeWidth={2}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default PriceHistory;