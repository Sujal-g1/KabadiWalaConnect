import {
  IndianRupee,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

import { motion } from "framer-motion";

const formatAmount = (value) =>
  Number(value).toLocaleString(
    "en-IN",
    {
      maximumFractionDigits: 2,
    }
  );

const LotValuation = ({ lot }) => {
  const hasValue =
    lot.estimatedValue !== null &&
    lot.estimatedValue !== undefined;

  if (!hasValue) {
    return (
      <section
        className="
          rounded-[28px]
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
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-[var(--surface-soft)]
              text-[var(--muted)]
            "
          >
            <IndianRupee
              size={19}
            />
          </div>

          <div>
            <p className="text-sm font-bold">
              Estimated Value
            </p>

            <p
              className="
                mt-1
                text-xs
                text-[var(--muted)]
              "
            >
              Valuation is not available yet.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 12,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="
        relative
        overflow-hidden
        rounded-[30px]
        border
        border-white/10
        bg-[linear-gradient(135deg,#06150F_0%,#0B2C1D_38%,#126140_72%,#16805A_100%)]
        p-5
        text-white
        shadow-[0_20px_50px_rgba(18,63,45,0.22)]
        sm:p-6
      "
    >
      {/* AMBIENT SHAPES */}

      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-56
          w-56
          rounded-full
          bg-[#52D49A]/20
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-20
          -left-20
          h-44
          w-44
          rounded-full
          bg-[#1D9F71]/20
          blur-3xl
        "
      />

      <div className="relative">
        {/* HEADER */}

        <div className="flex items-start justify-between gap-4">
          <div>
            <div
              className="
                flex
                items-center
                gap-2
                text-[10px]
                font-bold
                uppercase
                tracking-[0.16em]
                text-white/55
              "
            >
              <TrendingUp size={13} />

              Estimated value
            </div>

            <p
              className="
                mt-3
                text-4xl
                font-extrabold
                tracking-tight
                sm:text-5xl
              "
            >
              ₹
              {formatAmount(
                lot.estimatedValue
              )}
            </p>

            <p
              className="
                mt-1
                text-xs
                text-white/55
              "
            >
              Current estimated lot value
            </p>
          </div>

          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-2xl
              border
              border-white/10
              bg-white/10
              text-white
              shadow-lg
              backdrop-blur-md
            "
          >
            <IndianRupee
              size={19}
            />
          </div>
        </div>

        {/* RATE */}

        {lot.estimatedRate !==
          null &&
          lot.estimatedRate !==
            undefined && (
            <div
              className="
                mt-6
                flex
                items-center
                justify-between
                gap-4
                rounded-2xl
                border
                border-white/10
                bg-black/10
                px-3.5
                py-3
                backdrop-blur-sm
              "
            >
              <span className="text-xs text-white/55">
                Estimated rate
              </span>

              <span className="text-sm font-bold">
                ₹
                {formatAmount(
                  lot.estimatedRate
                )}
                /{lot.weightUnit ||
                  "kg"}
              </span>
            </div>
          )}

        {/* MARKET RANGE */}

        {(lot.minEstimatedValue !==
          null ||
          lot.maxEstimatedValue !==
            null) && (
          <div className="mt-3">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-white/50">
                Market range
              </span>

              <span className="font-semibold text-white/80">
                ₹
                {formatAmount(
                  lot.minEstimatedValue ||
                    0
                )}
                {" – "}
                ₹
                {formatAmount(
                  lot.maxEstimatedValue ||
                    0
                )}
              </span>
            </div>

            <div
              className="
                mt-2
                h-1.5
                overflow-hidden
                rounded-full
                bg-white/10
              "
            >
              <div
                className="
                  h-full
                  w-[58%]
                  rounded-full
                  bg-gradient-to-r
                  from-emerald-300
                  to-white/80
                "
              />
            </div>
          </div>
        )}

        {/* NOTE */}

        <div
          className="
            mt-5
            flex
            items-start
            gap-2
            text-[11px]
            leading-5
            text-white/50
          "
        >
          <ArrowUpRight
            size={13}
            className="mt-0.5 shrink-0"
          />

          Final amount may change after actual
          weighing and recycler confirmation.
        </div>
      </div>
    </motion.section>
  );
};

export default LotValuation;