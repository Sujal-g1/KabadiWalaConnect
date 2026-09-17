import {
  ArrowDownRight,
  ArrowUpRight,
  Clock3,
  Package,
  Wallet,
} from "lucide-react";

import { dashboardStats } from "../dashboardData";

const icons = {
  activeLots: Package,
  earnings: Wallet,
  pending: Clock3,
};

const ActivitySummary = () => {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {dashboardStats.map((stat) => {
        const Icon = icons[stat.id];

        const positive =
          stat.id !== "pending";

        return (
          <div
            key={stat.id}
            className={`
              rounded-2xl border
              border-[var(--border)]
              bg-[var(--surface)]
              p-4 sm:p-5
              ${stat.id === "pending" ? "col-span-2 sm:col-span-1" : ""}
            `}
          >
            <div className="mb-5 flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--accent)] text-[var(--primary)]">
                <Icon size={18} />
              </div>

              <span
                className={`
                  flex items-center gap-0.5 rounded-full
                  px-2 py-1 text-[10px] font-semibold
                  ${
                    positive
                      ? "bg-[var(--accent)] text-[var(--primary)]"
                      : "bg-[var(--surface-soft)] text-[var(--muted)]"
                  }
                `}
              >
                {positive ? (
                  <ArrowUpRight size={12} />
                ) : (
                  <ArrowDownRight size={12} />
                )}

                {stat.change}
              </span>
            </div>

            <p className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
              {stat.value}
            </p>

            <p className="mt-1 text-xs font-medium text-[var(--muted)]">
              {stat.label}
            </p>

            <p className="mt-3 text-[10px] text-[var(--muted-foreground)]">
              {stat.changeLabel}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default ActivitySummary;