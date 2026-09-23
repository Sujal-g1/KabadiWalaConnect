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

const cardStyles = {
  activeLots: {
    icon:
      "bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-200 text-[var(--primary)] ring-1 ring-inset ring-emerald-200/60",
    glow:
      "group-hover:shadow-[0_18px_45px_rgba(24,121,78,0.12)]",
    iconShadow:
      "shadow-[0_8px_20px_rgba(24,121,78,0.10)]",
  },

  earnings: {
    icon:
      "bg-gradient-to-br from-teal-50 via-teal-100 to-emerald-100 text-[var(--info)] ring-1 ring-inset ring-teal-200/60",
    glow:
      "group-hover:shadow-[0_18px_45px_rgba(39,143,139,0.12)]",
    iconShadow:
      "shadow-[0_8px_20px_rgba(39,143,139,0.10)]",
  },

  pending: {
    icon:
      "bg-gradient-to-br from-amber-50 via-amber-100 to-orange-100 text-[var(--highlight-strong)] ring-1 ring-inset ring-amber-200/60",
    glow:
      "group-hover:shadow-[0_18px_45px_rgba(230,164,59,0.14)]",
    iconShadow:
      "shadow-[0_8px_20px_rgba(230,164,59,0.10)]",
  },
};

const ActivitySummary = () => {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {dashboardStats.map((stat) => {
        const Icon = icons[stat.id];
        const style = cardStyles[stat.id];

        const positive = stat.id !== "pending";

        return (
          <div
            key={stat.id}
            className={`
              group
              relative
              overflow-hidden
              rounded-2xl
              border
              border-[var(--border)]
              bg-[var(--surface)]
              p-4
              sm:p-5

              shadow-[0_8px_28px_rgba(18,63,45,0.06)]

              transition-all
              duration-300
              ease-out

              hover:-translate-y-1
              hover:border-[var(--primary)]/15
              hover:shadow-[0_16px_42px_rgba(18,63,45,0.12)]

              ${style.glow}

              ${
                stat.id === "pending"
                  ? "col-span-2 sm:col-span-1"
                  : ""
              }
            `}
          >
            {/* =====================================================
                TOP ACCENT
            ===================================================== */}

            <div
              className={`
                pointer-events-none
                absolute
                left-5
                right-5
                top-0
                h-px
                opacity-60
                transition-opacity
                duration-300
                group-hover:opacity-100

                ${
                  stat.id === "pending"
                    ? "bg-gradient-to-r from-transparent via-amber-400/60 to-transparent"
                    : stat.id === "earnings"
                    ? "bg-gradient-to-r from-transparent via-teal-400/60 to-transparent"
                    : "bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent"
                }
              `}
            />

            {/* =====================================================
                SOFT BACKGROUND GLOW
            ===================================================== */}

            <div
              className={`
                pointer-events-none
                absolute
                -right-8
                -top-8
                h-20
                w-20
                rounded-full
                blur-2xl
                opacity-30
                transition-all
                duration-500
                group-hover:scale-150
                group-hover:opacity-50

                ${
                  stat.id === "pending"
                    ? "bg-amber-300"
                    : stat.id === "earnings"
                    ? "bg-teal-300"
                    : "bg-emerald-300"
                }
              `}
            />

            {/* =====================================================
                TOP ROW
            ===================================================== */}

            <div className="relative z-10 mb-5 flex items-center justify-between">
              {/* ICON */}

              <div
                className={`
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  transition-all
                  duration-300

                  group-hover:scale-105
                  group-hover:-rotate-2

                  ${style.icon}
                  ${style.iconShadow}
                `}
              >
                <Icon
                  size={18}
                  strokeWidth={2.2}
                />
              </div>

              {/* CHANGE */}

              <span
                className={`
                  flex
                  items-center
                  gap-0.5
                  rounded-full
                  border
                  px-2
                  py-1
                  text-[10px]
                  font-bold
                  transition-all
                  duration-300

                  ${
                    positive
                      ? `
                        border-emerald-200/70
                        bg-gradient-to-r
                        from-emerald-50
                        to-emerald-100
                        text-[var(--primary)]
                        group-hover:border-emerald-300
                        group-hover:shadow-[0_5px_15px_rgba(24,121,78,0.08)]
                      `
                      : `
                        border-[var(--border)]
                        bg-[var(--surface-soft)]
                        text-[var(--muted)]
                        group-hover:bg-[var(--accent)]
                      `
                  }
                `}
              >
                {positive ? (
                  <ArrowUpRight size={12} strokeWidth={2.4} />
                ) : (
                  <ArrowDownRight size={12} strokeWidth={2.4} />
                )}

                {stat.change}
              </span>
            </div>

            {/* =====================================================
                VALUE
            ===================================================== */}

            <p
              className="
                relative
                z-10
                text-2xl
                font-black
                tracking-tight
                text-[var(--foreground)]
                transition-transform
                duration-300
                group-hover:translate-x-0.5
              "
            >
              {stat.value}
            </p>

            {/* =====================================================
                LABEL
            ===================================================== */}

            <p
              className="
                relative
                z-10
                mt-1
                text-xs
                font-semibold
                text-[var(--muted)]
              "
            >
              {stat.label}
            </p>

            {/* =====================================================
                CHANGE LABEL
            ===================================================== */}

            <p
              className="
                relative
                z-10
                mt-3
                text-[10px]
                font-medium
                text-[var(--muted-foreground)]
              "
            >
              {stat.changeLabel}
            </p>

            {/* =====================================================
                BOTTOM MICRO ACCENT
            ===================================================== */}

            <div
              className={`
                pointer-events-none
                absolute
                bottom-0
                left-4
                h-[2px]
                w-8
                rounded-full
                opacity-50
                transition-all
                duration-500
                group-hover:w-14
                group-hover:opacity-90

                ${
                  stat.id === "pending"
                    ? "bg-[var(--highlight)]"
                    : stat.id === "earnings"
                    ? "bg-[var(--info)]"
                    : "bg-[var(--primary)]"
                }
              `}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ActivitySummary;