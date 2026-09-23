import { IndianRupee } from "lucide-react";

const ValuationPreview = ({
  valuation,
  loading,
}) => {
  if (loading) {
    return (
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
        <p className="text-sm text-[var(--muted)]">
          Calculating estimated value...
        </p>
      </div>
    );
  }

  if (!valuation) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-[var(--primary)] bg-[var(--accent)] p-5">
      <div className="flex items-center gap-2 text-[var(--primary)]">
        <IndianRupee size={19} />

        <span className="text-sm font-semibold">
          Estimated value
        </span>
      </div>

      <p className="mt-2 text-3xl font-bold text-[var(--foreground)]">
        ₹{Number(
          valuation.estimatedValue || 0
        ).toLocaleString("en-IN")}
      </p>

      {valuation.minEstimatedValue !==
        undefined &&
        valuation.maxEstimatedValue !==
          undefined && (
          <p className="mt-1 text-sm text-[var(--muted)]">
            Market range: ₹
            {Number(
              valuation.minEstimatedValue
            ).toLocaleString("en-IN")}
            {" – "}₹
            {Number(
              valuation.maxEstimatedValue
            ).toLocaleString("en-IN")}
          </p>
        )}
    </div>
  );
};

export default ValuationPreview;