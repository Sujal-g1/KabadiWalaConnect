import {
  CalendarDays,
  CircleAlert,
  FileText,
  MapPin,
  Scale,
} from "lucide-react";

const LotInfo = ({ lot }) => {
  const createdDate = lot.createdAt
    ? new Date(
        lot.createdAt
      ).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "—";

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
      <div className="flex items-center gap-2">
        <div
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-xl
            bg-[var(--accent)]
            text-[var(--primary)]
          "
        >
          <FileText size={17} />
        </div>

        <div>
          <h2 className="text-sm font-semibold">
            Lot Information
          </h2>

          <p className="text-xs text-[var(--muted)]">
            Collection details
          </p>
        </div>
      </div>

      <div className="mt-5 divide-y divide-[var(--border)]">

        <InfoRow
          icon={Scale}
          label="Approx. weight"
          value={`${lot.approximateWeight} ${
            lot.weightUnit || "kg"
          }`}
        />

        <InfoRow
          icon={CircleAlert}
          label="Condition"
          value={lot.condition || "Not specified"}
        />

        <InfoRow
          icon={MapPin}
          label="Location"
          value={lot.location || "Not specified"}
        />

        <InfoRow
          icon={CalendarDays}
          label="Created"
          value={createdDate}
        />

      </div>

      {lot.description && (
        <div className="mt-5 border-t border-[var(--border)] pt-5">

          <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
            Description
          </p>

          <p className="mt-2 text-sm leading-6">
            {lot.description}
          </p>

        </div>
      )}
    </section>
  );
};

const InfoRow = ({
  icon: Icon,
  label,
  value,
}) => {
  return (
    <div className="flex items-center justify-between gap-5 py-4">

      <div className="flex min-w-0 items-center gap-3">
        <Icon
          size={17}
          className="shrink-0 text-[var(--muted)]"
        />

        <span className="text-sm text-[var(--muted)]">
          {label}
        </span>
      </div>

      <span className="max-w-[55%] text-right text-sm font-semibold">
        {value}
      </span>

    </div>
  );
};

export default LotInfo;