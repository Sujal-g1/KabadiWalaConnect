const LotValuation = ({ lot }) => {
  const hasValue =
    lot.estimatedValue !== null &&
    lot.estimatedValue !== undefined;

  if (!hasValue) {
    return (
      <section
        className="
          rounded-3xl
          border
          border-[var(--border)]
          bg-[var(--surface)]
          p-5
        "
      >
        <p className="text-sm text-[var(--muted)]">
          Estimated valuation is not available.
        </p>
      </section>
    );
  }

  return (
    <section
      className="
        rounded-3xl
        bg-[var(--accent)]
        p-5
      "
    >
      <p className="text-sm text-[var(--muted)]">
        Estimated Value
      </p>

      <p className="mt-1 text-3xl font-bold text-[var(--primary)]">
        ₹
        {Number(
          lot.estimatedValue
        ).toLocaleString(
          "en-IN",
          {
            maximumFractionDigits: 2,
          }
        )}
      </p>

      {lot.estimatedRate !== null &&
        lot.estimatedRate !== undefined && (
          <p className="mt-2 text-sm text-[var(--muted)]">
            Estimated rate: ₹
            {Number(
              lot.estimatedRate
            ).toLocaleString(
              "en-IN",
              {
                maximumFractionDigits: 2,
              }
            )}
            / {lot.weightUnit || "kg"}
          </p>
        )}

      {(lot.minEstimatedValue !== null ||
        lot.maxEstimatedValue !== null) && (
        <p className="mt-1 text-xs text-[var(--muted)]">
          Market range: ₹
          {Number(
            lot.minEstimatedValue || 0
          ).toLocaleString(
            "en-IN",
            {
              maximumFractionDigits: 2,
            }
          )}
          {" – "}
          ₹
          {Number(
            lot.maxEstimatedValue || 0
          ).toLocaleString(
            "en-IN",
            {
              maximumFractionDigits: 2,
            }
          )}
        </p>
      )}
    </section>
  );
};

export default LotValuation;