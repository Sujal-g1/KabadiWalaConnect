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
    <div className="space-y-4">
      <div>
        <h2 className="text-base font-semibold text-[var(--foreground)]">
          Material
        </h2>

        <p className="mt-1 text-sm text-[var(--muted)]">
          What type of e-waste did you collect?
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {materials.map((item) => {
          const isSelected =
            material === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                onMaterialChange(item.id);
                onSubcategoryChange("");
              }}
              className={[
                "flex min-h-[90px] flex-col items-center justify-center rounded-2xl border p-4 text-center transition",
                "active:scale-[0.98]",
                isSelected
                  ? "border-[var(--primary)] bg-[var(--accent)] text-[var(--primary)]"
                  : "border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)]",
              ].join(" ")}
            >
              <span className="text-3xl">
                {item.icon}
              </span>

              <span className="mt-2 text-sm font-semibold">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {selectedMaterial && (
        <div>
          <label className="mb-2 block text-sm font-medium">
            Subcategory
          </label>

          <select
            value={subcategory}
            onChange={(event) =>
              onSubcategoryChange(
                event.target.value
              )
            }
            className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--foreground)] outline-none focus:border-[var(--primary)]"
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
        </div>
      )}
    </div>
  );
};

export default MaterialSelector;