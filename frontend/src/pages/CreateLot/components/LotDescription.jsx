import {
  FileText,
  ChevronDown,
  Check,
} from "lucide-react";

import { motion } from "framer-motion";

const LotDescription = ({
  description,
  condition,
  onDescriptionChange,
  onConditionChange,
}) => {
  const conditions = [
    {
      value: "Working",
      label: "Working",
      description: "Functional equipment",
    },
    {
      value: "Used",
      label: "Used",
      description: "Previously used",
    },
    {
      value: "Mixed",
      label: "Mixed",
      description: "Different conditions",
    },
    {
      value: "Damaged",
      label: "Damaged",
      description: "Broken or damaged",
    },
  ];

  const selectedCondition = conditions.find(
    (item) => item.value === condition
  );

  return (
    <section className="space-y-4">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex items-start gap-3">
        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-[var(--accent)]
            text-[var(--primary)]
          "
        >
          <FileText
            size={17}
            strokeWidth={2.2}
          />
        </div>

        <div>
          <h2 className="text-base font-bold tracking-tight text-[var(--foreground)]">
            More details
          </h2>

          <p className="mt-1 text-sm leading-5 text-[var(--muted)]">
            Add optional information to help describe the
            collected material.
          </p>
        </div>
      </div>

      {/* =====================================================
          CONDITION
      ===================================================== */}

      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label
            htmlFor="lot-condition"
            className="
              text-sm
              font-semibold
              text-[var(--foreground)]
            "
          >
            Condition
          </label>

          <span className="text-[10px] font-medium uppercase tracking-wider text-[var(--muted)]">
            Optional
          </span>
        </div>

        {/* CUSTOM SELECT */}

        <div className="relative">
          <select
            id="lot-condition"
            value={condition}
            onChange={(event) =>
              onConditionChange(
                event.target.value
              )
            }
            className="
              peer
              h-14
              w-full
              appearance-none
              rounded-2xl
              border
              border-[var(--border)]
              bg-[var(--background)]
              px-4
              pr-12
              text-sm
              font-medium
              text-[var(--foreground)]
              outline-none
              transition
              duration-200
              focus:border-[var(--primary)]/50
              focus:ring-4
              focus:ring-[var(--primary)]/5
            "
          >
            <option value="">
              Select condition
            </option>

            {conditions.map((item) => (
              <option
                key={item.value}
                value={item.value}
              >
                {item.label} — {item.description}
              </option>
            ))}
          </select>

          <ChevronDown
            size={18}
            strokeWidth={2}
            className="
              pointer-events-none
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-[var(--muted)]
              transition
              duration-200
              peer-focus:rotate-180
              peer-focus:text-[var(--primary)]
            "
          />
        </div>

        {/* SELECTED CONDITION */}

        <motion.div
          initial={false}
          animate={{
            height: selectedCondition ? "auto" : 0,
            opacity: selectedCondition ? 1 : 0,
          }}
          className="overflow-hidden"
        >
          {selectedCondition && (
            <div
              className="
                flex
                items-center
                gap-2.5
                rounded-xl
                border
                border-[var(--border)]
                bg-[var(--background)]
                px-3
                py-2.5
              "
            >
              <div
                className="
                  flex
                  h-6
                  w-6
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[var(--accent)]
                  text-[var(--primary)]
                "
              >
                <Check
                  size={13}
                  strokeWidth={2.7}
                />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-semibold text-[var(--foreground)]">
                  {selectedCondition.label}
                </p>

                <p className="text-[11px] text-[var(--muted)]">
                  {selectedCondition.description}
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* =====================================================
          DESCRIPTION
      ===================================================== */}

      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label
            htmlFor="lot-description"
            className="
              text-sm
              font-semibold
              text-[var(--foreground)]
            "
          >
            Description
          </label>

          <span className="text-[10px] font-medium uppercase tracking-wider text-[var(--muted)]">
            Optional
          </span>
        </div>

        <div
          className="
            overflow-hidden
            rounded-2xl
            border
            border-[var(--border)]
            bg-[var(--background)]
            transition
            duration-200
            focus-within:border-[var(--primary)]/50
            focus-within:ring-4
            focus-within:ring-[var(--primary)]/5
          "
        >
          <textarea
            id="lot-description"
            value={description}
            onChange={(event) =>
              onDescriptionChange(
                event.target.value
              )
            }
            rows={4}
            maxLength={300}
            placeholder="Example: mixed computer cables, old chargers, and power adapters"
            className="
              block
              min-h-[110px]
              w-full
              resize-none
              bg-transparent
              px-4
              pt-4
              text-sm
              leading-6
              text-[var(--foreground)]
              outline-none
              placeholder:text-[var(--muted)]/70
            "
          />

          <div
            className="
              flex
              items-center
              justify-between
              border-t
              border-[var(--border)]
              px-4
              py-2.5
            "
          >
            <span className="text-[10px] text-[var(--muted)]">
              Mention anything useful about the lot.
            </span>

            <span className="
              text-[10px]
              font-semibold
              tabular-nums
              text-[var(--muted)]
            ">
              {description.length}/300
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================
          HELPER
      ===================================================== */}

      <div
        className="
          rounded-2xl
          border
          border-[var(--border)]
          bg-[var(--background)]
          px-3.5
          py-3
        "
      >
        <p className="
          text-xs
          leading-5
          text-[var(--muted)]
        ">
          Keep the description simple. For example:
          <span className="
            ml-1
            font-medium
            text-[var(--foreground)]
          ">
            "mixed PCBs and cables from old computers"
          </span>
        </p>
      </div>
    </section>
  );
};

export default LotDescription;