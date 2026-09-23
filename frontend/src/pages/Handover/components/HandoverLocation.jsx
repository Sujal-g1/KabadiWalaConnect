import {
  MapPin,
  Navigation,
} from "lucide-react";

const HandoverLocation = ({
  location,
  latitude,
  longitude,
  onLocationChange,
}) => {
  const hasCoordinates =
    typeof latitude === "number" &&
    typeof longitude === "number";

  return (
    <section
      className="
        rounded-3xl
        border border-[var(--border)]
        bg-[var(--surface)]
        p-5
      "
    >
      <div className="flex items-start gap-3">
        <div
          className="
            flex h-10 w-10 shrink-0
            items-center justify-center
            rounded-xl
            bg-[var(--accent)]
            text-[var(--primary)]
          "
        >
          <MapPin size={19} />
        </div>

        <div>
          <h2 className="text-sm font-semibold">
            Handover Location
          </h2>

          <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
            Location recorded for traceability.
          </p>
        </div>
      </div>

      <div className="relative mt-5">
        <MapPin
          size={17}
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
          value={location}
          onChange={(event) =>
            onLocationChange(event.target.value)
          }
          placeholder="Enter location"
          className="
            h-13
            w-full
            rounded-2xl
            border border-[var(--border)]
            bg-[var(--surface-soft)]
            pl-11
            pr-4
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

      {hasCoordinates && (
        <div
          className="
            mt-3
            flex items-center gap-2
            rounded-2xl
            bg-[var(--surface-soft)]
            px-3.5
            py-3
            text-xs
            text-[var(--muted)]
          "
        >
          <Navigation
            size={14}
            className="shrink-0 text-[var(--primary)]"
          />

          <span className="truncate">
            GPS: {latitude.toFixed(5)},{" "}
            {longitude.toFixed(5)}
          </span>

          <span className="ml-auto shrink-0 font-medium text-[var(--success)]">
            Recorded
          </span>
        </div>
      )}
    </section>
  );
};

export default HandoverLocation;