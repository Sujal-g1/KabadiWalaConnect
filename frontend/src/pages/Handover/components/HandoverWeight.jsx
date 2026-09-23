import {
  Info,
  Minus,
  Plus,
  Scale,
} from "lucide-react";

import { motion } from "framer-motion";

const HandoverWeight = ({
  value,
  onChange,
}) => {
  const numericValue =
    Number(value);

  const decrease = () => {
    const current =
      Number.isFinite(
        numericValue
      )
        ? numericValue
        : 0;

    const next =
      Math.max(
        0,
        current - 0.1
      );

    onChange(
      next === 0
        ? ""
        : next.toFixed(1)
    );
  };

  const increase = () => {
    const current =
      Number.isFinite(
        numericValue
      )
        ? numericValue
        : 0;

    onChange(
      (current + 0.1).toFixed(1)
    );
  };

  return (
    <section
      className="
        rounded-[28px]
        border
        border-[var(--border)]
        bg-[linear-gradient(135deg,var(--surface)_0%,var(--background)_110%)]
        p-5
        shadow-[0_12px_35px_rgba(18,63,45,0.07)]
        sm:p-6
      "
    >
      <div className="flex items-start gap-3">
        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-2xl
            bg-[var(--accent)]
            text-[var(--primary)]
            shadow-sm
          "
        >
          <Scale size={19} />
        </div>

        <div>
          <h2 className="text-sm font-extrabold">
            Actual Weight
          </h2>

          <p
            className="
              mt-1
              text-xs
              leading-5
              text-[var(--muted)]
            "
          >
            Enter the weight measured during handover.
          </p>
        </div>
      </div>

      <div
        className="
          mt-5
          overflow-hidden
          rounded-[22px]
          border
          border-[var(--border)]
          bg-[var(--background)]
          shadow-inner
          transition
          focus-within:border-[var(--primary)]/40
          focus-within:shadow-[0_0_0_4px_rgba(18,63,45,0.04)]
        "
      >
        <div className="flex items-center px-4 py-4">
          <div className="min-w-0 flex-1">
            <p
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.14em]
                text-[var(--muted)]
              "
            >
              Measured weight
            </p>

            <div className="mt-1 flex items-baseline gap-2">
              <input
                type="number"
                min="0"
                step="0.1"
                inputMode="decimal"
                value={value}
                onChange={(event) =>
                  onChange(
                    event.target.value
                  )
                }
                placeholder="0.0"
                className="
                  min-w-0
                  w-full
                  bg-transparent
                  text-3xl
                  font-extrabold
                  tracking-tight
                  text-[var(--foreground)]
                  outline-none
                  placeholder:text-[var(--muted)]/35
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

          <div className="ml-3 hidden flex-col gap-1 sm:flex">
            <motion.button
              type="button"
              whileTap={{ scale: 0.88 }}
              onClick={increase}
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                border
                border-[var(--border)]
                bg-[var(--surface)]
                text-[var(--muted)]
                hover:text-[var(--primary)]
              "
            >
              <Plus size={14} />
            </motion.button>

            <motion.button
              type="button"
              whileTap={{ scale: 0.88 }}
              onClick={decrease}
              disabled={
                !value ||
                numericValue <= 0
              }
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                border
                border-[var(--border)]
                bg-[var(--surface)]
                text-[var(--muted)]
                disabled:opacity-40
              "
            >
              <Minus size={14} />
            </motion.button>
          </div>
        </div>

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
            onClick={decrease}
            disabled={
              !value ||
              numericValue <= 0
            }
            className="
              h-11
              border-r
              border-[var(--border)]
              text-xs
              font-semibold
              text-[var(--muted)]
              disabled:opacity-40
            "
          >
            − Decrease
          </button>

          <button
            type="button"
            onClick={increase}
            className="
              h-11
              text-xs
              font-semibold
              text-[var(--primary)]
            "
          >
            + Increase
          </button>
        </div>
      </div>

      <div
        className="
          mt-3
          flex
          items-start
          gap-2
          rounded-xl
          bg-[var(--background)]
          px-3
          py-2.5
        "
      >
        <Info
          size={13}
          className="
            mt-0.5
            shrink-0
            text-[var(--primary)]
          "
        />

        <p
          className="
            text-[10px]
            leading-4
            text-[var(--muted)]
          "
        >
          Use the actual measured weight at the point of
          transfer.
        </p>
      </div>
    </section>
  );
};

export default HandoverWeight;