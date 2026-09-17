import { Scale } from "lucide-react";

const HandoverWeight = ({
  value,
  onChange,
}) => {
  return (
    <section
      className="
        rounded-2xl
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
          <Scale size={20} />
        </div>

        <div>
          <h2 className="text-sm font-semibold">
            Actual Weight
          </h2>

          <p className="mt-1 text-xs text-[var(--muted)]">
            Enter the weight measured during
            handover.
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
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
            w-full rounded-xl
            border border-[var(--border)]
            bg-[var(--surface-soft)]
            px-4 py-3
            text-lg font-medium
            text-[var(--foreground)]
            outline-none
            transition
            focus:border-[var(--primary)]
          "
        />

        <span
          className="
            shrink-0
            text-sm font-medium
            text-[var(--muted)]
          "
        >
          kg
        </span>
      </div>
    </section>
  );
};

export default HandoverWeight;