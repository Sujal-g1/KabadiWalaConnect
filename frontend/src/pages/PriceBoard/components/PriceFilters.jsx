import {
  Search,
  SlidersHorizontal,
} from "lucide-react";

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
  return (
    <section className="space-y-3">
      {/* Search */}
      <div className="relative">
        <Search
          size={18}
          className="
            absolute
            left-4 top-1/2
            -translate-y-1/2
            text-[var(--muted)]
          "
        />

        <input
          type="text"
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          placeholder="Search material or category..."
          className="
            h-12
            w-full
            rounded-2xl
            border border-[var(--border)]
            bg-[var(--surface)]
            pl-11 pr-4
            text-sm
            text-[var(--foreground)]
            outline-none
            transition
            placeholder:text-[var(--muted)]
            focus:border-[var(--primary)]
            focus:ring-2
            focus:ring-[var(--primary)]/10
          "
        />
      </div>

      {/* Filter heading */}
      <div className="flex items-center gap-2">
        <SlidersHorizontal
          size={14}
          className="text-[var(--muted)]"
        />

        <span className="text-xs font-medium text-[var(--muted)]">
          Material
        </span>
      </div>

      {/* Chips */}
      <div
        className="
          flex
          gap-2
          overflow-x-auto
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
              <button
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
                className={`
                  shrink-0
                  rounded-full
                  px-4 py-2
                  text-xs
                  font-medium
                  transition
                  ${
                    active
                      ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                      : "border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--foreground)]"
                  }
                `}
              >
                {material}
              </button>
            );
          }
        )}
      </div>
    </section>
  );
};

export default PriceFilters;