import {
  CheckCircle2,
  Clock3,
  AlertCircle,
  XCircle,
} from "lucide-react";

const statusConfig = {
  PENDING: {
    label: "Pending Confirmation",
    description:
      "Waiting for recycler confirmation.",
    icon: Clock3,
    className:
      "bg-[var(--warning)]/10 text-[var(--warning)] border-[var(--warning)]/20",
  },

  CONFIRMED: {
    label: "Confirmed",
    description:
      "The recycler has confirmed the handover.",
    icon: CheckCircle2,
    className:
      "bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)]/20",
  },

  DISPUTED: {
    label: "Disputed",
    description:
      "This handover requires attention.",
    icon: AlertCircle,
    className:
      "bg-[var(--danger)]/10 text-[var(--danger)] border-[var(--danger)]/20",
  },

  CANCELLED: {
    label: "Cancelled",
    description:
      "This handover has been cancelled.",
    icon: XCircle,
    className:
      "bg-[var(--danger)]/10 text-[var(--danger)] border-[var(--danger)]/20",
  },
};

const HandoverStatus = ({
  status,
}) => {
  const config =
    statusConfig[status] ||
    statusConfig.PENDING;

  const Icon = config.icon;

  return (
    <section
      className={`
        rounded-2xl
        border
        p-4
        ${config.className}
      `}
    >
      <div className="flex items-center gap-3">
        <Icon size={22} />

        <div>
          <p className="text-sm font-semibold">
            {config.label}
          </p>

          <p className="mt-0.5 text-xs opacity-80">
            {config.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HandoverStatus;