import LotStatusBadge from "../../MyLots/components/LotStatusBadge";

const LotStatus = ({ status }) => {
  return (
    <div className="flex items-center">
      <LotStatusBadge status={status} />
    </div>
  );
};

export default LotStatus;