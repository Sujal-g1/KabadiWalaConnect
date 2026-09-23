import {
  IndianRupee,
  TrendingUp,
} from "lucide-react";

import { motion } from "framer-motion";

const HandoverValue = ({
  value,
  onChange,
}) => {
  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-white/10
        bg-[linear-gradient(135deg,#06150F_0%,#0A291B_42%,#12613F_100%)]
        p-5
        text-white
        shadow-[0_18px_45px_rgba(18,63,45,0.18)]
        sm:p-6
      "
    >
      <div
        className="
          pointer-events-none
          absolute
          -right-16
          -top-16
          h-40
          w-40
          rounded-full
          bg-[#52D49A]/15
          blur-3xl
        "
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-white/10
                text-white
                shadow-lg
                backdrop-blur-md
              "
            >
              <IndianRupee size={19} />
            </div>

            <div>
              <h2 className="text-sm font-extrabold">
                Final Value
              </h2>

              <p
                className="
                  mt-1
                  text-xs
                  leading-5
                  text-white/55
                "
              >
                Enter the final agreed amount.
              </p>
            </div>
          </div>

          <TrendingUp
            size={17}
            className="text-emerald-200/70"
          />
        </div>

        <div
          className="
            mt-5
            flex
            overflow-hidden
            rounded-[22px]
            border
            border-white/10
            bg-black/10
            backdrop-blur-sm
          "
        >
          <div
            className="
              flex
              w-14
              shrink-0
              items-center
              justify-center
              bg-white/10
              text-xl
              font-extrabold
            "
          >
            ₹
          </div>

          <input
            type="number"
            min="0"
            step="1"
            inputMode="numeric"
            value={value}
            onChange={(event) =>
              onChange(
                event.target.value
              )
            }
            placeholder="3000"
            className="
              h-14
              min-w-0
              flex-1
              bg-transparent
              px-4
              text-xl
              font-extrabold
              text-white
              outline-none
              placeholder:text-white/25
            "
          />
        </div>

        <p
          className="
            mt-3
            text-[10px]
            leading-4
            text-white/45
          "
        >
          This becomes the recorded final transaction value.
        </p>
      </div>
    </section>
  );
};

export default HandoverValue;