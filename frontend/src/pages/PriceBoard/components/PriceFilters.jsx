import {
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import { motion } from "framer-motion";

const materials = [
  "All",
  "CRT",
  "LCD",
  "PCB",
  "Cables",
  "Battery",
  "Motor",
  "Mixed Plastic",
  "Copper",
  "Aluminium",
  "Iron",
];

const PriceFilters = ({
  search,
  setSearch,
  selectedMaterial,
  setSelectedMaterial,
}) => {
  const hasSearch =
    search.trim().length > 0;

  const hasFilter =
    Boolean(selectedMaterial);

  const clearFilters = () => {
    setSearch("");
    setSelectedMaterial(null);
  };

  return (
    <section className="space-y-4">
      {/* =====================================================
          SEARCH
      ===================================================== */}

      <div
        className="
          flex
          flex-col
          gap-2
          sm:flex-row
          sm:items-center
        "
      >
        <div className="relative min-w-0 flex-1">
          <Search
            size={17}
            strokeWidth={2}
            className="
              pointer-events-none
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-[var(--muted)]
            "
          />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            placeholder="Search material or category..."
            className="
              h-12
              w-full
              rounded-2xl
              border
              border-[var(--border)]
              bg-[var(--surface)]
              pl-11
              pr-11
              text-sm
              font-medium
              text-[var(--foreground)]
              shadow-sm
              outline-none
              transition
              placeholder:text-[var(--muted)]
              focus:border-[var(--primary)]/45
              focus:ring-4
              focus:ring-[var(--primary)]/5
            "
          />

          {hasSearch && (
            <button
              type="button"
              onClick={() =>
                setSearch("")
              }
              className="
                absolute
                right-3
                top-1/2
                flex
                h-7
                w-7
                -translate-y-1/2
                items-center
                justify-center
                rounded-lg
                text-[var(--muted)]
                transition
                hover:text-[var(--foreground)]
              "
            >
              <X size={14} />
            </button>
          )}
        </div>

        {(hasSearch || hasFilter) && (
          <button
            type="button"
            onClick={clearFilters}
            className="
              flex
              h-10
              shrink-0
              items-center
              justify-center
              gap-1.5
              rounded-xl
              px-3
              text-xs
              font-semibold
              text-[var(--muted)]
              transition
              hover:text-[var(--primary)]
              sm:h-12
            "
          >
            <X size={13} />
            Clear
          </button>
        )}
      </div>

      {/* =====================================================
          FILTER HEADER
      ===================================================== */}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-lg
              bg-[var(--accent)]
              text-[var(--primary)]
            "
          >
            <SlidersHorizontal size={13} />
          </div>

          <span
            className="
              text-xs
              font-bold
              text-[var(--foreground)]
            "
          >
            Material
          </span>
        </div>

        <span
          className="
            text-[10px]
            font-medium
            text-[var(--muted)]
          "
        >
          {selectedMaterial ||
            "All materials"}
        </span>
      </div>

      {/* =====================================================
          MATERIAL CHIPS
      ===================================================== */}

      <div
        className="
          -mx-1
          flex
          gap-2
          overflow-x-auto
          px-1
          pb-1
          scrollbar-none
        "
      >
        {materials.map(
          (material) => {
            const active =
              material ===
              "All"
                ? !selectedMaterial
                : selectedMaterial ===
                  material;

            return (
              <motion.button
                key={material}
                type="button"
                onClick={() =>
                  setSelectedMaterial(
                    material ===
                      "All"
                      ? null
                      : material
                  )
                }
                whileTap={{
                  scale: 0.95,
                }}
                className={`
                  relative
                  shrink-0
                  rounded-full
                  border
                  px-4
                  py-2.5
                  text-[11px]
                  font-semibold
                  transition-all

                  ${
                    active
                      ? `
                        border-[var(--primary)]
                        bg-[var(--primary)]
                        text-[var(--primary-foreground)]
                        shadow-sm
                      `
                      : `
                        border-[var(--border)]
                        bg-[var(--surface)]
                        text-[var(--muted)]
                        hover:border-[var(--primary)]/30
                        hover:text-[var(--foreground)]
                      `
                  }
                `}
              >
                {material}

                {active &&
                  material !==
                    "All" && (
                    <span
                      className="
                        absolute
                        -right-0.5
                        -top-0.5
                        h-2
                        w-2
                        rounded-full
                        bg-[var(--primary)]
                      "
                    />
                  )}
              </motion.button>
            );
          }
        )}
      </div>
    </section>
  );
};

export default PriceFilters;