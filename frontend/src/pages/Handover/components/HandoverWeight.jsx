import { Scale } from "lucide-react";

const HandoverWeight = ({
  value,
  onChange,
}) => {
  return (
    <section
      className="
        rounded-3xl
        border border-[var(--border)]
        bg-[var(--surface)]
        p-5
      "
    >
      <div className="flex items-start gap-3">
        <div
          className="
            flex h-10 w-10 shrink-0
            items-center justify-center
            rounded-xl
            bg-[var(--accent)]
            text-[var(--primary)]
          "
        >
          <Scale size={19} />
        </div>

        <div>
          <h2 className="text-sm font-semibold">
            Actual Weight
          </h2>

          <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
            Enter the weight measured during handover.
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <input
          type="number"
          min="0"
          step="0.1"
          inputMode="decimal"
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          placeholder="12.4"
          className="
            h-14
            min-w-0
            flex-1
            rounded-2xl
            border border-[var(--border)]
            bg-[var(--surface-soft)]
            px-4
            text-xl
            font-semibold
            text-[var(--foreground)]
            outline-none
            transition
            placeholder:text-[var(--muted)]
            focus:border-[var(--primary)]
            focus:ring-2
            focus:ring-[var(--primary)]/10
          "
        />

        <div
          className="
            flex h-14
            items-center
            rounded-2xl
            border border-[var(--border)]
            bg-[var(--surface-soft)]
            px-4
            text-sm
            font-semibold
            text-[var(--muted)]
          "
        >
          kg
        </div>
      </div>
    </section>
  );
};

export default HandoverWeight;