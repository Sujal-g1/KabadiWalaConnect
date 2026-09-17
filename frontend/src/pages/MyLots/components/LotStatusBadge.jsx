import {
  CheckCircle2,
  Clock3,
  PackageCheck,
  Truck,
  XCircle,
} from "lucide-react";

const statusConfig = {
  CREATED: {
    label: "Draft",
    icon: Clock3,
    className:
      "bg-[var(--warning)]/10 text-[var(--warning)]",
  },

  AVAILABLE: {
    label: "Available",
    icon: CheckCircle2,
    className:
      "bg-[var(--success)]/10 text-[var(--success)]",
  },

  OFFER_RECEIVED: {
    label: "Offer Received",
    icon: PackageCheck,
    className:
      "bg-[var(--accent)] text-[var(--primary)]",
  },

  PICKUP_SCHEDULED: {
    label: "Pickup Scheduled",
    icon: Truck,
    className:
      "bg-[var(--accent)] text-[var(--primary)]",
  },

  PICKED_UP: {
    label: "Picked Up",
    icon: Truck,
    className:
      "bg-[var(--accent)] text-[var(--primary)]",
  },

  HANDED_OVER: {
    label: "Handed Over",
    icon: PackageCheck,
    className:
      "bg-[var(--accent)] text-[var(--primary)]",
  },

  COMPLETED: {
    label: "Completed",
    icon: CheckCircle2,
    className:
      "bg-[var(--success)]/10 text-[var(--success)]",
  },

  CANCELLED: {
    label: "Cancelled",
    icon: XCircle,
    className:
      "bg-[var(--danger)]/10 text-[var(--danger)]",
  },
};

const LotStatusBadge = ({ status }) => {
  const config =
    statusConfig[status] ||
    statusConfig.CREATED;

  const Icon = config.icon;

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-1.5
        rounded-full
        px-2.5
        py-1
        text-xs
        font-semibold
        ${config.className}
      `}
    >
      <Icon size={13} />
      {config.label}
    </span>
  );
};

export default LotStatusBadge;