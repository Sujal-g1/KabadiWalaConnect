import { MapPin, ChevronDown } from "lucide-react";

const locations = [
  "Meerut",
  "Delhi",
  "Ghaziabad",
  "Noida",
  "Agra",
];

const LocationSelector = ({
  location,
  selectedLocation,
  onChange,
}) => {
  const currentLocation =
    location?.city || "Detecting location...";

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)] text-[var(--primary)]">
          <MapPin size={20} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs text-[var(--muted)]">
            Pricing location
          </p>

          <p className="mt-1 font-semibold">
            {selectedLocation || currentLocation}
          </p>

          {location?.city && !selectedLocation && (
            <p className="mt-1 text-xs text-[var(--muted)]">
              Using your current location
            </p>
          )}
        </div>

        <select
          value={selectedLocation || ""}
          onChange={(event) =>
            onChange(event.target.value)
          }
          className="rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-2 text-sm outline-none"
        >
          <option value="">
            Current
          </option>

          {locations.map((city) => (
            <option
              key={city}
              value={city}
            >
              {city}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default LocationSelector;