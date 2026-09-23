import {
  Check,
  Copy,
  MapPin,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";

import LotStatus from "./LotStatus";

const LotHeader = ({ lot }) => {
  const copyReference = async () => {
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
    <motion.section
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
        rounded-[30px]
        border
        border-[var(--border)]
        bg-[linear-gradient(135deg,var(--surface)_0%,var(--surface)_58%,var(--accent)_145%)]
        p-5
        shadow-[0_16px_45px_rgba(18,63,45,0.09)]
        sm:p-6
      "
    >
      {/* AMBIENT GRADIENT */}

      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-52
          w-52
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
          bottom-0
          left-0
          h-1
          w-32
          bg-gradient-to-r
          from-[var(--primary)]
          to-[var(--teal)]
        "
      />

      <div className="relative">
        {/* TOP */}

        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.16em]
                  text-[var(--primary)]
                "
              >
                E-Waste Lot
              </p>

              <Sparkles
                size={12}
                className="text-[var(--primary)]"
              />
            </div>

            <h1
              className="
                mt-2
                text-2xl
                font-extrabold
                tracking-tight
                text-[var(--foreground)]
                sm:text-3xl
              "
            >
              {lot.subcategory ||
                lot.material ||
                "E-Waste"}
            </h1>

            {lot.subcategory && (
              <p
                className="
                  mt-1
                  text-sm
                  text-[var(--muted)]
                "
              >
                {lot.material}
              </p>
            )}
          </div>

          <div className="shrink-0">
            <LotStatus
              status={lot.status}
            />
          </div>
        </div>

        {/* META PILLS */}

        <div
          className="
            mt-6
            flex
            flex-wrap
            gap-2
          "
        >
          <button
            type="button"
            onClick={copyReference}
            className="
              inline-flex
              min-h-9
              max-w-full
              items-center
              gap-2
              rounded-xl
              border
              border-[var(--border)]
              bg-[var(--background)]
              px-3
              text-xs
              font-semibold
              text-[var(--foreground)]
              shadow-sm
              transition
              hover:border-[var(--primary)]/30
              active:scale-[0.98]
            "
          >
            <span className="truncate">
              {lot.referenceId}
            </span>

            <Copy
              size={13}
              className="
                shrink-0
                text-[var(--muted)]
              "
            />
          </button>

          {lot.location && (
            <div
              className="
                inline-flex
                min-h-9
                max-w-full
                items-center
                gap-2
                rounded-xl
                border
                border-[var(--border)]
                bg-[var(--background)]
                px-3
                text-xs
                font-semibold
                shadow-sm
              "
            >
              <MapPin
                size={13}
                className="
                  shrink-0
                  text-[var(--primary)]
                "
              />

              <span className="truncate">
                {lot.location}
              </span>
            </div>
          )}
        </div>

        {/* AVAILABLE MESSAGE */}

        {lot.status ===
          "AVAILABLE" && (
          <motion.div
            initial={{
              opacity: 0,
              y: 6,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="
              mt-5
              overflow-hidden
              rounded-2xl
              border
              border-[var(--primary)]/15
              bg-[var(--accent)]/75
              p-3.5
              shadow-sm
            "
          >
            <div className="flex items-start gap-3">
              <div
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-[var(--primary)]
                  text-[var(--primary-foreground)]
                  shadow-sm
                "
              >
                <Check
                  size={15}
                  strokeWidth={2.8}
                />
              </div>

              <div>
                <p className="text-sm font-bold">
                  Lot is ready
                </p>

                <p
                  className="
                    mt-0.5
                    text-xs
                    leading-5
                    text-[var(--muted)]
                  "
                >
                  This lot is available for
                  handover and recycler matching.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default LotHeader;