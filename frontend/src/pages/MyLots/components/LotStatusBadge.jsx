import {
  CheckCircle2,
  Clock3,
  Handshake,
  PackageCheck,
  Truck,
} from "lucide-react";

const statusConfig = {
  CREATED: {
    label: "Draft",
    icon: Clock3,
    className:
      "bg-[var(--surface-soft)] text-[var(--muted)]",
  },

  AVAILABLE: {
    label: "Available",
    icon: CheckCircle2,
    className:
      "bg-[var(--accent)] text-[var(--primary)]",
  },

  OFFER_RECEIVED: {
    label: "Offer received",
    icon: Handshake,
    className:
      "bg-[var(--warning)]/10 text-[var(--warning)]",
  },

  PICKUP_SCHEDULED: {
    label: "Pickup scheduled",
    icon: Truck,
    className:
      "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },

  PICKED_UP: {
    label: "Picked up",
    icon: PackageCheck,
    className:
      "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },

  HANDED_OVER: {
    label: "Handed over",
    icon: Handshake,
    className:
      "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  },

  COMPLETED: {
    label: "Completed",
    icon: CheckCircle2,
    className:
      "bg-[var(--success)]/10 text-[var(--success)]",
  },

  CANCELLED: {
    label: "Cancelled",
    icon: Clock3,
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
        inline-flex items-center gap-1.5
        rounded-full px-2.5 py-1.5
        text-[10px] font-semibold
        ${config.className}
      `}
    >
      <Icon size={12} strokeWidth={2.2} />

      {config.label}
    </span>
  );
};

export default LotStatusBadge;