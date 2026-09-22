import { motion } from "framer-motion";
import { ScanSearch } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EWasteAIButton = () => {
  const navigate = useNavigate();

  return (
    <motion.button
      type="button"
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => navigate("/e-waste-ai")}
      className="flex h-10 items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-sm font-semibold text-[var(--foreground)] shadow-sm transition hover:border-[var(--primary)] hover:bg-[var(--accent)]"
      title="E-Waste AI"
    >
      <ScanSearch
        size={17}
        className="text-[var(--primary)]"
      />

      <span className="hidden sm:inline">
        VidyutView
      </span>
    </motion.button>
  );
};

export default EWasteAIButton;