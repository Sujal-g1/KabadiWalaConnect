import {
  ArrowRight,
  PackageOpen,
  Plus,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const LotsEmptyState = () => {
  const navigate = useNavigate();

  return (
    <div
      className="
        flex min-h-[420px] flex-col
        items-center justify-center
        rounded-2xl border border-dashed
        border-[var(--border)]
        bg-[var(--surface)]
        px-6 py-12 text-center
      "
    >
      <div
        className="
          flex h-16 w-16 items-center
          justify-center rounded-2xl
          bg-[var(--accent)]
          text-[var(--primary)]
        "
      >
        <PackageOpen size={28} />
      </div>

      <h2 className="mt-5 text-lg font-bold text-[var(--foreground)]">
        No lots yet
      </h2>

      <p className="mt-2 max-w-sm text-sm leading-6 text-[var(--muted)]">
        Start by photographing your collected
        e-waste and create your first digital lot.
      </p>

      <button
        onClick={() =>
          navigate("/collector/lots/create")
        }
        className="
          mt-6 inline-flex items-center gap-2
          rounded-xl bg-[var(--primary)]
          px-5 py-3
          text-sm font-semibold
          text-[var(--primary-foreground)]
          transition
          hover:opacity-90
          active:scale-[0.98]
        "
      >
        <Plus size={17} />

        Create your first lot

        <ArrowRight size={15} />
      </button>
    </div>
  );
};

export default LotsEmptyState;