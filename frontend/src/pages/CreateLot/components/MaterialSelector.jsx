import {
  Check,
  ChevronDown,
  Layers3,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import materials from "../../../constants/materials";

const MaterialSelector = ({
  material,
  subcategory,
  onMaterialChange,
  onSubcategoryChange,
}) => {
  const selectedMaterial = materials.find(
    (item) => item.id === material
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
          <Layers3
            size={17}
            strokeWidth={2.2}
          />
        </div>

        <div>
          <h2
            className="
              text-base
              font-bold
              tracking-tight
              text-[var(--foreground)]
            "
          >
            Material
          </h2>

          <p
            className="
              mt-1
              text-sm
              leading-5
              text-[var(--muted)]
            "
          >
            What type of e-waste did you collect?
          </p>
        </div>
      </div>

      {/* =====================================================
          MATERIAL GRID
      ===================================================== */}

      <div className="grid grid-cols-2 gap-3">
        {materials.map((item, index) => {
          const isSelected =
            material === item.id;

          return (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => {
                onMaterialChange(item.id);
                onSubcategoryChange("");
              }}
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.035,
                duration: 0.25,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className={`
                group
                relative
                flex
                min-h-[112px]
                flex-col
                items-center
                justify-center
                overflow-hidden
                rounded-[22px]
                border
                p-4
                text-center
                transition-all
                duration-200

                ${
                  isSelected
                    ? `
                      border-[var(--primary)]/50
                      bg-[var(--accent)]
                      text-[var(--primary)]
                      shadow-[0_8px_24px_rgba(24,121,78,0.10)]
                    `
                    : `
                      border-[var(--border)]
                      bg-[var(--surface)]
                      text-[var(--foreground)]
                      shadow-sm
                      hover:-translate-y-0.5
                      hover:border-[var(--primary)]/25
                      hover:shadow-md
                    `
                }
              `}
            >
              {/* SELECTED INDICATOR */}

              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{
                      scale: 0,
                      opacity: 0,
                    }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                    }}
                    exit={{
                      scale: 0,
                      opacity: 0,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 20,
                    }}
                    className="
                      absolute
                      right-2.5
                      top-2.5
                      flex
                      h-6
                      w-6
                      items-center
                      justify-center
                      rounded-full
                      bg-[var(--primary)]
                      text-white
                    "
                  >
                    <Check
                      size={13}
                      strokeWidth={3}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ICON */}

              <motion.span
                animate={{
                  scale: isSelected ? 1.12 : 1,
                  y: isSelected ? -2 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 20,
                }}
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[var(--background)]
                  text-[26px]
                  shadow-sm
                "
              >
                {item.icon}
              </motion.span>

              {/* LABEL */}

              <span
                className={`
                  mt-3
                  text-sm
                  font-bold
                  leading-tight
                  ${
                    isSelected
                      ? "text-[var(--primary)]"
                      : "text-[var(--foreground)]"
                  }
                `}
              >
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* =====================================================
          SELECTED MATERIAL SUMMARY
      ===================================================== */}

      <AnimatePresence mode="wait">
        {selectedMaterial && (
          <motion.div
            key={selectedMaterial.id}
            initial={{
              opacity: 0,
              height: 0,
              y: -6,
            }}
            animate={{
              opacity: 1,
              height: "auto",
              y: 0,
            }}
            exit={{
              opacity: 0,
              height: 0,
              y: -6,
            }}
            transition={{
              duration: 0.25,
            }}
            className="overflow-hidden"
          >
            <div
              className="
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-[var(--border)]
                bg-[var(--background)]
                px-3.5
                py-3
              "
            >
              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-[var(--accent)]
                  text-xl
                "
              >
                {selectedMaterial.icon}
              </div>

              <div className="min-w-0 flex-1">
                <p
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-wider
                    text-[var(--muted)]
                  "
                >
                  Selected material
                </p>

                <p
                  className="
                    mt-0.5
                    truncate
                    text-sm
                    font-bold
                    text-[var(--foreground)]
                  "
                >
                  {selectedMaterial.label}
                </p>
              </div>

              <div
                className="
                  flex
                  h-7
                  w-7
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[var(--accent)]
                  text-[var(--primary)]
                "
              >
                <Check
                  size={14}
                  strokeWidth={2.7}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================
          SUBCATEGORY
      ===================================================== */}

      <AnimatePresence>
        {selectedMaterial && (
          <motion.div
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -5,
            }}
            transition={{
              duration: 0.25,
            }}
            className="space-y-2.5"
          >
            <div className="flex items-center justify-between">
              <label
                htmlFor="material-subcategory"
                className="
                  text-sm
                  font-semibold
                  text-[var(--foreground)]
                "
              >
                Subcategory
              </label>

              <span
                className="
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-wider
                  text-[var(--muted)]
                "
              >
                Optional
              </span>
            </div>

            <div className="relative">
              <select
                id="material-subcategory"
                value={subcategory}
                onChange={(event) =>
                  onSubcategoryChange(
                    event.target.value
                  )
                }
                className="
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
                  Select subcategory
                </option>

                {selectedMaterial.subcategories.map(
                  (item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  )
                )}
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
                "
              />
            </div>

            {/* SELECTED SUBCATEGORY */}

            <AnimatePresence>
              {subcategory && (
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.97,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.97,
                  }}
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-[var(--accent)]
                    px-3
                    py-2.5
                    text-xs
                    font-semibold
                    text-[var(--primary)]
                  "
                >
                  <Check
                    size={14}
                    strokeWidth={2.7}
                  />

                  <span className="truncate">
                    {subcategory}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MaterialSelector;