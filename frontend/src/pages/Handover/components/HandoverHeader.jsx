import {
  ArrowLeft,
  Handshake,
  Copy,
} from "lucide-react";

const HandoverHeader = ({
  lot,
  onBack,
}) => {
  const copyReference = async () => {
    if (!lot?.referenceId) return;

    try {
      await navigator.clipboard.writeText(
        lot.referenceId
      );
    } catch (error) {
      console.error(
        "Failed to copy reference:",
        error
      );
    }
  };

  return (
    <header className="mb-6">
      <button
        type="button"
        onClick={onBack}
        className="
          mb-5
          flex min-h-10 items-center gap-2
          rounded-xl px-2
          text-sm font-medium
          text-[var(--muted)]
          transition
          hover:bg-[var(--surface-soft)]
          hover:text-[var(--foreground)]
          active:scale-[0.98]
        "
      >
        <ArrowLeft size={18} />
        Back to Lot
      </button>

      <div className="flex items-start gap-3">
        <div
          className="
            flex h-12 w-12 shrink-0
            items-center justify-center
            rounded-2xl
            bg-[var(--accent)]
            text-[var(--primary)]
          "
        >
          <Handshake size={23} />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
            Transfer
          </p>

          <h1 className="mt-0.5 text-2xl font-bold tracking-tight">
            Record Handover
          </h1>

          <p className="mt-1 text-sm leading-5 text-[var(--muted)]">
            Record the actual transfer of this e-waste lot.
          </p>
        </div>
      </div>

      {lot && (
        <div
          className="
            mt-5
            rounded-2xl
            border border-[var(--border)]
            bg-[var(--surface)]
            p-4
          "
        >
          <p className="text-[11px] font-medium uppercase tracking-wide text-[var(--muted)]">
            Lot Reference
          </p>

          <button
            type="button"
            onClick={copyReference}
            className="
              mt-1
              flex
              min-h-8
              max-w-full
              items-center
              gap-2
              rounded-lg
              text-sm
              font-semibold
              transition
              hover:text-[var(--primary)]
            "
          >
            <span className="truncate">
              {lot.referenceId}
            </span>

            <Copy
              size={14}
              className="shrink-0 text-[var(--muted)]"
            />
          </button>

          <p className="mt-1 text-sm text-[var(--muted)]">
            {lot.material}
            {lot.subcategory &&
              ` · ${lot.subcategory}`}
          </p>
        </div>
      )}
    </header>
  );
};

export default HandoverHeader;