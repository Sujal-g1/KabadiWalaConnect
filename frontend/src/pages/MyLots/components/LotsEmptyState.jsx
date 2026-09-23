import {
  ArrowRight,
  ImagePlus,
  PackageOpen,
  Plus,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const LotsEmptyState = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 12,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-[var(--border)]
        bg-[var(--surface)]
        px-5
        py-12
        text-center
        shadow-sm
        sm:px-8
        sm:py-16
      "
    >
      {/* BACKGROUND */}

      <div
        className="
          pointer-events-none
          absolute
          -right-16
          -top-16
          h-40
          w-40
          rounded-full
          bg-[var(--accent)]
          opacity-70
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-20
          -left-10
          h-36
          w-36
          rounded-full
          bg-[var(--accent)]
          opacity-30
          blur-3xl
        "
      />

      <div className="relative">
        {/* ICON */}

        <motion.div
          initial={{
            scale: 0.8,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
          className="
            mx-auto
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-[24px]
            bg-[var(--accent)]
            text-[var(--primary)]
            shadow-sm
          "
        >
          <PackageOpen
            size={32}
            strokeWidth={1.8}
          />
        </motion.div>

        {/* TITLE */}

        <div className="mt-6 flex items-center justify-center gap-2">
          <h2
            className="
              text-lg
              font-extrabold
              tracking-tight
              text-[var(--foreground)]
              sm:text-xl
            "
          >
            No lots yet
          </h2>

          <Sparkles
            size={15}
            className="text-[var(--primary)]"
          />
        </div>

        {/* DESCRIPTION */}

        <p
          className="
            mx-auto
            mt-2
            max-w-sm
            text-sm
            leading-6
            text-[var(--muted)]
          "
        >
          Start by photographing your collected
          e-waste and create your first digital lot.
        </p>

        {/* CREATE */}

        <motion.button
          type="button"
          whileTap={{
            scale: 0.97,
          }}
          onClick={() =>
            navigate(
              "/collector/lots/create"
            )
          }
          className="
            mx-auto
            mt-7
            flex
            min-h-12
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-[var(--primary)]
            px-5
            py-3
            text-sm
            font-bold
            text-[var(--primary-foreground)]
            shadow-lg
            shadow-black/10
            transition
            hover:opacity-95
          "
        >
          <Plus size={17} />

          Create your first lot

          <ArrowRight size={15} />
        </motion.button>

        {/* QUICK HINT */}

        <div
          className="
            mx-auto
            mt-6
            flex
            max-w-xs
            items-center
            justify-center
            gap-2
            text-[10px]
            text-[var(--muted)]
          "
        >
          <ImagePlus
            size={13}
            className="shrink-0"
          />

          Add photos to begin
        </div>
      </div>
    </motion.div>
  );
};

export default LotsEmptyState;