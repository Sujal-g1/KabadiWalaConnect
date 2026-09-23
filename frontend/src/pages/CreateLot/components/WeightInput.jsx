import {
  Scale,
  Minus,
  Plus,
  Info,
} from "lucide-react";

import { motion } from "framer-motion";

const WeightInput = ({
  weight,
  onChange,
}) => {
  const numericWeight = Number(weight);

  const decreaseWeight = () => {
    const next =
      Math.max(
        0,
        (Number.isFinite(numericWeight)
          ? numericWeight
          : 0) - 0.1
      );

    onChange(
      next === 0
        ? ""
        : next.toFixed(1)
    );
  };

  const increaseWeight = () => {
    const next =
      (Number.isFinite(numericWeight)
        ? numericWeight
        : 0) + 0.1;

    onChange(next.toFixed(1));
  };

  return (
    <section className="space-y-4">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex items-start gap-3">
        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-[var(--accent)]
            text-[var(--primary)]
          "
        >
          <Scale
            size={17}
            strokeWidth={2.2}
          />
        </div>

        <div>
          <h2
            className="
              text-base
              font-bold
              tracking-tight
              text-[var(--foreground)]
            "
          >
            Approximate weight
          </h2>

          <p
            className="
              mt-1
              text-sm
              leading-5
              text-[var(--muted)]
            "
          >
            Enter the approximate weight of this lot.
          </p>
        </div>
      </div>

      {/* =====================================================
          WEIGHT INPUT CARD
      ===================================================== */}

      <motion.div
        whileFocus={{
          scale: 1.01,
        }}
        className="
          overflow-hidden
          rounded-[24px]
          border
          border-[var(--border)]
          bg-[var(--surface)]
          shadow-sm
          transition
          duration-200
          focus-within:border-[var(--primary)]/40
          focus-within:shadow-[0_10px_30px_rgba(18,63,45,0.08)]
        "
      >
        <div className="flex items-center px-4 py-4">
          {/* SCALE ICON */}

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
              text-[var(--primary)]
            "
          >
            <Scale
              size={21}
              strokeWidth={2.1}
            />
          </div>

          {/* INPUT */}

          <div className="ml-4 min-w-0 flex-1">
            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.12em]
                text-[var(--muted)]
              "
            >
              Lot weight
            </p>

            <div className="mt-1 flex items-baseline gap-2">
              <input
                id="lot-weight"
                type="number"
                min="0"
                step="0.1"
                inputMode="decimal"
                value={weight}
                onChange={(event) =>
                  onChange(
                    event.target.value
                  )
                }
                placeholder="0.0"
                aria-label="Approximate lot weight in kilograms"
                className="
                  min-w-0
                  w-full
                  bg-transparent
                  text-3xl
                  font-extrabold
                  tracking-tight
                  text-[var(--foreground)]
                  outline-none
                  placeholder:text-[var(--muted)]/40
                "
              />

              <span
                className="
                  shrink-0
                  text-sm
                  font-bold
                  text-[var(--muted)]
                "
              >
                kg
              </span>
            </div>
          </div>

          {/* QUICK CONTROLS */}

          <div className="ml-2 hidden flex-col gap-1 sm:flex">
            <motion.button
              type="button"
              whileTap={{ scale: 0.88 }}
              onClick={increaseWeight}
              aria-label="Increase weight"
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                border
                border-[var(--border)]
                bg-[var(--background)]
                text-[var(--muted)]
                transition
                hover:text-[var(--primary)]
              "
            >
              <Plus size={14} />
            </motion.button>

            <motion.button
              type="button"
              whileTap={{ scale: 0.88 }}
              onClick={decreaseWeight}
              aria-label="Decrease weight"
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                border
                border-[var(--border)]
                bg-[var(--background)]
                text-[var(--muted)]
                transition
                hover:text-[var(--primary)]
              "
            >
              <Minus size={14} />
            </motion.button>
          </div>
        </div>

        {/* ===================================================
            MOBILE CONTROLS
        =================================================== */}

        <div
          className="
            grid
            grid-cols-2
            border-t
            border-[var(--border)]
            sm:hidden
          "
        >
          <button
            type="button"
            onClick={decreaseWeight}
            disabled={!weight || numericWeight <= 0}
            className="
              flex
              h-11
              items-center
              justify-center
              gap-1.5
              border-r
              border-[var(--border)]
              text-xs
              font-semibold
              text-[var(--muted)]
              transition
              active:bg-[var(--background)]
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            <Minus size={14} />
            Decrease
          </button>

          <button
            type="button"
            onClick={increaseWeight}
            className="
              flex
              h-11
              items-center
              justify-center
              gap-1.5
              text-xs
              font-semibold
              text-[var(--primary)]
              transition
              active:bg-[var(--background)]
            "
          >
            <Plus size={14} />
            Increase
          </button>
        </div>
      </motion.div>

      {/* =====================================================
          HELPER
      ===================================================== */}

      <div
        className="
          flex
          items-start
          gap-2.5
          rounded-2xl
          border
          border-[var(--border)]
          bg-[var(--background)]
          px-3.5
          py-3
        "
      >
        <Info
          size={15}
          className="
            mt-0.5
            shrink-0
            text-[var(--primary)]
          "
        />

        <p
          className="
            text-[11px]
            leading-5
            text-[var(--muted)]
          "
        >
          An approximate weight is enough for the initial
          valuation. The final amount can be adjusted after
          the material is weighed at handover.
        </p>
      </div>
    </section>
  );
};

export default WeightInput;