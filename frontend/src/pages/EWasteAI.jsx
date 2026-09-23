import { useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const E_WASTE_AI_URL ="https://mayanksharma2006.github.io/E-Waste-AI/";

const EWasteAI = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[var(--background)]">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-[var(--border)] bg-[var(--surface)] px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] text-[var(--foreground)] transition hover:bg-[var(--accent)]"
          >
            <ArrowLeft size={18} />
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--accent)] text-[var(--primary)]">
                <Sparkles size={17} />
              </div>

              <h1 className="truncate text-sm font-bold text-[var(--foreground)] sm:text-base">
                E-Waste AI
              </h1>
            </div>

            <p className="hidden text-xs text-[var(--muted)] sm:block">
              Analyze PCB & electronic waste
            </p>
          </div>
        </div>

        <a
          href={E_WASTE_AI_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-9 shrink-0 items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface-soft)] px-3 text-xs font-semibold text-[var(--foreground)] transition hover:bg-[var(--accent)]"
        >
          <ExternalLink size={15} />
          <span className="hidden sm:inline">
            Open separately
          </span>
        </a>
      </div>

      {/* AI App */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="h-[calc(100vh-8rem)] w-full overflow-hidden bg-[var(--surface-soft)] p-2 sm:p-4"
      >
        <div className="h-full w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-sm">
          <iframe
            src={E_WASTE_AI_URL}
            title="E-Waste AI Analyzer"
            className="h-full w-full border-0"
            allow="camera"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default EWasteAI;