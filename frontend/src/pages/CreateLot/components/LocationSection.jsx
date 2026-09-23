import {
  MapPin,
  RefreshCw,
  ChevronDown,
  LocateFixed,
  Check,
} from "lucide-react";

import { motion } from "framer-motion";

const LocationSection = ({
  location,
  selectedLocation,
  onChange,
}) => {
  const currentLocation = location?.city;

  const displayedLocation =
    selectedLocation ||
    currentLocation;

  const isLocationAvailable =
    Boolean(displayedLocation);

  const locations = [
    "Meerut",
    "Delhi",
    "Ghaziabad",
    "Noida",
    "Agra",
  ];

  return (
    <section className="space-y-4">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex items-start gap-3">
        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-[var(--accent)]
            text-[var(--primary)]
          "
        >
          <MapPin
            size={17}
            strokeWidth={2.2}
          />
        </div>

        <div>
          <h2 className="
            text-base
            font-bold
            tracking-tight
            text-[var(--foreground)]
          ">
            Collection location
          </h2>

          <p className="
            mt-1
            text-sm
            leading-5
            text-[var(--muted)]
          ">
            Your location helps calculate local material
            prices.
          </p>
        </div>
      </div>

      {/* =====================================================
          CURRENT LOCATION CARD
      ===================================================== */}

      <div
        className="
          overflow-hidden
          rounded-[24px]
          border
          border-[var(--border)]
          bg-[var(--surface)]
          shadow-sm
        "
      >
        {/* LOCATION STATUS */}

        <div className="p-4">
          <div className="flex items-center gap-3">
            {/* LOCATION ICON */}

            <motion.div
              animate={{
                scale: isLocationAvailable
                  ? [1, 1.04, 1]
                  : 1,
              }}
              transition={{
                duration: 2.5,
                repeat: isLocationAvailable
                  ? Infinity
                  : 0,
                ease: "easeInOut",
              }}
              className="
                relative
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-[var(--accent)]
                text-[var(--primary)]
              "
            >
              <MapPin
                size={21}
                strokeWidth={2.2}
              />

              {isLocationAvailable && (
                <span
                  className="
                    absolute
                    -right-0.5
                    -top-0.5
                    h-3
                    w-3
                    rounded-full
                    border-2
                    border-[var(--surface)]
                    bg-[var(--primary)]
                  "
                />
              )}
            </motion.div>

            {/* LOCATION TEXT */}

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="
                  text-[11px]
                  font-medium
                  uppercase
                  tracking-wider
                  text-[var(--muted)]
                ">
                  Current location
                </p>

                {isLocationAvailable && (
                  <span className="
                    rounded-full
                    bg-[var(--accent)]
                    px-2
                    py-0.5
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-wide
                    text-[var(--primary)]
                  ">
                    Detected
                  </span>
                )}
              </div>

              <p className="
                mt-1
                truncate
                text-base
                font-bold
                text-[var(--foreground)]
              ">
                {displayedLocation ||
                  "Location unavailable"}
              </p>
            </div>

            {/* REFRESH */}

            <motion.button
              type="button"
              whileTap={{
                scale: 0.88,
                rotate: -20,
              }}
              onClick={location.refreshLocation}
              aria-label="Refresh location"
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-[var(--border)]
                bg-[var(--background)]
                text-[var(--muted)]
                transition
                hover:border-[var(--primary)]/40
                hover:text-[var(--primary)]
                active:scale-95
              "
            >
              <RefreshCw
                size={16}
                strokeWidth={2.2}
              />
            </motion.button>
          </div>

          {/* LOCATION MESSAGE */}

          <div
            className="
              mt-4
              flex
              items-center
              gap-2.5
              rounded-xl
              bg-[var(--background)]
              px-3
              py-2.5
            "
          >
            <LocateFixed
              size={15}
              className="shrink-0 text-[var(--primary)]"
            />

            <p className="
              text-[11px]
              leading-4
              text-[var(--muted)]
            ">
              Your detected location is used for local
              pricing and valuation.
            </p>
          </div>
        </div>

        {/* ===================================================
            MANUAL LOCATION
        =================================================== */}

        <div
          className="
            border-t
            border-[var(--border)]
            p-4
          "
        >
          <div className="mb-2.5 flex items-center justify-between">
            <label
              htmlFor="collection-location"
              className="
                text-sm
                font-semibold
                text-[var(--foreground)]
              "
            >
              Pricing location
            </label>

            <span className="
              text-[10px]
              font-medium
              uppercase
              tracking-wider
              text-[var(--muted)]
            ">
              Optional override
            </span>
          </div>

          <div className="relative">
            <select
              id="collection-location"
              value={selectedLocation}
              onChange={(event) =>
                onChange(event.target.value)
              }
              className="
                h-14
                w-full
                appearance-none
                rounded-2xl
                border
                border-[var(--border)]
                bg-[var(--background)]
                px-4
                pr-11
                text-sm
                font-medium
                text-[var(--foreground)]
                outline-none
                transition
                duration-200
                focus:border-[var(--primary)]/50
                focus:ring-4
                focus:ring-[var(--primary)]/5
              "
            >
              <option value="">
                Use current location
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

            <ChevronDown
              size={17}
              className="
                pointer-events-none
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-[var(--muted)]
              "
            />
          </div>

          {/* ACTIVE OVERRIDE */}

          {selectedLocation && (
            <motion.div
              initial={{
                opacity: 0,
                y: -4,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="
                mt-2.5
                flex
                items-center
                gap-2
                rounded-xl
                bg-[var(--accent)]
                px-3
                py-2
                text-[11px]
                font-medium
                text-[var(--primary)]
              "
            >
              <Check
                size={14}
                strokeWidth={2.5}
              />

              Using {selectedLocation} for pricing
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LocationSection;