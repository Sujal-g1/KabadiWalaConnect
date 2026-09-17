import { PackageOpen, Plus } from "lucide-react";

const LotsEmptyState = ({ onCreate }) => {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        rounded-3xl
        border
        border-dashed
        border-[var(--border)]
        bg-[var(--surface)]
        px-6
        py-14
        text-center
      "
    >
      <div
        className="
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-2xl
          bg-[var(--accent)]
          text-[var(--primary)]
        "
      >
        <PackageOpen size={28} />
      </div>

      <h2 className="mt-5 text-lg font-semibold">
        No lots yet
      </h2>

      <p className="mt-2 max-w-xs text-sm text-[var(--muted)]">
        Add your first e-waste lot to start
        getting connected with recyclers.
      </p>

      <button
        type="button"
        onClick={onCreate}
        className="
          mt-6
          inline-flex
          items-center
          gap-2
          rounded-2xl
          bg-[var(--primary)]
          px-5
          py-3
          text-sm
          font-semibold
          text-[var(--primary-foreground)]
        "
      >
        <Plus size={17} />
        Add E-Waste
      </button>
    </div>
  );
};

export default LotsEmptyState;