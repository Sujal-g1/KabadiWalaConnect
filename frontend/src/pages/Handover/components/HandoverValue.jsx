import { IndianRupee } from "lucide-react";

const HandoverValue = ({
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
          <IndianRupee size={19} />
        </div>

        <div>
          <h2 className="text-sm font-semibold">
            Final Value
          </h2>

          <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
            Enter the final agreed amount.
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <div
          className="
            flex h-14 w-14
            shrink-0
            items-center
            justify-center
            rounded-2xl
            bg-[var(--accent)]
            text-xl
            font-bold
            text-[var(--primary)]
          "
        >
          ₹
        </div>

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
      </div>
    </section>
  );
};

export default HandoverValue;