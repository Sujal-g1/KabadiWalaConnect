import { IndianRupee } from "lucide-react";

const HandoverValue = ({
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
          <IndianRupee size={20} />
        </div>

        <div>
          <h2 className="text-sm font-semibold">
            Final Value
          </h2>

          <p className="mt-1 text-xs text-[var(--muted)]">
            Enter the final agreed amount.
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <span
          className="
            flex h-12 w-12 shrink-0
            items-center justify-center
            rounded-xl
            bg-[var(--surface-soft)]
            text-lg font-semibold
          "
        >
          ₹
        </span>

        <input
          type="number"
          min="0"
          step="1"
          inputMode="numeric"
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          placeholder="3000"
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
      </div>
    </section>
  );
};

export default HandoverValue;