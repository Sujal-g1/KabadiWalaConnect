import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import useCurrentLocation from "./useCurrentLocation";
import useLanguageStore from "../store/languageStore";

import notificationSound from "../assets/audio/notification.mp3";

import {
  getWeather,
  createWeatherAlerts,
  createWeatherSummary,
} from "../services/weather/weatherService.js";

/* ==========================================================
   CONFIG
========================================================== */

const CHECK_INTERVAL =
  10 * 60 * 1000;

const NOTIFICATION_COOLDOWN =
  3 * 60 * 60 * 1000;

const WEATHER_TEST_STORAGE_KEY =
  "kabadiwala_weather_test";

/*
  Development-only weather scenarios.

  "off" = use real weather.
*/
export const WEATHER_TEST_SCENARIOS = {
  off: "off",
  sunny: "sunny",
  cloudy: "cloudy",
  rain: "rain",
  heavyRain: "heavyRain",
  thunderstorm: "thunderstorm",
  highWind: "highWind",
  extremeHeat: "extremeHeat",
  snow: "snow",
};

/* ==========================================================
   WEATHER TEST OVERRIDE
========================================================== */

const applyWeatherTestScenario = (
  weather,
  scenario
) => {
  if (
    !weather ||
    !import.meta.env.DEV ||
    !scenario ||
    scenario === "off"
  ) {
    return weather;
  }

  /*
   * We keep all the real weather fields and only override
   * the values that affect your alerts/summary.
   *
   * This means you don't have to create a completely new
   * fake weather object matching every field returned by
   * weatherService.js.
   */

  const scenarios = {
    sunny: {
      temperature: 28,
      weatherCode: 0,
      rain: 0,
      showers: 0,
      snowfall: 0,
      windSpeed: 12,
      rainProbability: 5,
      todayRainProbability: 5,
    },

    cloudy: {
      temperature: 25,
      weatherCode: 3,
      rain: 0,
      showers: 0,
      snowfall: 0,
      windSpeed: 18,
      rainProbability: 25,
      todayRainProbability: 30,
    },

    rain: {
      temperature: 24,
      weatherCode: 61,
      rain: 2,
      showers: 2,
      snowfall: 0,
      windSpeed: 18,
      rainProbability: 75,
      todayRainProbability: 80,
    },

    heavyRain: {
      temperature: 22,
      weatherCode: 65,
      rain: 8,
      showers: 8,
      snowfall: 0,
      windSpeed: 28,
      rainProbability: 95,
      todayRainProbability: 100,
    },

    thunderstorm: {
      temperature: 23,
      weatherCode: 95,
      rain: 10,
      showers: 10,
      snowfall: 0,
      windSpeed: 35,
      rainProbability: 100,
      todayRainProbability: 100,
    },

    highWind: {
      temperature: 27,
      weatherCode: 2,
      rain: 0,
      showers: 0,
      snowfall: 0,
      windSpeed: 65,
      rainProbability: 5,
      todayRainProbability: 10,
    },

    extremeHeat: {
      temperature: 43,
      weatherCode: 0,
      rain: 0,
      showers: 0,
      snowfall: 0,
      windSpeed: 10,
      rainProbability: 0,
      todayRainProbability: 0,
    },

    snow: {
      temperature: 1,
      weatherCode: 71,
      rain: 0,
      showers: 0,
      snowfall: 5,
      windSpeed: 10,
      rainProbability: 80,
      todayRainProbability: 90,
    },
  };

  const override =
    scenarios[scenario];

  if (!override) {
    return weather;
  }

  return {
    ...weather,
    ...override,

    /*
     * Keep useful metadata so the UI knows this is simulated.
     */
    isTestWeather: true,
    testScenario: scenario,
  };
};

/* ==========================================================
   HOOK
========================================================== */

export default function useWeatherAlerts() {
  const {
    latitude,
    longitude,
    refreshLocation,
  } = useCurrentLocation();

  const { language } =
    useLanguageStore();

  /* ========================================================
     STATE
  ======================================================== */

  const [weather, setWeather] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [
    notificationPermission,
    setNotificationPermission,
  ] = useState(() => {
    if (
      typeof window ===
      "undefined"
    ) {
      return "unsupported";
    }

    if (
      !("Notification" in window)
    ) {
      return "unsupported";
    }

    return Notification.permission;
  });

  /*
   * Weather testing.
   *
   * This only works in development.
   */
  const [
    weatherTestScenario,
    setWeatherTestScenarioState,
  ] = useState(() => {
    if (!import.meta.env.DEV) {
      return "off";
    }

    return (
      localStorage.getItem(
        WEATHER_TEST_STORAGE_KEY
      ) || "off"
    );
  });

  /*
   * Notification cooldown.
   */
  const notifiedAt =
    useRef(new Map());

  /*
   * Persistent audio instance.
   *
   * IMPORTANT:
   * Don't create a new Audio object every time.
   */
  const audioRef =
    useRef(null);

  /*
   * Whether the user has unlocked sound
   * through an interaction.
   */
  const [
    soundEnabled,
    setSoundEnabled,
  ] = useState(() => {
    if (
      typeof window ===
      "undefined"
    ) {
      return false;
    }

    return (
      localStorage.getItem(
        "kabadiwala_weather_sound_enabled"
      ) === "true"
    );
  });

  /* ========================================================
     AUDIO INITIALIZATION
  ======================================================== */

  useEffect(() => {
    if (
      typeof window ===
      "undefined"
    ) {
      return;
    }

    const audio =
      new Audio(notificationSound);

    audio.preload = "auto";
    audio.volume = 0.85;

    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.currentTime = 0;
      audioRef.current = null;
    };
  }, []);

  /* ========================================================
     ALERTS
  ======================================================== */

  const alerts = useMemo(
    () =>
      createWeatherAlerts(
        weather,
        language
      ),
    [weather, language]
  );

  /* ========================================================
     SUMMARY
  ======================================================== */

  const summary = useMemo(
    () =>
      createWeatherSummary(
        weather,
        language
      ),
    [weather, language]
  );

  /* ========================================================
     ENABLE SOUND

     MUST be called from a user interaction.
  ======================================================== */

  const enableAlertSound =
    useCallback(async () => {
      const audio =
        audioRef.current;

      if (!audio) {
        return false;
      }

      try {
        /*
         * Browser autoplay unlock.
         *
         * The function must be triggered by a click/tap.
         */
        audio.muted = true;
        audio.currentTime = 0;

        await audio.play();

        audio.pause();
        audio.currentTime = 0;
        audio.muted = false;

        localStorage.setItem(
          "kabadiwala_weather_sound_enabled",
          "true"
        );

        setSoundEnabled(true);

        return true;
      } catch (error) {
        console.warn(
          "Could not enable weather alert sound:",
          error
        );

        return false;
      }
    }, []);

  /* ========================================================
     DISABLE SOUND
  ======================================================== */

  const disableAlertSound =
    useCallback(() => {
      localStorage.setItem(
        "kabadiwala_weather_sound_enabled",
        "false"
      );

      setSoundEnabled(false);
    }, []);

  /* ========================================================
     PLAY SOUND
  ======================================================== */

  const playNotificationSound =
    useCallback(async () => {
      if (!soundEnabled) {
        return;
      }

      const audio =
        audioRef.current;

      if (!audio) {
        return;
      }

      try {
        audio.pause();
        audio.currentTime = 0;
        audio.volume = 0.85;
        audio.muted = false;

        await audio.play();
      } catch (error) {
        console.warn(
          "Weather notification sound blocked:",
          error
        );
      }
    }, [soundEnabled]);

  /* ========================================================
     SHOW BROWSER NOTIFICATION

     IMPORTANT:
     This function no longer automatically plays sound.
     Sound is handled separately.
  ======================================================== */

  const showBrowserNotification =
    useCallback((alert) => {
      if (
        typeof window ===
        "undefined"
      ) {
        return;
      }

      if (
        !("Notification" in window)
      ) {
        return;
      }

      if (
        Notification.permission !==
        "granted"
      ) {
        return;
      }

      try {
        new Notification(
          alert.title,
          {
            body:
              alert.message,
            icon:
              "/weatherFavicon.ico",
            tag: `eco-mitra-weather-${alert.type}`,
          }
        );
      } catch (error) {
        console.error(
          "Browser weather notification failed:",
          error
        );
      }
    }, []);

  /* ========================================================
     NOTIFY USER

     One place responsible for:
       1. Sound
       2. Browser notification
  ======================================================== */

  const notifyUser =
    useCallback(
      async (alert) => {
        if (!alert) {
          return;
        }

        await playNotificationSound();

        showBrowserNotification(
          alert
        );
      },
      [
        playNotificationSound,
        showBrowserNotification,
      ]
    );

  /* ========================================================
     CHECK WEATHER
  ======================================================== */

  const checkWeather =
    useCallback(async () => {
      if (
        typeof latitude !==
          "number" ||
        typeof longitude !==
          "number"
      ) {
        return null;
      }

      try {
        setLoading(true);
        setError("");

        /*
         * Always get real weather first.
         */
        const realWeather =
          await getWeather(
            latitude,
            longitude
          );

        /*
         * During development, override it
         * when a test scenario is active.
         */
        const finalWeather =
          applyWeatherTestScenario(
            realWeather,
            weatherTestScenario
          );

        setWeather(
          finalWeather
        );

        return finalWeather;
      } catch (err) {
        console.error(
          "Weather check failed:",
          err
        );

        setError(
          "Unable to get current weather"
        );

        return null;
      } finally {
        setLoading(false);
      }
    }, [
      latitude,
      longitude,
      weatherTestScenario,
    ]);

  /* ========================================================
     REQUEST NOTIFICATION PERMISSION
  ======================================================== */

  const requestNotificationPermission =
    useCallback(async () => {
      if (
        typeof window ===
          "undefined" ||
        !("Notification" in window)
      ) {
        setNotificationPermission(
          "unsupported"
        );

        return "unsupported";
      }

      /*
       * Because this function is triggered by a user click,
       * use this gesture to unlock our MP3 too.
       */
      await enableAlertSound();

      if (
        Notification.permission ===
        "granted"
      ) {
        setNotificationPermission(
          "granted"
        );

        if (alerts[0]) {
          await notifyUser(
            alerts[0]
          );
        }

        return "granted";
      }

      if (
        Notification.permission ===
        "denied"
      ) {
        setNotificationPermission(
          "denied"
        );

        return "denied";
      }

      try {
        const permission =
          await Notification.requestPermission();

        setNotificationPermission(
          permission
        );

        if (
          permission ===
            "granted" &&
          alerts[0]
        ) {
          await notifyUser(
            alerts[0]
          );
        }

        return permission;
      } catch (error) {
        console.error(
          "Notification permission request failed:",
          error
        );

        return "default";
      }
    }, [
      alerts,
      enableAlertSound,
      notifyUser,
    ]);

  /* ========================================================
     WEATHER CHECK LOOP
  ======================================================== */

  useEffect(() => {
    if (
      typeof latitude !==
        "number" ||
      typeof longitude !==
        "number"
    ) {
      return undefined;
    }

    checkWeather();

    const interval =
      setInterval(
        checkWeather,
        CHECK_INTERVAL
      );

    return () =>
      clearInterval(interval);
  }, [
    latitude,
    longitude,
    checkWeather,
  ]);

  /* ========================================================
     CLEAR COOLDOWN WHEN TEST SCENARIO CHANGES

     This makes development testing much easier.
  ======================================================== */

  useEffect(() => {
    if (!import.meta.env.DEV) {
      return;
    }

    notifiedAt.current.clear();
  }, [weatherTestScenario]);

  /* ========================================================
     SYSTEM NOTIFICATION
  ======================================================== */

  useEffect(() => {
    const alert = alerts[0];

    if (
      !alert ||
      notificationPermission !==
        "granted"
    ) {
      return;
    }

    const key =
      alert.type ||
      `${alert.title}-${alert.message}`;

    const now =
      Date.now();

    const last =
      notifiedAt.current.get(
        key
      ) || 0;

    if (
      now - last <
      NOTIFICATION_COOLDOWN
    ) {
      return;
    }

    notifiedAt.current.set(
      key,
      now
    );

    notifyUser(alert);
  }, [
    alerts,
    notificationPermission,
    notifyUser,
  ]);

  /* ========================================================
     WEATHER TEST CONTROLS
  ======================================================== */

  const setWeatherTestScenario =
    useCallback((scenario) => {
      if (!import.meta.env.DEV) {
        return;
      }

      if (
        !Object.values(
          WEATHER_TEST_SCENARIOS
        ).includes(scenario)
      ) {
        return;
      }

      localStorage.setItem(
        WEATHER_TEST_STORAGE_KEY,
        scenario
      );

      /*
       * Reset alert cooldown so changing
       * test scenarios immediately tests
       * the notification again.
       */
      notifiedAt.current.clear();

      setWeatherTestScenarioState(
        scenario
      );
    }, []);

  const resetWeatherTest =
    useCallback(() => {
      if (!import.meta.env.DEV) {
        return;
      }

      localStorage.removeItem(
        WEATHER_TEST_STORAGE_KEY
      );

      notifiedAt.current.clear();

      setWeatherTestScenarioState(
        "off"
      );
    }, []);

  /* ========================================================
     RETURN
  ======================================================== */

  return {
    alerts,
    weather,
    summary,

    loading,
    error,

    checkWeather,
    refreshLocation,

    notificationPermission,
    requestNotificationPermission,

    /*
     * Sound
     */
    soundEnabled,
    enableAlertSound,
    disableAlertSound,
    playNotificationSound,

    /*
     * Development weather testing
     */
    weatherTestScenario,
    setWeatherTestScenario,
    resetWeatherTest,
    weatherTestScenarios:
      WEATHER_TEST_SCENARIOS,

    location: {
      latitude,
      longitude,
    },
  };
}