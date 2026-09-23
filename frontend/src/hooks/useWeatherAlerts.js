import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import useCurrentLocation from "./useCurrentLocation";

import notificationSound from "../assets/audio/notification.mp3";

import {
  getWeather,
  createWeatherAlerts,
} from "../services/weatherService";

const CHECK_INTERVAL = 10 * 60 * 1000; // 10 minutes

export default function useWeatherAlerts() {
  const { location, refreshLocation } = useCurrentLocation();
  

  const [alerts, setAlerts] = useState([]);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Keeps track of alerts that have already been notified
  const notifiedAlerts = useRef(new Set());

  const checkWeather = useCallback(async () => {
    console.log("WEATHER CHECK STARTED");
    console.log("WEATHER LOCATION:", location);

    if (!location?.latitude || !location?.longitude) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await getWeather(
        location.latitude,
        location.longitude
      );
      console.log("WEATHER DATA:", data);

      setWeather(data);

      const newAlerts = createWeatherAlerts(data);

      console.log("WEATHER ALERTS:", newAlerts);

      setAlerts(newAlerts);

      // If there are no active alerts,
      // allow the same alert to notify again later.
      if (newAlerts.length === 0) {
        notifiedAlerts.current.clear();
        return;
      }

      // Browser notifications
      if ("Notification" in window) {
        if (Notification.permission === "default") {
          await Notification.requestPermission();
        }

        if (Notification.permission === "granted") {
          newAlerts.forEach((alert) => {
            // Prevent duplicate notifications
            if (notifiedAlerts.current.has(alert.type)) {
              return;
            }

            const audio = new Audio(notificationSound);
            audio.volume = 1.0;
            audio.play().catch(() => {});

            new Notification(alert.title, {
              body: alert.message,
              icon: "/favicon.ico",
            });

            notifiedAlerts.current.add(alert.type);
          });
        }
      }
    } catch (err) {
      console.error("Weather check failed:", err);
      setError("Unable to get current weather");
    } finally {
      setLoading(false);
    }
  }, [location?.latitude, location?.longitude]);

  useEffect(() => {
    console.log("WEATHER EFFECT LOCATION:", location);
    if (!location?.latitude || !location?.longitude) {
        return;
    }

    checkWeather();

    const interval = setInterval(() => {
        checkWeather();
    }, CHECK_INTERVAL);

    return () => clearInterval(interval);
}, [
    location?.latitude,
    location?.longitude,
    checkWeather,
]);
    // Then check every 10 minutes

  return {
    alerts,
    weather,
    loading,
    error,
    checkWeather,
    refreshLocation,
    location,
  };
}