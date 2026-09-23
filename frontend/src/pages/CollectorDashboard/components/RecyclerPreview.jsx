import {
  ArrowRight,
  MapPin,
  ShieldCheck,
} from "lucide-react";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { recyclers } from "../dashboardData";

const RecyclerPreview = () => {
  const navigate = useNavigate();

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
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
          SPARK BORDER
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-[24px]
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
            bg-[conic-gradient(from_180deg_at_50%_50%,transparent_0deg,transparent_250deg,rgba(255,255,255,0.9)_285deg,rgba(255,255,255,0.25)_310deg,transparent_340deg)]
          "
        />

        <div
          className="
            absolute
            inset-px
            rounded-[23px]
            bg-[var(--surface)]
          "
        />
      </div>

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
              Nearby recyclers
            </p>

            <p
              className="
                mt-1
                text-xs
                font-medium
                text-[var(--muted)]
              "
            >
              Verified buyers near you
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/collector/recyclers")}
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
            <span>See all</span>

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
            RECYCLERS
        ==================================================== */}

        <div className="space-y-2.5">
          {recyclers.map((recycler, index) => (
            <motion.div
              key={recycler.id}
              initial={{
                opacity: 0,
                x: -6,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.3,
                delay: index * 0.06,
              }}
              className="
                group/recycler
                relative
                overflow-hidden
                rounded-2xl
                border
                border-[var(--border)]
                bg-[var(--surface)]
                p-3.5
                shadow-[0_5px_18px_rgba(18,63,45,0.035)]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:shadow-[0_10px_26px_rgba(18,63,45,0.08)]
              "
            >
              {/* ==================================================
                  ROW SPARK
              ================================================== */}

              <span
                className="
                  pointer-events-none
                  absolute
                  left-0
                  top-1/2
                  h-6
                  w-px
                  -translate-y-1/2
                  rounded-full
                  bg-[var(--foreground)]
                  opacity-0
                  blur-[1px]
                  transition-all
                  duration-300
                  group-hover/recycler:h-10
                  group-hover/recycler:opacity-30
                "
              />

              {/* ==================================================
                  SUBTLE TOP HIGHLIGHT
              ================================================== */}

              <div
                className="
                  pointer-events-none
                  absolute
                  left-5
                  right-5
                  top-0
                  h-px
                  bg-gradient-to-r
                  from-transparent
                  via-white/70
                  to-transparent
                  opacity-0
                  transition-opacity
                  duration-300
                  group-hover/recycler:opacity-100
                "
              />

              <div className="flex items-start gap-3">
                {/* =================================================
                    AVATAR
                ================================================= */}

                <div
                  className="
                    relative
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-[var(--border)]
                    bg-[var(--surface-soft)]
                    text-sm
                    font-black
                    text-[var(--primary)]
                    shadow-[0_6px_16px_rgba(18,63,45,0.06)]
                    transition-all
                    duration-300
                    group-hover/recycler:scale-105
                    group-hover/recycler:shadow-[0_9px_22px_rgba(18,63,45,0.10)]
                  "
                >
                  {recycler.name.charAt(0)}

                  {recycler.verified && (
                    <span
                      className="
                        absolute
                        -bottom-1
                        -right-1
                        flex
                        h-4
                        w-4
                        items-center
                        justify-center
                        rounded-full
                        border-2
                        border-[var(--surface)]
                        bg-[var(--surface)]
                      "
                    >
                      <ShieldCheck
                        size={12}
                        className="text-[var(--primary)]"
                        strokeWidth={2.5}
                      />
                    </span>
                  )}
                </div>

                {/* =================================================
                    DETAILS
                ================================================= */}

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p
                      className="
                        min-w-0
                        truncate
                        text-sm
                        font-bold
                        text-[var(--foreground)]
                      "
                    >
                      {recycler.name}
                    </p>

                    {recycler.verified && (
                      <span
                        className="
                          inline-flex
                          shrink-0
                          items-center
                          gap-1
                          rounded-full
                          border
                          border-[var(--border)]
                          px-1.5
                          py-0.5
                          text-[8px]
                          font-bold
                          uppercase
                          tracking-wide
                          text-[var(--muted)]
                        "
                      >
                        <ShieldCheck
                          size={10}
                          className="text-[var(--primary)]"
                          strokeWidth={2.5}
                        />

                        Verified
                      </span>
                    )}
                  </div>

                  {/* LOCATION */}

                  <div
                    className="
                      mt-1
                      flex
                      min-w-0
                      items-center
                      gap-1
                      text-[10px]
                      font-medium
                      text-[var(--muted)]
                    "
                  >
                    <MapPin
                      size={11}
                      className="shrink-0"
                    />

                    <span className="truncate">
                      {recycler.location} ·{" "}
                      {recycler.distance}
                    </span>
                  </div>

                  {/* MATERIALS */}

                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {recycler.materials.map((material) => (
                      <span
                        key={material}
                        className="
                          rounded-lg
                          border
                          border-[var(--border)]
                          bg-[var(--surface)]
                          px-2
                          py-1
                          text-[9px]
                          font-semibold
                          text-[var(--muted)]
                          shadow-[0_3px_8px_rgba(18,63,45,0.035)]
                          transition-all
                          duration-200
                          group-hover/recycler:shadow-[0_4px_10px_rgba(18,63,45,0.05)]
                        "
                      >
                        {material}
                      </span>
                    ))}
                  </div>
                </div>

                {/* =================================================
                    HOVER ARROW
                ================================================= */}

                <div
                  className="
                    mt-1
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-[var(--border)]
                    bg-[var(--surface)]
                    text-[var(--muted)]
                    opacity-0
                    shadow-sm
                    transition-all
                    duration-300
                    group-hover/recycler:translate-x-0.5
                    group-hover/recycler:opacity-100
                  "
                >
                  <ArrowRight
                    size={13}
                    strokeWidth={2.2}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ======================================================
          MOVING SPARK
      ====================================================== */}

      <motion.div
        initial={{
          x: "-120%",
        }}
        whileHover={{
          x: "120%",
        }}
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
          via-white/35
          to-transparent
          blur-md
        "
      />
    </motion.section>
  );
};

export default RecyclerPreview;