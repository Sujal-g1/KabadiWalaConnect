import { ArrowLeft, Handshake } from "lucide-react";

const HandoverHeader = ({
  lot,
  onBack,
}) => {
  return (
    <div className="mb-6">
      <button
        type="button"
        onClick={onBack}
        className="
          mb-5 flex items-center gap-2
          text-sm font-medium
          text-[var(--muted)]
          transition
          hover:text-[var(--foreground)]
        "
      >
        <ArrowLeft size={18} />
        Back to Lot
      </button>

      <div className="flex items-start gap-3">
        <div
          className="
            flex h-11 w-11 shrink-0
            items-center justify-center
            rounded-xl
            bg-[var(--accent)]
            text-[var(--primary)]
          "
        >
          <Handshake size={22} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            Record Handover
          </h1>

          <p className="mt-1 text-sm text-[var(--muted)]">
            Record the actual transfer of
            this e-waste lot.
          </p>
        </div>
      </div>

      {lot && (
        <div
          className="
            mt-5 rounded-2xl
            border border-[var(--border)]
            bg-[var(--surface)]
            p-4
          "
        >
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
            Lot Reference
          </p>

          <p className="mt-1 font-semibold text-[var(--foreground)]">
            {lot.referenceId}
          </p>

          <p className="mt-1 text-sm text-[var(--muted)]">
            {lot.material}

            {lot.subcategory &&
              ` · ${lot.subcategory}`}
          </p>
        </div>
      )}
    </div>
  );
};

export default HandoverHeader;