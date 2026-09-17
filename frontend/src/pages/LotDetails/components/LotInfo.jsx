import {
  CalendarDays,
  CircleAlert,
  Scale,
} from "lucide-react";

const LotInfo = ({ lot }) => {
  const createdDate = lot.createdAt
    ? new Date(
        lot.createdAt
      ).toLocaleDateString(
        "en-IN",
        {
          day: "numeric",
          month: "short",
          year: "numeric",
        }
      )
    : "—";

  return (
    <section
      className="
        rounded-3xl
        border
        border-[var(--border)]
        bg-[var(--surface)]
        p-5
      "
    >
      <h2 className="font-semibold">
        Lot Information
      </h2>

      <div className="mt-5 space-y-4">

        <div className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-2 text-sm text-[var(--muted)]">
            <Scale size={16} />
            Approx. weight
          </span>

          <span className="text-sm font-semibold">
            {lot.approximateWeight}{" "}
            {lot.weightUnit || "kg"}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-2 text-sm text-[var(--muted)]">
            <CircleAlert size={16} />
            Condition
          </span>

          <span className="text-sm font-semibold">
            {lot.condition || "—"}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-2 text-sm text-[var(--muted)]">
            <CalendarDays size={16} />
            Created
          </span>

          <span className="text-sm font-semibold">
            {createdDate}
          </span>
        </div>

      </div>

      {lot.description && (
        <div className="mt-5 border-t border-[var(--border)] pt-5">
          <p className="text-sm text-[var(--muted)]">
            Description
          </p>

          <p className="mt-1 text-sm">
            {lot.description}
          </p>
        </div>
      )}
    </section>
  );
};

export default LotInfo;