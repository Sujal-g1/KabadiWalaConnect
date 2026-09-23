import {
  ArrowRight,
  CalendarDays,
  MapPin,
  Package,
  Scale,
  IndianRupee,
} from "lucide-react";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import LotStatusBadge from "./LotStatusBadge";

const materialIcons = {
  CRT: "🖥️",
  LCD: "📺",
  PCB: "🔌",
  CABLE: "🔗",
  CABLES: "🔗",
  BATTERY: "🔋",
  MOTOR: "⚙️",
  MIXED_PLASTIC: "♻️",
  "MIXED PLASTIC": "♻️",
};

const LotCard = ({ lot }) => {
  const navigate = useNavigate();

  const icon =
    materialIcons[
      String(lot.material || "").toUpperCase()
    ] || "♻️";

  const createdDate = lot.createdAt
    ? new Date(
        lot.createdAt
      ).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
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
    <motion.button
      type="button"
      whileTap={{ scale: 0.995 }}
      onClick={() =>
        navigate(
          `/collector/lots/${lot.id}`
        )
      }
      className="
        group
        w-full
        overflow-hidden
        rounded-[24px]
        border
        border-[var(--border)]
        bg-[var(--surface)]
        text-left
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:border-[var(--primary)]/25
        hover:shadow-md
      "
    >
      {/* =====================================================
          MAIN ROW
      ===================================================== */}

      <div className="p-4 sm:p-5">
        <div className="flex items-start gap-3">
          {/* MATERIAL ICON */}

          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-[var(--accent)]
              text-xl
              shadow-sm
              sm:h-14
              sm:w-14
              sm:text-2xl
            "
          >
            {icon}
          </div>

          {/* CONTENT */}

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3
                    className="
                      truncate
                      text-sm
                      font-extrabold
                      tracking-tight
                      text-[var(--foreground)]
                      sm:text-base
                    "
                  >
                    {lot.subcategory ||
                      lot.material ||
                      "E-Waste"}
                  </h3>
                </div>

                <p
                  className="
                    mt-1
                    truncate
                    text-[10px]
                    font-medium
                    tracking-wide
                    text-[var(--muted)]
                  "
                >
                  {lot.referenceId ||
                    "No reference ID"}
                </p>
              </div>

              <div
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-[var(--border)]
                  bg-[var(--background)]
                  text-[var(--muted)]
                  transition
                  group-hover:text-[var(--primary)]
                "
              >
                <ArrowRight
                  size={15}
                  className="
                    transition-transform
                    duration-200
                    group-hover:translate-x-0.5
                  "
                />
              </div>
            </div>

            {/* STATUS */}

            <div className="mt-3">
              <LotStatusBadge
                status={lot.status}
              />
            </div>
          </div>
        </div>

        {/* ===================================================
            VALUE
        =================================================== */}

        <div
          className="
            mt-4
            flex
            items-end
            justify-between
            gap-3
            rounded-2xl
            bg-[var(--background)]
            px-3.5
            py-3
          "
        >
          <div className="flex items-center gap-2">
            <div
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-xl
                bg-[var(--accent)]
                text-[var(--primary)]
              "
            >
              <IndianRupee size={15} />
            </div>

            <div>
              <p
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-wider
                  text-[var(--muted)]
                "
              >
                Estimated value
              </p>

              <p
                className="
                  mt-0.5
                  text-base
                  font-extrabold
                  tracking-tight
                  text-[var(--foreground)]
                  sm:text-lg
                "
              >
                {value}
              </p>
            </div>
          </div>

          <span
            className="
              pb-0.5
              text-[10px]
              font-medium
              text-[var(--muted)]
            "
          >
            View lot
          </span>
        </div>
      </div>

      {/* =====================================================
          DETAILS
      ===================================================== */}

      <div
        className="
          grid
          grid-cols-2
          border-t
          border-[var(--border)]
          sm:grid-cols-4
        "
      >
        <MetaItem
          icon={Scale}
          label="Weight"
          value={`${weight} ${
            lot.weightUnit || "kg"
          }`}
        />

        <MetaItem
          icon={Package}
          label="Material"
          value={lot.material || "—"}
        />

        <MetaItem
          icon={MapPin}
          label="Location"
          value={lot.location || "—"}
        />

        <MetaItem
          icon={CalendarDays}
          label="Created"
          value={createdDate}
        />
      </div>
    </motion.button>
  );
};

const MetaItem = ({
  icon: Icon,
  label,
  value,
}) => {
  return (
    <div
      className="
        min-w-0
        border-r
        border-b
        border-[var(--border)]
        px-3.5
        py-3
        last:border-r-0
        sm:border-b-0
        sm:px-4
      "
    >
      <div className="flex items-center gap-2">
        <Icon
          size={13}
          className="
            shrink-0
            text-[var(--muted)]
          "
        />

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
              mt-0.5
              truncate
              text-[11px]
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

export default LotCard;