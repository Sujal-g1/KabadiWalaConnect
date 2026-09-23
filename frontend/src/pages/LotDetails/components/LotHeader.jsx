import {
  Check,
  Copy,
  MapPin,
} from "lucide-react";

import LotStatus from "./LotStatus";

const LotHeader = ({ lot }) => {
  const copyReference = async () => {
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
    <section
      className="
        rounded-3xl
        border
        border-[var(--border)]
        bg-[var(--surface)]
        p-5
        sm:p-6
      "
    >
      <div className="flex items-start justify-between gap-4">

        <div className="min-w-0">

          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
            E-Waste Lot
          </p>

          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {lot.subcategory || lot.material}
          </h1>

          {lot.subcategory && (
            <p className="mt-1 text-sm text-[var(--muted)]">
              {lot.material}
            </p>
          )}

        </div>

        <div className="shrink-0">
          <LotStatus status={lot.status} />
        </div>

      </div>

      <div
        className="
          mt-5
          flex
          flex-wrap
          gap-2
        "
      >

        {/* Reference */}
        <button
          type="button"
          onClick={copyReference}
          className="
            inline-flex
            min-h-9
            items-center
            gap-2
            rounded-xl
            border
            border-[var(--border)]
            bg-[var(--surface-soft)]
            px-3
            text-xs
            font-medium
            text-[var(--foreground)]
            transition
            hover:bg-[var(--accent)]
            active:scale-[0.98]
          "
        >
          <span className="max-w-[180px] truncate">
            {lot.referenceId}
          </span>

          <Copy
            size={13}
            className="shrink-0 text-[var(--muted)]"
          />
        </button>

        {/* Location */}
        {lot.location && (
          <div
            className="
              inline-flex
              min-h-9
              items-center
              gap-2
              rounded-xl
              border
              border-[var(--border)]
              bg-[var(--surface-soft)]
              px-3
              text-xs
              font-medium
            "
          >
            <MapPin
              size={13}
              className="shrink-0 text-[var(--primary)]"
            />

            <span className="max-w-[180px] truncate">
              {lot.location}
            </span>
          </div>
        )}

      </div>

      {/* Status message */}
      {lot.status === "AVAILABLE" && (
        <div
          className="
            mt-5
            flex
            items-start
            gap-3
            rounded-2xl
            bg-[var(--accent)]
            p-3.5
          "
        >
          <div
            className="
              mt-0.5
              flex
              h-7
              w-7
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-[var(--primary)]
              text-[var(--primary-foreground)]
            "
          >
            <Check size={15} />
          </div>

          <div>
            <p className="text-sm font-semibold">
              Lot is ready
            </p>

            <p className="mt-0.5 text-xs leading-5 text-[var(--muted)]">
              This lot is available for handover.
            </p>
          </div>
        </div>
      )}

    </section>
  );
};

export default LotHeader;