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

import { motion } from "framer-motion";

import { monthlyEarnings } from "../dashboardData";
import useTranslation from "../../../i18n/useTranslation";

const EarningsCard = () => {

  const {t} = useTranslation();

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-[24px]
        border
        border-[var(--border)]
        bg-[var(--surface)]
        shadow-[0_10px_35px_rgba(18,63,45,0.07)]
        transition-all
        duration-400
        hover:-translate-y-1
        hover:border-[var(--primary)]/15
        hover:shadow-[0_20px_50px_rgba(18,63,45,0.13)]
      "
    >
      {/* ======================================================
          TOP ACCENT
      ====================================================== */}
    <div className="
          pointer-events-none
          absolute
          left-8
          right-8
          top-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-[var(--primary)]/45
          to-transparent
        "
      />

      {/* ======================================================
          SOFT BACKGROUND GLOW
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-16
          -top-16
          h-40
          w-40
          rounded-full
          bg-emerald-300/10
          blur-[65px]
          transition-all
          duration-500
          group-hover:scale-125
          group-hover:bg-emerald-300/15
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-[-70px]
          left-[35%]
          h-36
          w-36
          rounded-full
          bg-teal-300/[0.07]
          blur-[60px]
        "
      />

      {/* ======================================================
          HEADER
      ====================================================== */}

      <div
        className="
          relative
          z-10
          flex
          items-start
          justify-between
          gap-4
          p-5
          sm:p-6
        "
      >
        <div>
          {/* LABEL */}

          <div
            className="
              mb-3
              flex
              items-center
              gap-2
              text-xs
              font-semibold
              text-[var(--muted)]
            "
          >
            <span
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-xl
                bg-gradient-to-br
                from-emerald-50
                via-emerald-100
                to-teal-100
                text-[var(--primary)]
                shadow-[0_7px_18px_rgba(24,121,78,0.10)]
                ring-1
                ring-inset
                ring-emerald-200/50
              "
            >
              <IndianRupee
                size={15}
                strokeWidth={2.2}
              />
            </span>

            <span>
              {t("earnings.thisMonthEarnings")}
            </span>
          </div>

          {/* AMOUNT + GROWTH */}

          <div className="flex items-end gap-3">
            <h2
              className="
                text-3xl
                font-black
                tracking-tight
                text-[var(--foreground)]
                sm:text-[34px]
              "
            >
              ₹8,420
            </h2>

            <span
              className="
                mb-1
                inline-flex
                items-center
                gap-0.5
                rounded-full
                border
                border-emerald-200/70
                bg-gradient-to-r
                from-emerald-50
                to-emerald-100
                px-2
                py-1
                text-[10px]
                font-bold
                text-[var(--primary)]
                shadow-[0_5px_15px_rgba(24,121,78,0.08)]
              "
            >
              <ArrowUpRight
                size={12}
                strokeWidth={2.5}
              />

              12%
            </span>
          </div>

          <p
            className="
              mt-1.5
              text-[11px]
              font-medium
              text-[var(--muted-foreground)]
            "
          >
            {t("earnings.comparedWithLastMonth")}
          </p>
        </div>

        {/* VIEW DETAILS */}

        <button
          type="button"
          className="
            group/button
            inline-flex
            shrink-0
            items-center
            gap-1.5
            rounded-xl
            border
            border-[var(--border)]
            bg-[var(--surface-soft)]
            px-3
            py-2
            text-[11px]
            font-bold
            text-[var(--primary)]
            shadow-sm
            transition-all
            duration-300
            hover:border-[var(--primary)]/20
            hover:bg-[var(--accent)]
            hover:shadow-[0_7px_18px_rgba(24,121,78,0.08)]
          "
        >
          <span>
            {t("earnings.viewDetails")}
          </span>

          <ArrowUpRight
            size={13}
            className="
              transition-transform
              duration-300
              group-hover/button:translate-x-0.5
              group-hover/button:-translate-y-0.5
            "
          />
        </button>
      </div>

      {/* ======================================================
          CHART CONTAINER
      ====================================================== */}

      <div
        className="
          relative
          z-10
          h-[185px]
          w-full
          px-2
          pb-3
          sm:h-[205px]
          sm:px-4
        "
      >
        {/* CHART TOP FADE */}

        <div
          className="
            pointer-events-none
            absolute
            inset-x-6
            top-0
            h-12
            rounded-full
            bg-emerald-300/5
            blur-2xl
          "
        />

        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <AreaChart
            data={monthlyEarnings}
            margin={{
              top: 12,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              {/* Main fill */}

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
                  stopOpacity={0.28}
                />

                <stop
                  offset="45%"
                  stopColor="var(--secondary)"
                  stopOpacity={0.13}
                />

                <stop
                  offset="100%"
                  stopColor="var(--primary)"
                  stopOpacity={0}
                />
              </linearGradient>

              {/* Line glow */}

              <filter
                id="earningsGlow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur
                  stdDeviation="3"
                  result="blur"
                />

                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "var(--muted)",
                fontSize: 11,
                fontWeight: 500,
              }}
              dy={7}
            />

            <Tooltip
              cursor={{
                stroke: "var(--primary)",
                strokeOpacity: 0.15,
                strokeDasharray: "4 4",
              }}
              contentStyle={{
                borderRadius: "14px",
                border: "1px solid var(--border)",
                background: "var(--surface)",
                color: "var(--foreground)",
                boxShadow:
                  "0 14px 35px rgba(18,63,45,0.12)",
                padding: "9px 12px",
              }}
              labelStyle={{
                color: "var(--muted)",
                fontSize: 10,
                fontWeight: 600,
                marginBottom: 4,
              }}
              itemStyle={{
                color: "var(--primary)",
                fontSize: 12,
                fontWeight: 700,
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
              strokeWidth={3}
              fill="url(#earningsFill)"
              filter="url(#earningsGlow)"
              activeDot={{
                r: 5,
                fill: "var(--surface)",
                stroke: "var(--primary)",
                strokeWidth: 3,
              }}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* ======================================================
          BOTTOM ACCENT
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-6
          h-[2px]
          w-10
          rounded-full
          bg-[var(--primary)]
          opacity-50
          transition-all
          duration-500
          group-hover:w-20
          group-hover:opacity-90
        "
      />
    </motion.section>
  );
};

export default EarningsCard;