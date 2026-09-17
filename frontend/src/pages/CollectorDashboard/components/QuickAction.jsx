import {
  ArrowRight,
  Camera,
  Plus,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const QuickAction = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() =>
        navigate("/collector/lots/create")
      }
      className="
        group relative w-full overflow-hidden
        rounded-2xl bg-[var(--primary)]
        p-5 text-left text-[var(--primary-foreground)]
        transition duration-200
        hover:-translate-y-0.5
        active:scale-[0.99]
        sm:p-6
      "
    >
      <div className="relative z-10">
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
          <Camera size={20} />
        </div>

        <p className="text-lg font-bold">
          Add new e-waste
        </p>

        <p className="mt-1 max-w-[260px] text-sm opacity-75">
          Photograph your material and create a new lot.
        </p>

        <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">
          <span>Create Lot</span>

          <ArrowRight
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </div>
      </div>

      <Plus
        size={170}
        strokeWidth={0.7}
        className="
          absolute -bottom-14 -right-10
          rotate-12 opacity-[0.07]
        "
      />
    </button>
  );
};

export default QuickAction;