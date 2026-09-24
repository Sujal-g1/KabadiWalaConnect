import { CloudRain } from "lucide-react";

const formatHour = (
  time,
  isNow
) => {
  if (isNow) {
    return "Now";
  }

  if (!time) {
    return "--";
  }

  const [hour] =
    time
      .split("T")[1]
      ?.split(":") || [];

  const numericHour =
    Number(hour);

  if (
    !Number.isFinite(
      numericHour
    )
  ) {
    return "--";
  }

  const suffix =
    numericHour >= 12
      ? "PM"
      : "AM";

  const displayHour =
    numericHour % 12 || 12;

  return `${displayHour} ${suffix}`;
};

const WeatherForecastStrip = ({
  hours = [],
  compact = false,
}) => {
  if (!hours.length) {
    return null;
  }

  return (
    <div
      className="
        overflow-x-auto
        scrollbar-none
      "
    >
      <div
        className={`
          flex
          min-w-max
          items-center
          ${
            compact
              ? "py-1"
              : "py-1.5"
          }
        `}
      >
        {hours.map(
          (
            hour,
            index
          ) => {
            const highRain =
              hour.rainChance >=
              50;

            const storm =
              hour.weatherCode >=
                95 &&
              hour.weatherCode <=
                99;

            return (
              <div
                key={`${hour.time}-${index}`}
                className={`
                  flex
                  shrink-0
                  flex-col
                  items-center
                  justify-center
                  ${
                    compact
                      ? "w-[58px] px-1.5"
                      : "w-[72px] px-2"
                  }
                  ${
                    index !== 0
                      ? "border-l border-black/5"
                      : ""
                  }
                `}
              >
                {/* TIME */}

                <span
                  className={`
                    font-black
                    ${
                      compact
                        ? "text-[8px]"
                        : "text-[9px]"
                    }
                    ${
                      hour.isNow
                        ? "text-[#123F2D]"
                        : "text-[#315D49]"
                    }
                  `}
                >
                  {formatHour(
                    hour.time,
                    hour.isNow
                  )}
                </span>

                {/* ICON */}

                <span
                  className={`
                    mt-1
                    leading-none
                    ${
                      compact
                        ? "text-sm"
                        : "text-base"
                    }
                  `}
                >
                  {hour.icon ||
                    "🌤️"}
                </span>

                {/* TEMPERATURE */}

                <span
                  className={`
                    mt-1
                    font-black
                    ${
                      compact
                        ? "text-[10px]"
                        : "text-[11px]"
                    }
                    text-[#123F2D]
                  `}
                >
                  {hour.temperature}°
                </span>

                {/* RAIN / STORM */}

                {(highRain ||
                  storm) && (
                  <span
                    className={`
                      mt-1
                      flex
                      items-center
                      gap-0.5
                      font-black
                      ${
                        compact
                          ? "text-[7px]"
                          : "text-[8px]"
                      }
                      ${
                        storm
                          ? "text-[#7D2622]"
                          : "text-[#278F8B]"
                      }
                    `}
                  >
                    {storm ? (
                      "⛈️"
                    ) : (
                      <CloudRain
                        size={
                          compact
                            ? 8
                            : 9
                        }
                      />
                    )}

                    {hour.rainChance}%
                  </span>
                )}
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default WeatherForecastStrip;