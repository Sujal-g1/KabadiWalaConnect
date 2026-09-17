import { Copy, MapPin } from "lucide-react";

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
    <div className="space-y-4">

      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-2xl font-bold">
              {lot.subcategory ||
                lot.material}
            </h1>

            <p className="mt-1 text-sm text-[var(--muted)]">
              {lot.material}
            </p>
          </div>

          <LotStatus
            status={lot.status}
          />
        </div>
      </div>

      <div
        className="
          flex
          flex-wrap
          items-center
          gap-3
          text-sm
          text-[var(--muted)]
        "
      >
        <button
          type="button"
          onClick={copyReference}
          className="
            inline-flex
            items-center
            gap-1.5
            rounded-lg
            bg-[var(--surface-soft)]
            px-2.5
            py-1.5
            text-xs
          "
        >
          {lot.referenceId}

          <Copy size={13} />
        </button>

        <span className="flex items-center gap-1.5">
          <MapPin size={14} />
          {lot.location}
        </span>
      </div>
    </div>
  );
};

export default LotHeader;