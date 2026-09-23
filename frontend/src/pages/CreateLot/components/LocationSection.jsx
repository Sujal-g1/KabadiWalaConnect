import { MapPin, RefreshCw } from "lucide-react";

const LocationSection = ({
  location,
  selectedLocation,
  onChange,
}) => {
  const currentLocation = location?.city;

  const displayedLocation =
    selectedLocation ||
    currentLocation;

  return (
    <div className="space-y-3">
      <div>
        <h2 className="text-base font-semibold">
          Collection location
        </h2>

        <p className="mt-1 text-sm text-[var(--muted)]">
          Your current location is used automatically.
        </p>
      </div>

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)] text-[var(--primary)]">
            <MapPin size={21} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs text-[var(--muted)]">
              Pricing / collection location
            </p>

            <p className="mt-1 truncate font-semibold">
              {displayedLocation ||
                "Location unavailable"}
            </p>
          </div>

          <button
            type="button"
            onClick={location.refreshLocation}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)]"
          >
            <RefreshCw size={17} />
          </button>
        </div>

        <select
          value={selectedLocation}
          onChange={(event) =>
            onChange(event.target.value)
          }
          className="mt-4 w-full rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-3 text-sm outline-none"
        >
          <option value="">
            Use current location
          </option>

          <option value="Meerut">
            Meerut
          </option>

          <option value="Delhi">
            Delhi
          </option>

          <option value="Ghaziabad">
            Ghaziabad
          </option>

          <option value="Noida">
            Noida
          </option>

          <option value="Agra">
            Agra
          </option>
        </select>
      </div>
    </div>
  );
};

export default LocationSection;