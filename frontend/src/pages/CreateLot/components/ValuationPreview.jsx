import {
  IndianRupee,
  TrendingUp,
  BarChart3,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

const formatCurrency = (value) => {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "0";
  }

  return number.toLocaleString("en-IN");
};

const ValuationPreview = ({
  valuation,
  loading,
}) => {
  /* ========================================================
     LOADING
  ======================================================== */

  if (loading) {
    return (
      <motion.div
        initial={{
          opacity: 0,
          y: 8,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
          overflow-hidden
          rounded-[26px]
          border
          border-[var(--border)]
          bg-[var(--surface)]
          p-5
          shadow-sm
        "
      >
        <div className="flex items-center gap-4">
          {/* LOADING ICON */}

          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-[var(--accent)]
            "
          >
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <IndianRupee
                size={21}
                className="text-[var(--primary)]"
              />
            </motion.div>
          </div>

          <div className="min-w-0 flex-1">
            <p
              className="
                text-sm
                font-bold
                text-[var(--foreground)]
              "
            >
              Calculating estimated value
            </p>

            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[var(--border)]">
              <motion.div
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  h-full
                  w-1/2
                  rounded-full
                  bg-[var(--primary)]
                "
              />
            </div>
          </div>
        </div>

        <p
          className="
            mt-4
            text-xs
            leading-5
            text-[var(--muted)]
          "
        >
          Checking the available price data for your
          selected material, weight and location.
        </p>
      </motion.div>
    );
  }

  /* ========================================================
     EMPTY
  ======================================================== */

  if (!valuation) {
    return null;
  }

  const estimatedValue =
    Number(
      valuation.estimatedValue ??
        valuation.estimatedRate ??
        valuation.rate ??
        0
    );

  const minValue =
    valuation.minEstimatedValue !== undefined
      ? Number(
          valuation.minEstimatedValue
        )
      : null;

  const maxValue =
    valuation.maxEstimatedValue !== undefined
      ? Number(
          valuation.maxEstimatedValue
        )
      : null;

  const hasRange =
    Number.isFinite(minValue) &&
    Number.isFinite(maxValue);

  /* ========================================================
     UI
  ======================================================== */

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 0,
          y: 14,
          scale: 0.98,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          type: "spring",
          stiffness: 280,
          damping: 24,
        }}
        className="
          relative
          overflow-hidden
          rounded-[28px]
          border
          border-[var(--primary)]/20
          bg-[var(--surface)]
          shadow-[0_14px_40px_rgba(18,63,45,0.10)]
        "
      >
        {/* ==================================================
            BACKGROUND ACCENT
        ================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            -right-20
            -top-20
            h-48
            w-48
            rounded-full
            bg-[var(--accent)]
            opacity-70
            blur-3xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            bottom-0
            left-0
            h-24
            w-40
            rounded-full
            bg-[var(--accent)]
            opacity-40
            blur-3xl
          "
        />

        <div className="relative p-5">
          {/* ==================================================
              HEADER
          ================================================== */}

          <div className="flex items-start justify-between gap-4">
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
                  bg-[var(--primary)]
                  text-[var(--primary-foreground)]
                  shadow-lg
                  shadow-black/10
                "
              >
                <IndianRupee
                  size={21}
                  strokeWidth={2.4}
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.14em]
                      text-[var(--primary)]
                    "
                  >
                    Valuation
                  </span>

                  <Sparkles
                    size={12}
                    className="text-[var(--primary)]"
                  />
                </div>

                <h3
                  className="
                    mt-0.5
                    text-sm
                    font-bold
                    text-[var(--foreground)]
                  "
                >
                  Estimated lot value
                </h3>
              </div>
            </div>

            {/* MARKET BADGE */}

            <div
              className="
                flex
                shrink-0
                items-center
                gap-1.5
                rounded-full
                bg-[var(--accent)]
                px-2.5
                py-1.5
                text-[10px]
                font-bold
                text-[var(--primary)]
              "
            >
              <TrendingUp size={12} />
              Market based
            </div>
          </div>

          {/* ==================================================
              MAIN VALUE
          ================================================== */}

          <div className="mt-6">
            <p
              className="
                text-xs
                font-medium
                text-[var(--muted)]
              "
            >
              Estimated value
            </p>

            <motion.div
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.08,
                duration: 0.25,
              }}
              className="
                mt-1
                flex
                items-baseline
                gap-1
              "
            >
              <span
                className="
                  text-4xl
                  font-extrabold
                  tracking-tight
                  text-[var(--foreground)]
                "
              >
                ₹{formatCurrency(estimatedValue)}
              </span>
            </motion.div>

            {/* MARKET RANGE */}

            {hasRange && (
              <div
                className="
                  mt-3
                  flex
                  items-center
                  gap-2
                  text-xs
                  text-[var(--muted)]
                "
              >
                <BarChart3
                  size={14}
                  className="shrink-0 text-[var(--primary)]"
                />

                <span>
                  Typical range{" "}
                  <span
                    className="
                      font-semibold
                      text-[var(--foreground)]
                    "
                  >
                    ₹{formatCurrency(minValue)}
                    {" – "}
                    ₹{formatCurrency(maxValue)}
                  </span>
                </span>
              </div>
            )}
          </div>

          {/* ==================================================
              DIVIDER
          ================================================== */}

          <div
            className="
              my-5
              h-px
              bg-[var(--border)]
            "
          />

          {/* ==================================================
              INFO ROW
          ================================================== */}

          <div className="flex items-center justify-between gap-3">
            <div>
              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-wider
                  text-[var(--muted)]
                "
              >
                Estimated only
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  leading-4
                  text-[var(--muted)]
                "
              >
                Final amount may change after weighing
                and recycler inspection.
              </p>
            </div>

            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-[var(--border)]
                bg-[var(--background)]
                text-[var(--primary)]
              "
            >
              <ArrowRight size={16} />
            </div>
          </div>

          {/* ==================================================
              RANGE VISUAL
          ================================================== */}

          {hasRange && (
            <div className="mt-5">
              <div className="flex items-center justify-between text-[10px] font-semibold text-[var(--muted)]">
                <span>
                  ₹{formatCurrency(minValue)}
                </span>

                <span>
                  ₹{formatCurrency(maxValue)}
                </span>
              </div>

              <div
                className="
                  relative
                  mt-2
                  h-2
                  overflow-hidden
                  rounded-full
                  bg-[var(--background)]
                "
              >
                <div
                  className="
                    absolute
                    inset-y-0
                    left-0
                    right-0
                    rounded-full
                    bg-[var(--accent)]
                  "
                />

                <motion.div
                  initial={{
                    width: 0,
                  }}
                  animate={{
                    width: "55%",
                  }}
                  transition={{
                    delay: 0.25,
                    duration: 0.7,
                    ease: "easeOut",
                  }}
                  className="
                    absolute
                    inset-y-0
                    left-0
                    rounded-full
                    bg-[var(--primary)]
                  "
                />
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ValuationPreview;