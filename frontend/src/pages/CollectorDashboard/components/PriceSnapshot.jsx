import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  IndianRupee,
} from "lucide-react";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { priceSnapshot } from "../dashboardData";
import useTranslation from "../../../i18n/useTranslation";

const PriceSnapshot = () => {
  const navigate = useNavigate();
  const {t} = useTranslation();

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-[24px]
        border
        border-[var(--border)]
        bg-[var(--surface)]
        p-5
        shadow-[0_10px_32px_rgba(18,63,45,0.07)]
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:shadow-[0_18px_42px_rgba(18,63,45,0.11)]
        sm:p-6
      "
    >
      {/* ======================================================
          SUBTLE SPARK BORDER
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-[24px]
          p-[1px]
          opacity-60
          transition-opacity
          duration-300
          group-hover:opacity-100
        "
      >
        <div
          className="
            absolute
            inset-0
            rounded-[24px]
            bg-[conic-gradient(from_180deg_at_50%_50%,transparent_0deg,transparent_250deg,rgba(255,255,255,0.9)_285deg,rgba(255,255,255,0.2)_310deg,transparent_340deg)]
          "
        />

        <div
          className="
            absolute
            inset-[1px]
            rounded-[23px]
            bg-[var(--surface)]
          "
        />
      </div>

      {/* ======================================================
          CONTENT
      ====================================================== */}

      <div className="relative z-10">
        {/* ====================================================
            HEADER
        ==================================================== */}

        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p
              className="
                text-base
                font-black
                tracking-tight
                text-[var(--foreground)]
              "
            >
                {t("prices.localPriceBoard")}
            </p>

            <p
              className="
                mt-1
                text-xs
                font-medium
                text-[var(--muted)]
              "
            >
             {t("prices.currentBuyingPrices")}
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/collector/prices")}
            className="
              group/see
              inline-flex
              shrink-0
              items-center
              gap-1.5
              rounded-xl
              border
              border-[var(--border)]
              bg-[var(--surface)]
              px-3
              py-2
              text-[11px]
              font-bold
              text-[var(--primary)]
              shadow-[0_5px_14px_rgba(18,63,45,0.05)]
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:shadow-[0_8px_18px_rgba(18,63,45,0.08)]
            "
          >
            <span> {t("prices.seeAll")}</span>

            <ArrowRight
              size={14}
              strokeWidth={2.3}
              className="
                transition-transform
                duration-300
                group-hover/see:translate-x-1
              "
            />
          </button>
        </div>

        {/* ====================================================
            PRICE LIST
        ==================================================== */}

        <div className="space-y-2">
          {priceSnapshot.map((item, index) => {
            const rising = item.direction === "up";

            return (
              <motion.div
                key={item.material}
                initial={{
                  opacity: 0,
                  x: -5,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                }}
                className="
                  group/row
                  relative
                  flex
                  items-center
                  justify-between
                  rounded-2xl
                  border
                  border-transparent
                  px-2
                  py-3
                  transition-all
                  duration-300
                  hover:-translate-y-[1px]
                  hover:border-[var(--border)]
                  hover:shadow-[0_8px_20px_rgba(18,63,45,0.06)]
                "
              >
                {/* ==================================================
                    SPARK ON HOVER
                ================================================== */}

                <span
                  className="
                    pointer-events-none
                    absolute
                    -left-px
                    top-1/2
                    h-7
                    w-px
                    -translate-y-1/2
                    rounded-full
                    bg-[var(--foreground)]
                    opacity-0
                    blur-[1px]
                    transition-all
                    duration-300
                    group-hover/row:h-10
                    group-hover/row:opacity-35
                  "
                />

                {/* LEFT */}

                <div className="flex min-w-0 items-center gap-3">
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-[var(--border)]
                      bg-[var(--surface)]
                      text-[var(--primary)]
                      shadow-[0_6px_16px_rgba(18,63,45,0.06)]
                      transition-all
                      duration-300
                      group-hover/row:scale-105
                      group-hover/row:shadow-[0_9px_20px_rgba(18,63,45,0.10)]
                    "
                  >
                    <IndianRupee
                      size={16}
                      strokeWidth={2.2}
                    />
                  </div>

                  <div className="min-w-0">
                    <p
                      className="
                        truncate
                        text-sm
                        font-bold
                        text-[var(--foreground)]
                      "
                    >
                      {item.material}
                    </p>

                    <p
                      className="
                        mt-0.5
                        text-[10px]
                        font-medium
                        text-[var(--muted)]
                      "
                    >
                      per {item.unit}
                    </p>
                  </div>
                </div>

                {/* RIGHT */}

                <div className="ml-3 shrink-0 text-right">
                  <p
                    className="
                      text-sm
                      font-black
                      tracking-tight
                      text-[var(--foreground)]
                    "
                  >
                    {item.price}
                  </p>

                  <p
                    className={`
                      mt-0.5
                      flex
                      items-center
                      justify-end
                      gap-0.5
                      text-[10px]
                      font-bold

                      ${
                        rising
                          ? "text-[var(--primary)]"
                          : "text-[var(--danger)]"
                      }
                    `}
                  >
                    {rising ? (
                      <ArrowUpRight
                        size={11}
                        strokeWidth={2.5}
                      />
                    ) : (
                      <ArrowDownRight
                        size={11}
                        strokeWidth={2.5}
                      />
                    )}

                    {item.trend}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ======================================================
          OUTER SPARK
      ====================================================== */}

      <motion.div
        initial={{ x: "-120%" }}
        whileHover={{ x: "120%" }}
        transition={{
          duration: 0.9,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          -inset-y-10
          left-0
          z-20
          w-20
          rotate-[20deg]
          bg-gradient-to-r
          from-transparent
          via-white/40
          to-transparent
          blur-md
        "
      />
    </motion.section>
  );
};

export default PriceSnapshot;