const STATE_LANGUAGE_MAP = {
  "IN-UP": "ta", // TEMPORARY TEST
  "IN-UK": "hi",
  "IN-DL": "hi",
  "IN-HR": "hi",
  "IN-RJ": "hi",
  "IN-MP": "hi",
  "IN-BR": "hi",
  "IN-JH": "hi",
  "IN-CT": "hi",
  "IN-HP": "hi",

  "IN-MH": "mr",
  "IN-PB": "pa",
  "IN-GJ": "gu",
  "IN-WB": "bn",

  "IN-OD": "or",
  "IN-OR": "or",

  "IN-AS": "as",

  "IN-TN": "ta",
  "IN-AP": "te",
  "IN-TS": "te",
  "IN-KA": "kn",
  "IN-KL": "ml",
};

const DEFAULT_LANGUAGE = "en";

export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(
        new Error(
          "Geolocation is not supported by this browser."
        )
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
      },
      (error) => {
        console.error(
          "Geolocation error:",
          error
        );

        reject(error);
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 10 * 60 * 1000,
      }
    );
  });
};

export const getRegionFromCoordinates = async ({
  latitude,
  longitude,
}) => {
  const params = new URLSearchParams({
    format: "jsonv2",
    addressdetails: "1",
    lat: latitude,
    lon: longitude,
    zoom: "10",
  });

  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error(
      "Unable to determine location."
    );
  }

  const data = await response.json();

  const address = data?.address || {};

  const countryCode =
    address.country_code?.toUpperCase() || "";

  const city =
    address.city ||
    address.town ||
    address.village ||
    address.municipality ||
    "";

  const state =
    address.state || "";

  const stateCode =
    address["ISO3166-2-lvl4"] || "";

  const language =
    STATE_LANGUAGE_MAP[stateCode] ||
    DEFAULT_LANGUAGE;

  const result = {
    city,
    state,
    stateCode,
    countryCode,
    language,
    latitude,
    longitude,
  };

  console.log(
    "Reverse geocoded region:",
    result
  );

  return result;
};