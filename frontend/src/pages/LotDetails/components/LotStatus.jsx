import LotStatusBadge from "../../MyLots/components/LotStatusBadge";

const LotStatus = ({ status }) => {
  return (
    <div
      className="
        rounded-full
        bg-[var(--background)]
        p-0.5
        shadow-sm
        ring-1
        ring-[var(--border)]
      "
    >
      <LotStatusBadge status={status} />
    </div>
  );
};

export default LotStatus;