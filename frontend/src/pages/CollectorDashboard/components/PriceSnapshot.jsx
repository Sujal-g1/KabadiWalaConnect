import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  IndianRupee,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { priceSnapshot } from "../dashboardData";

const PriceSnapshot = () => {
  const navigate = useNavigate();

  return (
    <section
      className="
        rounded-2xl border border-[var(--border)]
        bg-[var(--surface)] p-5 sm:p-6
      "
    >
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-base font-bold text-[var(--foreground)]">
            Local price board
          </p>

          <p className="mt-1 text-xs text-[var(--muted)]">
            Current buying prices
          </p>
        </div>

        <button
          onClick={() =>
            navigate("/collector/prices")
          }
          className="
            flex items-center gap-1 text-xs
            font-semibold text-[var(--primary)]
          "
        >
          See all
          <ArrowRight size={14} />
        </button>
      </div>

      <div className="space-y-1">
        {priceSnapshot.map((item) => {
          const rising = item.direction === "up";

          return (
            <div
              key={item.material}
              className="
                flex items-center justify-between
                rounded-xl px-2 py-3
                transition hover:bg-[var(--surface-soft)]
              "
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--accent)] text-[var(--primary)]">
                  <IndianRupee size={16} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-[var(--foreground)]">
                    {item.material}
                  </p>

                  <p className="text-[10px] text-[var(--muted)]">
                    per {item.unit}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm font-bold text-[var(--foreground)]">
                  {item.price}
                </p>

                <p
                  className={`
                    flex items-center justify-end gap-0.5 text-[10px] font-semibold
                    ${
                      rising
                        ? "text-[var(--primary)]"
                        : "text-[var(--danger)]"
                    }
                  `}
                >
                  {rising ? (
                    <ArrowUpRight size={11} />
                  ) : (
                    <ArrowDownRight size={11} />
                  )}

                  {item.trend}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PriceSnapshot;