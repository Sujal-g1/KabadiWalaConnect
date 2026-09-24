import {
  getWeatherCopy,
} from "./weatherTranslations.js";

const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

export const WEATHER_TEST_MODE = false;


const WEATHER_META = {
  0: { key: "clear", icon: "☀️" },
  1: { key: "mainlyClear", icon: "🌤️" },
  2: { key: "partlyCloudy", icon: "⛅" },
  3: { key: "overcast", icon: "☁️" },
  45: { key: "fog", icon: "🌫️" },
  48: { key: "fog", icon: "🌫️" },
  51: { key: "drizzle", icon: "🌦️" },
  53: { key: "drizzle", icon: "🌦️" },
  55: { key: "drizzle", icon: "🌧️" },
  56: { key: "drizzle", icon: "🌧️" },
  57: { key: "drizzle", icon: "🌧️" },
  61: { key: "rain", icon: "🌦️" },
  63: { key: "rain", icon: "🌧️" },
  65: { key: "heavyRain", icon: "🌧️" },
  66: { key: "rain", icon: "🌧️" },
  67: { key: "heavyRain", icon: "🌧️" },
  71: { key: "snow", icon: "🌨️" },
  73: { key: "snow", icon: "🌨️" },
  75: { key: "snow", icon: "❄️" },
  77: { key: "snow", icon: "❄️" },
  80: { key: "rain", icon: "🌦️" },
  81: { key: "rain", icon: "🌧️" },
  82: { key: "heavyRain", icon: "⛈️" },
  85: { key: "snow", icon: "🌨️" },
  86: { key: "snow", icon: "❄️" },
  95: { key: "thunderstorm", icon: "⛈️" },
  96: { key: "thunderstorm", icon: "⛈️" },
  99: { key: "thunderstorm", icon: "⛈️" },
};

const round = (value, decimals = 0) => {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return 0;
  const factor = 10 ** decimals;
  return Math.round(numeric * factor) / factor;
};

export async function getWeather(
  latitude,
  longitude
) {
  const url = new URL(WEATHER_URL);

  url.searchParams.set("latitude", latitude);
  url.searchParams.set("longitude", longitude);

  url.searchParams.set(
    "current",
    [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "precipitation",
      "rain",
      "showers",
      "snowfall",
      "weather_code",
      "cloud_cover",
      "wind_speed_10m",
      "wind_direction_10m",
      "wind_gusts_10m",
      "is_day",
    ].join(",")
  );

  url.searchParams.set(
    "hourly",
    [
      "temperature_2m",
      "apparent_temperature",
      "relative_humidity_2m",
      "precipitation_probability",
      "precipitation",
      "rain",
      "showers",
      "snowfall",
      "weather_code",
      "cloud_cover",
      "wind_speed_10m",
      "wind_gusts_10m",
    ].join(",")
  );

  url.searchParams.set(
    "daily",
    [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "apparent_temperature_max",
      "apparent_temperature_min",
      "sunrise",
      "sunset",
      "precipitation_sum",
      "rain_sum",
      "showers_sum",
      "snowfall_sum",
      "precipitation_probability_max",
      "wind_speed_10m_max",
      "wind_gusts_10m_max",
    ].join(",")
  );

  url.searchParams.set("forecast_days", "1");
  url.searchParams.set("timezone", "auto");
  url.searchParams.set("temperature_unit", "celsius");
  url.searchParams.set("wind_speed_unit", "kmh");
  url.searchParams.set("precipitation_unit", "mm");

  const response = await fetch(
    url.toString()
  );

  if (!response.ok) {
    throw new Error(
      `Weather API failed with status ${response.status}`
    );
  }

  return response.json();
}

export function getWeatherMeta(
  code
) {
  return (
    WEATHER_META[code] || {
      key: "unknown",
      icon: "🌡️",
    }
  );
}

export function getWeatherDescription(
  code,
  language = "en"
) {
  const copy = getWeatherCopy(language);
  const meta = getWeatherMeta(code);

  return {
    key: meta.key,
    label:
      copy[meta.key] ||
      copy.unknown,
    icon: meta.icon,
  };
}

const getCurrentHourlyIndex = (
  weather
) => {
  const times =
    weather?.hourly?.time || [];

  const currentTime =
    weather?.current?.time;

  if (!times.length) return 0;

  const exact = currentTime
    ? times.indexOf(currentTime)
    : -1;

  if (exact >= 0) return exact;

  const target = currentTime
    ? new Date(currentTime).getTime()
    : Date.now();

  let bestIndex = 0;
  let bestDifference = Infinity;

  times.forEach(
    (time, index) => {
      const difference = Math.abs(
        new Date(time).getTime() -
          target
      );

      if (difference < bestDifference) {
        bestDifference = difference;
        bestIndex = index;
      }
    }
  );

  return bestIndex;
};

export function getRainForecast(weather) {
  const hourly =
    weather?.hourly || {};

  const times =
    hourly.time || [];

  const probabilities =
    hourly.precipitation_probability ||
    [];

  const weatherCodes =
    hourly.weather_code || [];

  const startIndex =
    getCurrentHourlyIndex(weather);

  const nextHours = times
    .slice(
      startIndex,
      startIndex + 6
    )
    .map(
      (time, offset) => {
        const index =
          startIndex + offset;

        return {
          time,

          probability:
            Number(
              probabilities[index]
            ) || 0,

          weatherCode:
            Number(
              weatherCodes[index]
            ),
        };
      }
    );

  const maxNext6Hours =
    nextHours.length
      ? Math.max(
          ...nextHours.map(
            (item) =>
              item.probability
          )
        )
      : 0;

  const maxToday =
    Number(
      weather?.daily
        ?.precipitation_probability_max?.[0]
    ) || 0;

  const rainWindow =
    nextHours.find(
      (item) =>
        item.probability >= 50
    );

  /* ========================================================
     STORM DETECTION

     WMO:
     95 = thunderstorm
     96 = thunderstorm + hail
     99 = thunderstorm + heavy hail
  ======================================================== */

  const stormWindow =
    nextHours.find(
      (item) =>
        item.weatherCode >= 95 &&
        item.weatherCode <= 99
    );

  return {
    maxNext6Hours:
      Math.round(
        maxNext6Hours
      ),

    maxToday:
      Math.round(maxToday),

    rainWindow:
      rainWindow || null,

    stormWindow:
      stormWindow || null,
  };
}

const interpolate = (
  value,
  params = {}
) => {
  if (
    typeof value !== "function"
  ) {
    return value;
  }

  return value(params);
};

const getAdvice = ({
  weather,
  language,
  rain,
  weatherKey,
}) => {
  const copy = getWeatherCopy(language);
  const current = weather.current;

  const currentCode =
    Number(current.weather_code);

  const thunderstorm =
    currentCode >= 95;

  const heavyRain =
    currentCode === 65 ||
    currentCode === 82 ||
    Number(current.rain) >= 5 ||
    Number(current.showers) >= 5;

  const rainingNow =
    Number(current.rain) > 0 ||
    Number(current.showers) > 0 ||
    (currentCode >= 51 &&
      currentCode <= 67);

  const highWind =
    Number(current.wind_speed_10m) >= 50;

  const heat =
    Number(current.temperature_2m) >= 40;

  if (thunderstorm) {
    return {
      type: "avoid",
      key: "thunderstorm",
      message: copy.adviceThunderstorm,
    };
  }

  if (heavyRain) {
    return {
      type: "avoid",
      key: "heavyRain",
      message: copy.adviceHeavyRain,
    };
  }

  if (highWind) {
    return {
      type: "avoid",
      key: "wind",
      message: copy.adviceWind,
    };
  }

  if (heat) {
    return {
      type: "caution",
      key: "heat",
      message: copy.adviceHeat,
    };
  }

  if (rainingNow || ["rain", "heavyRain", "drizzle"].includes(weatherKey)) {
    return {
      type: "caution",
      key: "rain",
      message: copy.adviceRainNow,
    };
  }

  if (rain.stormWindow) {
  return {
    type: "avoid",
    key: "stormSoon",
    message:
      copy.adviceThunderstorm,
  };
}

  if (rain.maxNext6Hours >= 60) {
    return {
      type: "caution",
      key: "rainSoon",
      message: interpolate(
        copy.adviceRainSoon,
        {
          chance:
            rain.maxNext6Hours,
        }
      ),
    };
  }

  if (
    weatherKey === "fog"
  ) {
    return {
      type: "caution",
      key: "fog",
      message: copy.adviceFog,
    };
  }

  if (
    weatherKey === "snow"
  ) {
    return {
      type: "caution",
      key: "snow",
      message: copy.adviceSnow,
    };
  }

  if (
    weatherKey ===
      "partlyCloudy" ||
    weatherKey ===
      "overcast"
  ) {
    return {
      type: "good",
      key: "cloudy",
      message: copy.adviceCloudy,
    };
  }

  return {
    type: "good",
    key: "clear",
    message: copy.adviceGood,
  };
};

export function createWeatherSummary(
  weather,
  language = "en"
) {
  const current = weather?.current;

  if (!current) {
    return null;
  }

  const description =
    getWeatherDescription(
      current.weather_code,
      language
    );

  const rain = getRainForecast(weather);
  
  const nextSixHours = getNextSixHours( weather, language );

  const advice =
    getAdvice({
      weather,
      language,
      rain,
      weatherKey:
        description.key,
    });

    const copy = getWeatherCopy( language );

  return {
    icon: description.icon,
    weatherKey: description.key,
    label: description.label,

    temperature: round(current.temperature_2m),
    feelsLike: round(current.apparent_temperature),
    humidity: round(current.relative_humidity_2m),
    windSpeed: round(current.wind_speed_10m),
    rainChance: rain.maxNext6Hours,
    todayRainChance: rain.maxToday,
    rainWindow: rain.rainWindow?.time || null,

    stormRisk:  rain.stormWindow ? {
        detected: true,
        time:
          rain.stormWindow.time,
        weatherCode:
          rain.stormWindow.weatherCode,
      }
    : {
        detected: false,

        time: null,

        weatherCode: null,
      },

nextSixHours,
    outdoorStatus:advice.type,
    advice: advice.message,
    notificationTitle: copy.weatherUpdate,

    notificationBody:
      advice.type === "good"
        ? copy.notificationBodyGood
        : advice.message,

    ui: {
      weatherUpdate:
        copy.weatherUpdate,
      feelsLike:
        copy.feelsLike,
      rainChance:
        copy.rainChance,
      nextHours:
        copy.nextHours,
      good:
        copy.good,
      caution:
        copy.caution,
      avoid:
        copy.avoid,
      enableNotifications:
        copy.enableNotifications,
      notificationsEnabled:
        copy.notificationsEnabled,
      refresh: copy.refresh,
    },
  };
}

export function createWeatherAlerts(
  weather,
  language = "en"
) {
  if (!weather?.current) {
    return [];
  }

  if (WEATHER_TEST_MODE) {
    const copy = getWeatherCopy(language);

    return [
      {
        type: "heavy_rain",
        severity: "high",
        title: copy.heavyRain,
        message: copy.adviceHeavyRain,
      },
    ];
  }

  const summary =
    createWeatherSummary(
      weather,
      language
    );

  if (!summary) {
    return [];
  }

  const type =
    summary.adviceKey ===
    "thunderstorm"
      ? "thunderstorm"
      : summary.adviceKey ===
          "heavyRain"
        ? "heavy_rain"
        : summary.adviceKey ===
            "heat"
          ? "heat"
          : summary.adviceKey ===
              "wind"
            ? "wind"
            : summary.adviceKey ===
                "rain"
              ? "rain"
              : summary.adviceKey ===
                  "rainSoon"
                ? "rain_soon"
                : "weather_update";

  const severity =
    summary.outdoorStatus ===
    "avoid"
      ? "high"
      : summary.outdoorStatus ===
          "caution"
        ? "medium"
        : "info";

  return [
    {
      type,
      severity,
      title: summary.ui.weatherUpdate,
      message:
        summary.advice,
      icon: summary.icon,
    },
  ];
}

export const getNextSixHours = (
  weather,
  language = "en"
) => {
  if (
    !weather?.hourly?.time ||
    !weather?.hourly?.temperature_2m
  ) {
    return [];
  }

  const times =
    weather.hourly.time;

  const temperatures =
    weather.hourly.temperature_2m;

  const apparentTemperatures =
    weather.hourly.apparent_temperature ||
    [];

  const precipitationProbabilities =
    weather.hourly
      .precipitation_probability ||
    [];

  const weatherCodes =
    weather.hourly.weather_code ||
    [];

  const rain =
    weather.hourly.rain ||
    [];

  const showers =
    weather.hourly.showers ||
    [];

  const windSpeeds =
    weather.hourly.wind_speed_10m ||
    [];

  /*
   * Open-Meteo's hourly time array is already
   * returned in the requested local timezone.
   *
   * Find the current forecast hour.
   */

  const currentTime =
    weather.current?.time;

  let currentIndex =
    times.findIndex(
      (time) =>
        time === currentTime
    );

  /*
   * Small fallback if the current API time
   * doesn't exactly match the hourly timestamp.
   */

  if (currentIndex === -1) {
    const now =
      new Date(
        currentTime ||
          Date.now()
      ).getTime();

    let closestIndex = 0;
    let smallestDifference =
      Infinity;

    times.forEach(
      (time, index) => {
        const difference =
          Math.abs(
            new Date(time).getTime() -
              now
          );

        if (
          difference <
          smallestDifference
        ) {
          smallestDifference =
            difference;

          closestIndex =
            index;
        }
      }
    );

    currentIndex =
      closestIndex;
  }

  return times
    .slice(
      currentIndex,
      currentIndex + 6
    )
    .map(
      ( time, offset ) => {
        const index = currentIndex + offset;
        const weatherCode = weatherCodes[index];

        const description = getWeatherDescription( weatherCode, language);

       return {
  time,

  temperature:
    Math.round(
      temperatures[index] ?? 0
    ),

  feelsLike:
    Math.round(
      apparentTemperatures[index] ??
        temperatures[index] ??
        0
    ),

  rainChance:
    precipitationProbabilities[
      index
    ] ?? 0,

  weatherCode,

  icon:
    description.icon,

  label:
    description.label,

  weatherKey:
    description.key,

  rain:
    rain[index] ?? 0,

  showers:
    showers[index] ?? 0,

  windSpeed:
    Math.round(
      windSpeeds[index] ?? 0
    ),

  isNow:
    offset === 0,
};
      }
    );
};

