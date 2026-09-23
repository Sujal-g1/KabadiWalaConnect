import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

const statusConfig = {
  PENDING: {
    label: "Pending Confirmation",
    description:
      "Waiting for recycler confirmation.",
    icon: Clock3,
    className:
      "border-[var(--warning)]/20 bg-[linear-gradient(135deg,var(--surface)_0%,var(--warning)_180%)] text-[var(--warning)]",
  },

  CONFIRMED: {
    label: "Confirmed",
    description:
      "The recycler has confirmed the handover.",
    icon: CheckCircle2,
    className:
      "border-[var(--success)]/20 bg-[linear-gradient(135deg,var(--surface)_0%,var(--success)_180%)] text-[var(--success)]",
  },

  DISPUTED: {
    label: "Disputed",
    description:
      "This handover requires attention.",
    icon: AlertCircle,
    className:
      "border-[var(--danger)]/20 bg-[linear-gradient(135deg,var(--surface)_0%,var(--danger)_180%)] text-[var(--danger)]",
  },

  CANCELLED: {
    label: "Cancelled",
    description:
      "This handover has been cancelled.",
    icon: XCircle,
    className:
      "border-[var(--danger)]/20 bg-[linear-gradient(135deg,var(--surface)_0%,var(--danger)_180%)] text-[var(--danger)]",
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
        rounded-[26px]
        border
        p-4
        shadow-[0_10px_28px_rgba(0,0,0,0.05)]
        ${config.className}
      `}
    >
      <div className="flex items-center gap-3">
        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-2xl
            bg-current/10
          "
        >
          <Icon size={19} />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-extrabold">
            {config.label}
          </p>

          <p
            className="
              mt-0.5
              text-[11px]
              leading-4
              opacity-75
            "
          >
            {config.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HandoverStatus;