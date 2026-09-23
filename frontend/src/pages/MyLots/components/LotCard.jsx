import {
  ArrowRight,
  CalendarDays,
  MapPin,
  Package,
  Scale,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import LotStatusBadge from "./LotStatusBadge";

const materialIcons = {
  CRT: "🖥️",
  LCD: "📺",
  PCB: "🔌",
  CABLE: "🔗",
  BATTERY: "🔋",
  MOTOR: "⚙️",
  MIXED_PLASTIC: "♻️",
};

const LotCard = ({ lot }) => {
  const navigate = useNavigate();

  const icon =
    materialIcons[lot.material] || "♻️";

  const createdDate = lot.createdAt
    ? new Date(lot.createdAt).toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      )
    : "—";

  const weight = Number(
    lot.approximateWeight || 0
  ).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  });

  const value =
    lot.estimatedValue !== null &&
    lot.estimatedValue !== undefined
      ? `₹${Number(
          lot.estimatedValue
        ).toLocaleString("en-IN")}`
      : "—";

  return (
    <button
      onClick={() =>
        navigate(
          `/collector/lots/${lot.id}`
        )
      }
      className="
        group w-full overflow-hidden
        rounded-2xl border border-[var(--border)]
        bg-[var(--surface)]
        text-left
        transition duration-200
        hover:border-[var(--primary)]/30
        hover:shadow-sm
        active:scale-[0.995]
      "
    >
      {/* Top */}
      <div className="flex items-start gap-3 p-4 sm:p-5">
        {/* Material */}
        <div
          className="
            flex h-12 w-12 shrink-0 items-center
            justify-center rounded-2xl
            bg-[var(--accent)]
            text-xl
          "
        >
          {icon}
        </div>

        {/* Main */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-[var(--foreground)] sm:text-base">
                {lot.subcategory ||
                  lot.material ||
                  "E-waste"}
              </p>

              <p className="mt-0.5 truncate text-[10px] font-medium tracking-wide text-[var(--muted)]">
                {lot.referenceId}
              </p>
            </div>

            <ArrowRight
              size={17}
              className="
                shrink-0 text-[var(--muted)]
                transition-transform duration-200
                group-hover:translate-x-1
              "
            />
          </div>

          <div className="mt-3">
            <LotStatusBadge
              status={lot.status}
            />
          </div>
        </div>
      </div>

      {/* Details */}
      <div
        className="
          grid grid-cols-2 gap-3
          border-t border-[var(--border)]
          bg-[var(--surface-soft)]/50
          px-4 py-3.5
          sm:grid-cols-4
          sm:px-5
        "
      >
        <div className="flex items-center gap-2">
          <Scale
            size={14}
            className="text-[var(--muted)]"
          />

          <div>
            <p className="text-[9px] uppercase tracking-wide text-[var(--muted-foreground)]">
              Weight
            </p>

            <p className="text-xs font-semibold text-[var(--foreground)]">
              {weight} {lot.weightUnit || "kg"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Package
            size={14}
            className="text-[var(--muted)]"
          />

          <div>
            <p className="text-[9px] uppercase tracking-wide text-[var(--muted-foreground)]">
              Material
            </p>

            <p className="truncate text-xs font-semibold text-[var(--foreground)]">
              {lot.material || "—"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <MapPin
            size={14}
            className="text-[var(--muted)]"
          />

          <div className="min-w-0">
            <p className="text-[9px] uppercase tracking-wide text-[var(--muted-foreground)]">
              Location
            </p>

            <p className="truncate text-xs font-semibold text-[var(--foreground)]">
              {lot.location || "—"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <CalendarDays
            size={14}
            className="text-[var(--muted)]"
          />

          <div>
            <p className="text-[9px] uppercase tracking-wide text-[var(--muted-foreground)]">
              Created
            </p>

            <p className="text-xs font-semibold text-[var(--foreground)]">
              {createdDate}
            </p>
          </div>
        </div>
      </div>

      {/* Value */}
      <div className="flex items-center justify-between border-t border-[var(--border)] px-4 py-3.5 sm:px-5">
        <span className="text-xs text-[var(--muted)]">
          Estimated value
        </span>

        <span className="text-base font-bold text-[var(--foreground)]">
          {value}
        </span>
      </div>
    </button>
  );
};

export default LotCard;