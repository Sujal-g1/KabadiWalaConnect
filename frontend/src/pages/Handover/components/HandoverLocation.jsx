import {
  CheckCircle2,
  MapPin,
  Navigation,
} from "lucide-react";

import { motion } from "framer-motion";

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
        rounded-[28px]
        border
        border-[var(--border)]
        bg-[linear-gradient(135deg,var(--surface)_0%,var(--background)_120%)]
        p-5
        shadow-[0_12px_35px_rgba(18,63,45,0.07)]
        sm:p-6
      "
    >
      <div className="flex items-start gap-3">
        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-2xl
            bg-[var(--accent)]
            text-[var(--primary)]
          "
        >
          <MapPin size={19} />
        </div>

        <div>
          <h2 className="text-sm font-extrabold">
            Handover Location
          </h2>

          <p
            className="
              mt-1
              text-xs
              leading-5
              text-[var(--muted)]
            "
          >
            Location recorded for traceability.
          </p>
        </div>
      </div>

      <div className="relative mt-5">
        <MapPin
          size={16}
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
            onLocationChange(
              event.target.value
            )
          }
          placeholder="Enter location"
          className="
            h-14
            w-full
            rounded-2xl
            border
            border-[var(--border)]
            bg-[var(--background)]
            pl-11
            pr-4
            text-sm
            font-medium
            text-[var(--foreground)]
            outline-none
            transition
            focus:border-[var(--primary)]/45
            focus:ring-4
            focus:ring-[var(--primary)]/5
            placeholder:text-[var(--muted)]
          "
        />
      </div>

      {hasCoordinates && (
        <motion.div
          initial={{
            opacity: 0,
            y: 5,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
            mt-3
            overflow-hidden
            rounded-2xl
            border
            border-[var(--primary)]/15
            bg-[var(--accent)]
            px-3.5
            py-3
          "
        >
          <div className="flex items-center gap-2.5">
            <Navigation
              size={14}
              className="
                shrink-0
                text-[var(--primary)]
              "
            />

            <div className="min-w-0 flex-1">
              <p
                className="
                  truncate
                  text-[10px]
                  font-semibold
                  text-[var(--primary)]
                "
              >
                {latitude.toFixed(5)},{" "}
                {longitude.toFixed(5)}
              </p>

              <p
                className="
                  mt-0.5
                  text-[9px]
                  text-[var(--muted)]
                "
              >
                GPS coordinates recorded
              </p>
            </div>

            <CheckCircle2
              size={15}
              className="
                shrink-0
                text-[var(--success)]
              "
            />
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default HandoverLocation;