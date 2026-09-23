import { useState, useEffect } from "react";
import { ArrowLeft, Calculator } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import useCurrentLocation from "../../hooks/useCurrentLocation";
import LocationSelector from "../../components/Location/LocationSelector";
import { calculateValuation } from "../../services/prices/priceApi";

const CollectorValuation = () => {
  const navigate = useNavigate();
  const location = useCurrentLocation();

 const [selectedLocation, setSelectedLocation] = useState("");
  const [material, setMaterial] = useState("");
  const [weight, setWeight] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const pricingLocation = selectedLocation || location.city;

  const handleCalculate = async () => {
    if (!material) {
      setError("Please select a material.");
      return;
    }

    if (!weight || Number(weight) <= 0) {
      setError("Please enter a valid weight.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const data = await calculateValuation({
        material,
        weight: Number(weight),
        location: pricingLocation,
      });

      setResult(data.data);
    } catch (error) {
      setError(
        error.message ||
          "Unable to calculate valuation."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  const getLocation = () => {
    if (!navigator.geolocation) {
      console.log("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const {
          latitude,
          longitude,
        } = position.coords;

        console.log(
          "SUCCESS:",
          latitude,
          longitude
        );

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`,
            {
              headers: {
                "Accept-Language": "en",
              },
            }
          );

          const data = await response.json();

          console.log(
            "Nominatim response:",
            data
          );
        } catch (error) {
          console.error(
            "Reverse geocoding failed:",
            error
          );
        }
      },

      (error) => {
        console.error(
          "Location permission/error:",
          error.code,
          error.message
        );
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  };

  getLocation();
}, []);

  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-6 text-[var(--foreground)]">
      <div className="mx-auto max-w-2xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-sm text-[var(--muted)]"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <Card className="space-y-6 p-5">

  <LocationSelector
    location={location}
    selectedLocation={selectedLocation}
    onChange={setSelectedLocation}
  />

  <div>
    {/* Material */}
  </div>

  <div>
    {/* Weight */}
  </div>

  <Button>
    Calculate Value
  </Button>

</Card>

        <div className="mb-6">
          <h1 className="text-2xl font-bold">
            Estimate E-Waste Value
          </h1>

          <p className="mt-1 text-sm text-[var(--muted)]">
            Select material and enter approximate weight.
          </p>
        </div>

        <Card className="space-y-6 p-5">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Material
            </label>

            <select
              value={material}
              onChange={(event) =>
                setMaterial(event.target.value)
              }
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 outline-none"
            >
              <option value="">
                Select material
              </option>

              <option value="WIRE">
                Wire
              </option>

              <option value="PCB">
                PCB
              </option>

              <option value="BATTERY">
                Battery
              </option>

              <option value="CRT">
                CRT
              </option>

              <option value="LCD">
                LCD
              </option>

              <option value="MOTOR">
                Motor
              </option>

              <option value="MIXED_PLASTIC">
                Mixed Plastic
              </option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Approximate Weight
            </label>

            <div className="flex items-center gap-3">
              <input
                type="number"
                min="0.1"
                step="0.1"
                value={weight}
                onChange={(event) =>
                  setWeight(event.target.value)
                }
                placeholder="Enter weight"
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 outline-none"
              />

              <span className="rounded-xl bg-[var(--surface-soft)] px-4 py-3 text-sm">
                kg
              </span>
            </div>
          </div>

          {error && (
            <p className="rounded-xl bg-[var(--danger-soft)] p-3 text-sm text-[var(--danger)]">
              {error}
            </p>
          )}

          <Button
            className="w-full"
            onClick={handleCalculate}
            disabled={loading}
          >
            <Calculator size={18} />

            {loading
              ? "Calculating..."
              : "Calculate Value"}
          </Button>
        </Card>

        {result && (
          <Card className="mt-5 p-5">
            <p className="text-sm text-[var(--muted)]">
              Estimated Value
            </p>

            <p className="mt-2 text-4xl font-bold">
              ₹{result.estimatedValue}
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-[var(--surface-soft)] p-4">
                <p className="text-xs text-[var(--muted)]">
                  Rate
                </p>

                <p className="mt-1 font-semibold">
                  ₹{result.rate}/kg
                </p>
              </div>

              <div className="rounded-xl bg-[var(--surface-soft)] p-4">
                <p className="text-xs text-[var(--muted)]">
                  Weight
                </p>

                <p className="mt-1 font-semibold">
                  {weight} kg
                </p>
              </div>
            </div>

            <p className="mt-4 text-xs text-[var(--muted)]">
              This is an estimated market value.
              Final amount may change after actual
              weighing and recycler quotation.
            </p>
          </Card>
        )}
      </div>
    </main>
  );
};

export default CollectorValuation;