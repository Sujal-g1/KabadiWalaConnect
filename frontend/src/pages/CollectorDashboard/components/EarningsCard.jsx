import {
  ArrowUpRight,
  IndianRupee,
} from "lucide-react";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

import { monthlyEarnings } from "../dashboardData";

const EarningsCard = () => {
  return (
    <section
      className="
        overflow-hidden rounded-2xl border
        border-[var(--border)]
        bg-[var(--surface)]
      "
    >
      <div className="flex items-start justify-between p-5 sm:p-6">
        <div>
          <div className="mb-3 flex items-center gap-2 text-xs font-medium text-[var(--muted)]">
            <IndianRupee size={15} />

            <span>This month's earnings</span>
          </div>

          <div className="flex items-end gap-2">
            <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">
              ₹8,420
            </h2>

            <span className="mb-1 flex items-center gap-0.5 text-xs font-semibold text-[var(--primary)]">
              <ArrowUpRight size={13} />
              12%
            </span>
          </div>
        </div>

        <button className="text-xs font-semibold text-[var(--primary)]">
          View details
        </button>
      </div>

      <div className="h-[180px] w-full px-2 pb-3 sm:h-[200px] sm:px-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={monthlyEarnings}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient
                id="earningsFill"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="var(--primary)"
                  stopOpacity={0.18}
                />

                <stop
                  offset="100%"
                  stopColor="var(--primary)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "var(--muted)",
                fontSize: 11,
              }}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid var(--border)",
                background: "var(--surface)",
                color: "var(--foreground)",
                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.08)",
              }}
              formatter={(value) => [
                `₹${value}`,
                "Earnings",
              ]}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--primary)"
              strokeWidth={2.5}
              fill="url(#earningsFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default EarningsCard;