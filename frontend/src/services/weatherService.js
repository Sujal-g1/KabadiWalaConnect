const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

export const WEATHER_TEST_MODE = false;

export async function getWeather(latitude, longitude) {
  const url = new URL(WEATHER_URL);

  url.searchParams.set("latitude", latitude);
  url.searchParams.set("longitude", longitude);
  url.searchParams.set(
    "current",
    "temperature_2m,relative_humidity_2m,precipitation,rain,showers,snowfall,weather_code,wind_speed_10m"
  );
  url.searchParams.set(
    "hourly",
    "precipitation_probability,precipitation,rain,showers,weather_code"
  );
  url.searchParams.set("forecast_days", "1");
  url.searchParams.set("timezone", "auto");

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Unable to fetch weather data");
  }

  return response.json();
}

export function createWeatherAlerts(weather) {
  const alerts = [];
  if (WEATHER_TEST_MODE) {
    return [
        {
            type: "heavy_rain",
            severity: "high",
            title: "Heavy Rain Alert",
            message:
                "Heavy rain is currently affecting your area. Outdoor e-waste collection may be delayed.",
        },
        {
            type: "rain",
            severity: "medium",
            title: "Rain Alert",
            message:
                "Rain is currently reported in your area. Take precautions during outdoor collection.",
        },
        {
            type: "wind",
            severity: "high",
            title: "High Wind Alert",
            message:
                "Strong winds are currently reported. Outdoor collection and transport may be unsafe.",
        },
        {
            type: "heat",
            severity: "high",
            title: "Heat Alert",
            message:
                "Very high temperature detected. Take precautions and stay hydrated during collection.",
        },
    ];
  }
  const current = weather.current;

  if (!current) {
    return alerts;
  }

  if (current.rain > 5 || current.showers > 5) {
    alerts.push({
      type: "rain",
      severity: "high",
      title: "Heavy Rain Alert",
      message:
        "Heavy rain is currently affecting your area. Outdoor e-waste collection may be delayed.",
    });
  } if (current.rain > 0 || current.showers > 0) {
    alerts.push({
      type: "rain",
      severity: "medium",
      title: "Rain Alert",
      message:
        "Rain is currently reported in your area. Take precautions during outdoor collection.",
    });
  }

  if (current.wind_speed_10m >= 50) {
    alerts.push({
      type: "wind",
      severity: "high",
      title: "High Wind Alert",
      message:
        "Strong winds are currently reported. Outdoor collection and transport may be unsafe.",
    });
  }

  if (current.temperature_2m >= 40) {
    alerts.push({
      type: "heat",
      severity: "high",
      title: "Heat Alert",
      message:
        "Very high temperature detected. Take precautions and stay hydrated during collection.",
    });
  }
if (alerts.length === 0) {
  alerts.push({
    type: "normal",
    severity: "low",
    title: "Good Weather Today",
    message:
      "Today's weather is suitable for outdoor e-waste collection. You can go for collection or visit a recycler safely.",
  });
}

return alerts;
}