import { useState } from "react";

import {
  calculateValuation,
} from "../services/prices/priceApi";

import ValuationCard from "../components/valuation/ValuationCard";
import useTranslation from "../i18n/useTranslation";

const ValuationTest = () => {
  const { t } = useTranslation();

  const [material, setMaterial] =
    useState("PCB");

  const [weight, setWeight] =
    useState("12");

  const [valuation, setValuation] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleCalculate = async () => {
    try {
      setLoading(true);
      setError("");
      setValuation(null);

      const result =
        await calculateValuation({
          material,
          location: "Meerut",
          weight: Number(weight),
        });

      setValuation(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="mx-auto max-w-lg px-4 py-6">
        <h1 className="text-2xl font-semibold">
          Valuation Test
        </h1>

        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm text-[var(--muted)]">
              Material
            </label>

            <select
              value={material}
              onChange={(event) =>
                setMaterial(
                  event.target.value
                )
              }
              className="
                w-full
                rounded-2xl
                border border-[var(--border)]
                bg-[var(--surface)]
                px-4 py-3
                text-[var(--foreground)]
                outline-none
              "
            >
              <option value="PCB">
                PCB
              </option>

              <option value="Cables">
                Cables
              </option>

              <option value="Battery">
                Battery
              </option>

              <option value="LCD">
                LCD
              </option>

              <option value="CRT">
                CRT
              </option>

              <option value="Motor">
                Motor
              </option>

              <option value="Mixed Plastic">
                Mixed Plastic
              </option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm text-[var(--muted)]">
              Weight (kg)
            </label>

            <input
              type="number"
              min="0"
              step="0.1"
              value={weight}
              onChange={(event) =>
                setWeight(
                  event.target.value
                )
              }
              className="
                w-full
                rounded-2xl
                border border-[var(--border)]
                bg-[var(--surface)]
                px-4 py-3
                text-[var(--foreground)]
                outline-none
              "
            />
          </div>

          <button
            type="button"
            disabled={loading}
            onClick={handleCalculate}
            className="
              w-full
              rounded-2xl
              bg-[var(--primary)]
              px-5 py-4
              font-medium
              text-[var(--primary-foreground)]
              disabled:opacity-50
            "
          >
            {loading
              ? t("common.loading")
              : t("prices.estimatedValue")}
          </button>

          {error && (
            <div className="rounded-2xl border border-[var(--border)] p-4 text-sm">
              {error}
            </div>
          )}

          {valuation && (
            <ValuationCard
              valuation={valuation}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default ValuationTest;