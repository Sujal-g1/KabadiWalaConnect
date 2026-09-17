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
        rounded-2xl
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
          <MapPin size={20} />
        </div>

        <div>
          <h2 className="text-sm font-semibold">
            Handover Location
          </h2>

          <p className="mt-1 text-xs text-[var(--muted)]">
            Location recorded for traceability.
          </p>
        </div>
      </div>

      <input
        type="text"
        value={location}
        onChange={(event) =>
          onLocationChange(
            event.target.value
          )
        }
        placeholder="Meerut"
        className="
          mt-4 w-full rounded-xl
          border border-[var(--border)]
          bg-[var(--surface-soft)]
          px-4 py-3
          text-[var(--foreground)]
          outline-none
          transition
          focus:border-[var(--primary)]
        "
      />

      {hasCoordinates && (
        <div
          className="
            mt-3 flex items-center gap-2
            rounded-xl
            bg-[var(--surface-soft)]
            px-3 py-2.5
            text-xs
            text-[var(--muted)]
          "
        >
          <Navigation size={14} />

          <span>
            GPS: {latitude.toFixed(5)},{" "}
            {longitude.toFixed(5)}
          </span>
        </div>
      )}
    </section>
  );
};

export default HandoverLocation;