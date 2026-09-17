import {
  Sparkles,
} from "lucide-react";

import {
  motion,
} from "framer-motion";

import {
  useNavigate,
} from "react-router-dom";

const AIAssistantButton = () => {

  const navigate = useNavigate();

  return (
    <motion.button
      type="button"
      onClick={() => {
        console.log("SEVA AI clicked");
        navigate("/seva-ai");
      }}
      whileHover={{
        scale: 1.05,
      }}
      whileTap={{
        scale: 0.95,
      }}
      className="
        flex
        h-10
        items-center
        gap-2
        rounded-xl
        border
        border-[var(--border)]
        bg-[var(--surface)]
        px-3
        text-[var(--primary)]
        transition

        hover:bg-[var(--accent)]
        active:scale-95
      "
    >
      <Sparkles size={18} />

      <span className="text-sm font-semibold">
        SEVA-AI
      </span>
    </motion.button>
  );
};

export default AIAssistantButton;