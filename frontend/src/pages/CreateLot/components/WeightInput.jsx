import { Scale } from "lucide-react";

const WeightInput = ({
  weight,
  onChange,
}) => {
  return (
    <div className="space-y-3">
      <div>
        <h2 className="text-base font-semibold">
          Approximate weight
        </h2>

        <p className="mt-1 text-sm text-[var(--muted)]">
          Enter the approximate weight of this lot.
        </p>
      </div>

      <div className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)] text-[var(--primary)]">
          <Scale size={21} />
        </div>

        <input
          type="number"
          min="0"
          step="0.1"
          inputMode="decimal"
          value={weight}
          onChange={(event) =>
            onChange(event.target.value)
          }
          placeholder="e.g. 12"
          className="min-w-0 flex-1 bg-transparent text-xl font-semibold outline-none placeholder:text-[var(--muted-foreground)]"
        />

        <span className="font-medium text-[var(--muted)]">
          kg
        </span>
      </div>
    </div>
  );
};

export default WeightInput;