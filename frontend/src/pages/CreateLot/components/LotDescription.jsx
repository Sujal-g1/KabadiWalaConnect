const LotDescription = ({
  description,
  condition,
  onDescriptionChange,
  onConditionChange,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-base font-semibold">
          More details
        </h2>

        <p className="mt-1 text-sm text-[var(--muted)]">
          Optional information about the collected material.
        </p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Condition
        </label>

        <select
          value={condition}
          onChange={(event) =>
            onConditionChange(
              event.target.value
            )
          }
          className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 outline-none"
        >
          <option value="">
            Select condition
          </option>

          <option value="Used">
            Used
          </option>

          <option value="Mixed">
            Mixed
          </option>

          <option value="Damaged">
            Damaged
          </option>

          <option value="Working">
            Working
          </option>
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Description
        </label>

        <textarea
          value={description}
          onChange={(event) =>
            onDescriptionChange(
              event.target.value
            )
          }
          rows={3}
          placeholder="Example: mixed computer cables"
          className="w-full resize-none rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm outline-none"
        />
      </div>
    </div>
  );
};

export default LotDescription;