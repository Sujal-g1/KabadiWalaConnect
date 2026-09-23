import {
  CheckCircle2,
  Clock3,
  Handshake,
  PackageCheck,
  Truck,
  XCircle,
} from "lucide-react";

const statusConfig = {
  CREATED: {
    label: "Draft",
    icon: Clock3,
    className:
      "bg-[var(--background)] text-[var(--muted)] border-[var(--border)]",
  },

  AVAILABLE: {
    label: "Available",
    icon: CheckCircle2,
    className:
      "bg-[var(--accent)] text-[var(--primary)] border-[var(--primary)]/15",
  },

  OFFER_RECEIVED: {
    label: "Offer received",
    icon: Handshake,
    className:
      "bg-[var(--warning)]/10 text-[var(--warning)] border-[var(--warning)]/15",
  },

  PICKUP_SCHEDULED: {
    label: "Pickup scheduled",
    icon: Truck,
    className:
      "bg-blue-500/10 text-blue-600 border-blue-500/15 dark:text-blue-400",
  },

  PICKED_UP: {
    label: "Picked up",
    icon: PackageCheck,
    className:
      "bg-blue-500/10 text-blue-600 border-blue-500/15 dark:text-blue-400",
  },

  HANDED_OVER: {
    label: "Handed over",
    icon: Handshake,
    className:
      "bg-purple-500/10 text-purple-600 border-purple-500/15 dark:text-purple-400",
  },

  COMPLETED: {
    label: "Completed",
    icon: CheckCircle2,
    className:
      "bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)]/15",
  },

  CANCELLED: {
    label: "Cancelled",
    icon: XCircle,
    className:
      "bg-[var(--danger)]/10 text-[var(--danger)] border-[var(--danger)]/15",
  },
};

const LotStatusBadge = ({
  status,
}) => {
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
        border
        px-2.5
        py-1.5
        text-[10px]
        font-bold
        ${config.className}
      `}
    >
      <Icon
        size={11}
        strokeWidth={2.4}
      />

      {config.label}
    </span>
  );
};

export default LotStatusBadge;