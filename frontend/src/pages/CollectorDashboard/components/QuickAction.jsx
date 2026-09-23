import {
  ArrowUpRight,
  Camera,
  Plus,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const QuickAction = () => {
  const navigate = useNavigate();

  return (
    <motion.button
      type="button"
      onClick={() => navigate("/collector/lots/create")}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      className="
        group
        relative
        w-full
        overflow-hidden
        rounded-[28px]
        border
        border-white/[0.09]
        text-left
        text-white
        shadow-[0_20px_55px_rgba(2,12,8,0.42)]
        transition-all
        duration-500
        hover:-translate-y-1
        hover:shadow-[0_28px_75px_rgba(3,20,12,0.52)]
      "
    >
      {/* ======================================================
          MAIN DARK GRADIENT
      ====================================================== */}

      <div
        className="
          absolute
          inset-0
          bg-[linear-gradient(120deg,#020806_0%,#06140d_24%,#0a2418_50%,#0c3623_72%,#12563a_100%)]
        "
      />

      {/* ======================================================
          SECONDARY DEPTH LAYER
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[linear-gradient(145deg,rgba(255,255,255,0.055)_0%,transparent_30%,transparent_62%,rgba(53,168,115,0.09)_100%)]
        "
      />

      {/* ======================================================
          TOP LEFT GREEN LIGHT
      ====================================================== */}

      <motion.div
        variants={{
          initial: {
            x: -15,
            y: -15,
            opacity: 0.16,
            scale: 1,
          },
          hover: {
            x: 18,
            y: 12,
            opacity: 0.28,
            scale: 1.12,
          },
        }}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 20,
        }}
        className="
          pointer-events-none
          absolute
          -left-24
          -top-24
          h-64
          w-64
          rounded-full
          bg-emerald-400/20
          blur-[85px]
        "
      />

      {/* ======================================================
          BOTTOM RIGHT TEAL LIGHT
      ====================================================== */}

      <motion.div
        variants={{
          initial: {
            x: 15,
            y: 15,
            opacity: 0.10,
            scale: 1,
          },
          hover: {
            x: -18,
            y: -10,
            opacity: 0.22,
            scale: 1.15,
          },
        }}
        transition={{
          type: "spring",
          stiffness: 75,
          damping: 20,
        }}
        className="
          pointer-events-none
          absolute
          -bottom-28
          -right-20
          h-64
          w-64
          rounded-full
          bg-teal-400/20
          blur-[90px]
        "
      />

      {/* ======================================================
          DIAGONAL LIGHT STREAK
      ====================================================== */}

      <motion.div
        variants={{
          initial: {
            x: "-140%",
            opacity: 0,
          },
          hover: {
            x: "140%",
            opacity: 1,
          },
        }}
        transition={{
          duration: 1,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          -inset-y-24
          left-0
          w-1/4
          rotate-[18deg]
          bg-gradient-to-r
          from-transparent
          via-white/[0.14]
          to-transparent
          blur-xl
        "
      />

      {/* ======================================================
          VERY SUBTLE DIAGONAL LINE
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -left-[15%]
          top-[55%]
          h-px
          w-[70%]
          rotate-[-18deg]
          bg-gradient-to-r
          from-transparent
          via-emerald-300/20
          to-transparent
        "
      />

      {/* ======================================================
          TOP HIGHLIGHT
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-7
          right-7
          top-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-white/30
          to-transparent
        "
      />

      {/* ======================================================
          CONTENT
      ====================================================== */}

      <div
        className="
          relative
          z-10
          flex
          min-h-[220px]
          flex-col
          justify-between
          p-5
          sm:p-6
        "
      >
        {/* ====================================================
            TOP ROW
        ==================================================== */}

        <div
          className="
            flex
            items-start
            justify-between
            gap-4
          "
        >
          {/* CAMERA ICON */}

          <motion.div
            variants={{
              initial: {
                rotate: 0,
                scale: 1,
                y: 0,
              },
              hover: {
                rotate: -7,
                scale: 1.08,
                y: -2,
              },
            }}
            transition={{
              type: "spring",
              stiffness: 320,
              damping: 18,
            }}
            className="
              relative
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              border
              border-white/[0.12]
              bg-white/[0.08]
              text-white
              shadow-[0_12px_28px_rgba(0,0,0,0.18)]
              ring-1
              ring-inset
              ring-white/[0.06]
              backdrop-blur-xl
            "
          >
            <Camera
              size={24}
              strokeWidth={2}
            />

            {/* CAMERA STATUS */}

            <motion.span
              variants={{
                initial: {
                  scale: 1,
                  opacity: 0.85,
                },
                hover: {
                  scale: 1.35,
                  opacity: 1,
                },
              }}
              transition={{
                duration: 0.3,
              }}
              className="
                absolute
                right-1.5
                top-1.5
                h-2.5
                w-2.5
                rounded-full
                bg-amber-300
                shadow-[0_0_14px_rgba(252,211,77,0.8)]
              "
            />
          </motion.div>

          {/* QUICK BADGE */}

          <div
            className="
              flex
              items-center
              gap-1.5
              rounded-full
              border
              border-white/[0.10]
              bg-white/[0.07]
              px-3
              py-1.5
              text-[9px]
              font-black
              uppercase
              tracking-[0.15em]
              text-white/70
              backdrop-blur-xl
            "
          >
            <Sparkles
              size={11}
              className="text-amber-300"
            />

            <span>
              Quick action
            </span>
          </div>
        </div>

        {/* ====================================================
            BOTTOM CONTENT
        ==================================================== */}

        <div className="mt-10">
          <p
            className="
              text-xl
              font-black
              tracking-tight
              text-white
              sm:text-2xl
            "
          >
            Add new e-waste
          </p>

          <p
            className="
              mt-2
              max-w-[310px]
              text-sm
              leading-5
              text-white/[0.68]
            "
          >
            Photograph your material,
            identify it, and create a
            digital collection lot.
          </p>

          {/* CTA */}

          <motion.div
            variants={{
              initial: {
                x: 0,
              },
              hover: {
                x: 5,
              },
            }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 20,
            }}
            className="
              mt-5
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-white
              px-3.5
              py-2.5
              text-sm
              font-black
              text-[#082118]
              shadow-[0_10px_26px_rgba(0,0,0,0.16)]
              transition-transform
              duration-300
            "
          >
            <span>
              Create Lot
            </span>

            <ArrowUpRight
              size={16}
              strokeWidth={2.4}
            />
          </motion.div>
        </div>
        
      </div>

      {/* ======================================================
          GIANT DECORATIVE PLUS
      ====================================================== */}

      <motion.div
        variants={{
          initial: {
            rotate: 8,
            scale: 1,
            x: 0,
          },
          hover: {
            rotate: 20,
            scale: 1.07,
            x: -7,
          },
        }}
        transition={{
          type: "spring",
          stiffness: 70,
          damping: 20,
        }}
        className="
          pointer-events-none
          absolute
          -bottom-16
          -right-8
          text-emerald-200/[0.06]
        "
      >
        <Plus
          size={210}
          strokeWidth={0.65}
        />
      </motion.div>

      {/* ======================================================
          AMBER ACCENT
      ====================================================== */}

      <motion.div
        variants={{
          initial: {
            opacity: 0.16,
            scale: 1,
          },
          hover: {
            opacity: 0.32,
            scale: 1.12,
          },
        }}
        transition={{
          duration: 0.45,
        }}
        className="
          pointer-events-none
          absolute
          -bottom-20
          right-10
          h-36
          w-36
          rounded-full
          bg-amber-300/[0.12]
          blur-[60px]
        "
      />

      {/* ======================================================
          EDGE LIGHT
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-[28px]
          ring-1
          ring-inset
          ring-white/[0.07]
        "
      />
    </motion.button>
  );
};

export default QuickAction;