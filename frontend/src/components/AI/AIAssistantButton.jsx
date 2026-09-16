import {
  Sparkles,
} from "lucide-react";

import {
  motion,
} from "framer-motion";

const AIAssistantButton = ({
  onClick,
}) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{
        scale: 1.05,
      }}
      whileTap={{
        scale: 0.95,
      }}
      className="
        fixed
        bottom-6
        right-5
        z-40

        flex
        items-center
        gap-2

        rounded-full
        bg-[var(--primary)]

        px-4
        py-3

        text-sm
        font-semibold
        text-[var(--primary-foreground)]

        shadow-xl
      "
    >
      <Sparkles size={18} />

      <span>
        SEVA-AI
      </span>
    </motion.button>
  );
};

export default AIAssistantButton;