import {
  CalendarDays,
  CircleAlert,
  FileText,
  MapPin,
  Scale,
} from "lucide-react";

import { motion } from "framer-motion";

const LotInfo = ({ lot }) => {
  const createdDate =
    lot.createdAt
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
    <motion.section
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-[var(--border)]
        bg-[linear-gradient(135deg,var(--surface)_0%,var(--surface)_72%,var(--accent)_150%)]
        p-5
        shadow-[0_14px_38px_rgba(18,63,45,0.07)]
        sm:p-6
      "
    >
      {/* TOP ACCENT */}

      <div
        className="
          absolute
          left-0
          right-0
          top-0
          h-1
          bg-gradient-to-r
          from-[var(--primary)]
          via-[var(--teal)]
          to-[var(--jade)]
        "
      />

      {/* HEADER */}

      <div className="flex items-center gap-3">
        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-2xl
            bg-[var(--accent)]
            text-[var(--primary)]
            shadow-sm
          "
        >
          <FileText
            size={17}
          />
        </div>

        <div>
          <h2 className="text-sm font-extrabold">
            Lot information
          </h2>

          <p
            className="
              mt-0.5
              text-[11px]
              text-[var(--muted)]
            "
          >
            Collection details
          </p>
        </div>
      </div>

      {/* INFORMATION GRID */}

      <div
        className="
          mt-5
          grid
          grid-cols-2
          gap-2.5
        "
      >
        <InfoTile
          icon={Scale}
          label="Approx. weight"
          value={`${lot.approximateWeight} ${
            lot.weightUnit ||
            "kg"
          }`}
        />

        <InfoTile
          icon={CircleAlert}
          label="Condition"
          value={
            lot.condition ||
            "Not specified"
          }
        />

        <InfoTile
          icon={MapPin}
          label="Location"
          value={
            lot.location ||
            "Not specified"
          }
        />

        <InfoTile
          icon={CalendarDays}
          label="Created"
          value={createdDate}
        />
      </div>

      {/* DESCRIPTION */}

      {lot.description && (
        <div
          className="
            mt-3
            rounded-2xl
            border
            border-[var(--border)]
            bg-[var(--background)]
            p-3.5
          "
        >
          <p
            className="
              text-[9px]
              font-bold
              uppercase
              tracking-wider
              text-[var(--muted)]
            "
          >
            Description
          </p>

          <p
            className="
              mt-2
              text-sm
              leading-6
              text-[var(--foreground)]
            "
          >
            {lot.description}
          </p>
        </div>
      )}
    </motion.section>
  );
};

const InfoTile = ({
  icon: Icon,
  label,
  value,
}) => {
  return (
    <div
      className="
        min-w-0
        rounded-2xl
        border
        border-[var(--border)]
        bg-[var(--background)]
        px-3
        py-3
        shadow-sm
      "
    >
      <div className="flex items-start gap-2.5">
        <div
          className="
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-[var(--surface-soft)]
            text-[var(--muted)]
          "
        >
          <Icon size={14} />
        </div>

        <div className="min-w-0">
          <p
            className="
              text-[9px]
              font-semibold
              uppercase
              tracking-wider
              text-[var(--muted)]
            "
          >
            {label}
          </p>

          <p
            className="
              mt-1
              truncate
              text-xs
              font-bold
              text-[var(--foreground)]
            "
          >
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LotInfo;