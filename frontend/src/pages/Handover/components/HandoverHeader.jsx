import {
  ArrowLeft,
  CheckCircle2,
  Copy,
  Handshake,
  MapPin,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";

const HandoverHeader = ({
  lot,
  onBack,
}) => {
  const copyReference = async () => {
    if (!lot?.referenceId) return;

    try {
      await navigator.clipboard.writeText(
        lot.referenceId
      );
    } catch (error) {
      console.error(
        "Failed to copy reference:",
        error
      );
    }
  };

  return (
    <motion.header
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="
        relative
        overflow-hidden
        rounded-[30px]
        border
        border-white/10
        bg-[linear-gradient(135deg,#06150F_0%,#0A271A_38%,#10583A_72%,#147B55_100%)]
        p-5
        text-white
        shadow-[0_20px_55px_rgba(18,63,45,0.22)]
        sm:p-6
      "
    >
      {/* Ambient glow */}

      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-56
          w-56
          rounded-full
          bg-[#4CD094]/15
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-20
          -left-12
          h-40
          w-40
          rounded-full
          bg-[#1F9B6D]/15
          blur-3xl
        "
      />

      <div className="relative">
        {/* Back */}

        <button
          type="button"
          onClick={onBack}
          className="
            mb-6
            inline-flex
            min-h-9
            items-center
            gap-2
            rounded-xl
            border
            border-white/10
            bg-white/5
            px-3
            text-xs
            font-semibold
            text-white/70
            backdrop-blur-md
            transition
            hover:bg-white/10
            hover:text-white
            active:scale-[0.98]
          "
        >
          <ArrowLeft size={15} />
          Back to Lot
        </button>

        {/* Main */}

        <div className="flex items-start gap-3">
          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-2xl
              border
              border-white/10
              bg-white/10
              text-white
              shadow-lg
              backdrop-blur-md
            "
          >
            <Handshake
              size={23}
              strokeWidth={2}
            />
          </div>

          <div className="min-w-0">
            <div
              className="
                flex
                items-center
                gap-2
                text-[10px]
                font-bold
                uppercase
                tracking-[0.16em]
                text-white/50
              "
            >
              Transfer

              <Sparkles size={12} />
            </div>

            <h1
              className="
                mt-1
                text-2xl
                font-extrabold
                tracking-tight
                sm:text-3xl
              "
            >
              Record Handover
            </h1>

            <p
              className="
                mt-2
                max-w-xl
                text-xs
                leading-5
                text-white/55
                sm:text-sm
              "
            >
              Record the actual transfer, evidence,
              location and final agreed value of this lot.
            </p>
          </div>
        </div>

        {/* Lot context */}

        {lot && (
          <div
            className="
              mt-6
              rounded-2xl
              border
              border-white/10
              bg-black/10
              p-3.5
              backdrop-blur-sm
            "
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    text-white/40
                  "
                >
                  Lot Reference
                </p>

                <button
                  type="button"
                  onClick={copyReference}
                  className="
                    mt-1
                    flex
                    max-w-full
                    items-center
                    gap-2
                    text-sm
                    font-bold
                    text-white
                    transition
                    hover:text-emerald-200
                  "
                >
                  <span className="truncate">
                    {lot.referenceId}
                  </span>

                  <Copy
                    size={13}
                    className="shrink-0 text-white/45"
                  />
                </button>
              </div>

              {lot.status === "AVAILABLE" && (
                <div
                  className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-white/10
                    text-emerald-200
                  "
                >
                  <CheckCircle2 size={16} />
                </div>
              )}
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <span
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-full
                  bg-white/10
                  px-2.5
                  py-1.5
                  text-[10px]
                  font-semibold
                  text-white/75
                "
              >
                {lot.material}
                {lot.subcategory &&
                  ` · ${lot.subcategory}`}
              </span>

              {lot.location && (
                <span
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-full
                    bg-white/10
                    px-2.5
                    py-1.5
                    text-[10px]
                    font-semibold
                    text-white/75
                  "
                >
                  <MapPin size={11} />
                  {lot.location}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.header>
  );
};

export default HandoverHeader;