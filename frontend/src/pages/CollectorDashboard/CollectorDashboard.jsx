import {
  ArrowRight,
  Clock3,
  Package,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import DashboardHeader from "./components/DashboardHeader";
import ActivitySummary from "./components/ActivitySummary";
import QuickAction from "./components/QuickAction";
import EarningsCard from "./components/EarningsCard";
import PriceSnapshot from "./components/PriceSnapshot";
import RecyclerPreview from "./components/RecyclerPreview";

import { recentLots } from "./dashboardData";

const statusStyles = {
  AVAILABLE: {
    label: "Available",
    className:
      "bg-[var(--accent)] text-[var(--primary)]",
  },

  OFFER_RECEIVED: {
    label: "Offer received",
    className:
      "bg-[var(--warning)]/10 text-[var(--warning)]",
  },

  COMPLETED: {
    label: "Completed",
    className:
      "bg-[var(--success)]/10 text-[var(--success)]",
  },
};

const CollectorDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="pb-24 lg:pb-8">
      {/* Header */}
      <DashboardHeader />

      {/* Stats */}
      <ActivitySummary />

      {/* Main content */}
      <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.75fr)]">
        {/* Left */}
        <div className="min-w-0 space-y-5">
          {/* Primary action */}
          <QuickAction />

          {/* Earnings */}
          <EarningsCard />

          {/* Recent Lots */}
          <section
            className="
              rounded-2xl border border-[var(--border)]
              bg-[var(--surface)] p-5 sm:p-6
            "
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-base font-bold text-[var(--foreground)]">
                  Recent lots
                </p>

                <p className="mt-1 text-xs text-[var(--muted)]">
                  Your latest collection activity
                </p>
              </div>

              <button
                onClick={() =>
                  navigate("/collector/lots")
                }
                className="
                  flex items-center gap-1 text-xs
                  font-semibold text-[var(--primary)]
                "
              >
                View all
                <ArrowRight size={14} />
              </button>
            </div>

            <div className="space-y-2">
              {recentLots.map((lot) => {
                const status =
                  statusStyles[lot.status] ||
                  statusStyles.AVAILABLE;

                return (
                  <button
                    key={lot.id}
                    onClick={() =>
                      navigate(
                        `/collector/lots/${lot.id}`
                      )
                    }
                    className="
                      flex w-full items-center gap-3
                      rounded-xl border border-transparent
                      p-3 text-left
                      transition
                      hover:border-[var(--border)]
                      hover:bg-[var(--surface-soft)]
                    "
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)] text-[var(--primary)]">
                      <Package size={19} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-semibold text-[var(--foreground)]">
                          {lot.material}
                        </p>

                        <span
                          className={`
                            hidden rounded-full px-2 py-1
                            text-[9px] font-semibold
                            sm:inline-flex
                            ${status.className}
                          `}
                        >
                          {status.label}
                        </span>
                      </div>

                      <p className="mt-1 truncate text-[10px] text-[var(--muted)]">
                        {lot.subcategory} ·{" "}
                        {lot.weight}
                      </p>

                      <div className="mt-1 flex items-center gap-1 text-[9px] text-[var(--muted-foreground)]">
                        <Clock3 size={10} />
                        {lot.date}
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="text-sm font-bold text-[var(--foreground)]">
                        {lot.value}
                      </p>

                      <ArrowRight
                        size={15}
                        className="ml-auto mt-1 text-[var(--muted)]"
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        {/* Right */}
        <div className="space-y-5">
          <PriceSnapshot />

          <RecyclerPreview />

          {/* Safety */}
          <section
            className="
              rounded-2xl border border-[var(--border)]
              bg-[var(--surface)] p-5
            "
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--warning)]/10 text-[var(--warning)]">
                ⚠
              </div>

              <div>
                <p className="text-sm font-bold text-[var(--foreground)]">
                  Handle e-waste safely
                </p>

                <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
                  Never burn wires, break batteries or
                  use acid to recover metals.
                </p>

                <button
                  className="mt-3 text-xs font-semibold text-[var(--primary)]"
                >
                  View safety guide →
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CollectorDashboard;