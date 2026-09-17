import {
  ArrowRight,
  MapPin,
  Scale,
} from "lucide-react";

import LotStatusBadge from "./LotStatusBadge";

const LotCard = ({ lot, onClick }) => {
  const photo =
    lot.photos?.[0]?.url;

  return (
    <button
      type="button"
      onClick={onClick}
      className="
        group
        w-full
        overflow-hidden
        rounded-3xl
        border
        border-[var(--border)]
        bg-[var(--surface)]
        text-left
        transition
        hover:-translate-y-0.5
        hover:border-[var(--primary)]/30
        active:scale-[0.99]
      "
    >
      <div className="flex gap-4 p-4">

        {/* Photo */}
        <div
          className="
            h-24
            w-24
            shrink-0
            overflow-hidden
            rounded-2xl
            bg-[var(--surface-soft)]
          "
        >
          {photo ? (
            <img
              src={photo}
              alt={lot.material}
              className="
                h-full
                w-full
                object-cover
              "
            />
          ) : (
            <div
              className="
                flex
                h-full
                w-full
                items-center
                justify-center
                text-3xl
              "
            >
              ♻️
            </div>
          )}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">

          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h2 className="truncate font-semibold">
                {lot.subcategory ||
                  lot.material}
              </h2>

              <p className="mt-0.5 text-xs text-[var(--muted)]">
                {lot.referenceId}
              </p>
            </div>

            <ArrowRight
              size={18}
              className="
                shrink-0
                text-[var(--muted)]
                transition-transform
                group-hover:translate-x-1
              "
            />
          </div>

          <div
            className="
              mt-3
              flex
              flex-wrap
              items-center
              gap-x-3
              gap-y-1.5
              text-xs
              text-[var(--muted)]
            "
          >
            <span className="flex items-center gap-1">
              <Scale size={13} />
              {lot.approximateWeight}{" "}
              {lot.weightUnit || "kg"}
            </span>

            <span className="flex items-center gap-1">
              <MapPin size={13} />
              {lot.location}
            </span>
          </div>

          <div
            className="
              mt-3
              flex
              items-center
              justify-between
              gap-3
            "
          >
            <div>
              {lot.estimatedValue !== null &&
              lot.estimatedValue !== undefined ? (
                <p className="text-sm font-semibold">
                  ₹
                  {Number(
                    lot.estimatedValue
                  ).toLocaleString("en-IN", {
                    maximumFractionDigits: 2,
                  })}
                </p>
              ) : (
                <p className="text-xs text-[var(--muted)]">
                  Value unavailable
                </p>
              )}
            </div>

            <LotStatusBadge
              status={lot.status}
            />
          </div>
        </div>
      </div>
    </button>
  );
};

export default LotCard;