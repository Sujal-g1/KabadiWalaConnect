/* ============================================================
   DEFAULT LANGUAGE
============================================================ */

export const DEFAULT_LANGUAGE = "en";

/* ============================================================
   SUPPORTED LANGUAGES
============================================================ */

export const SUPPORTED_LANGUAGES = [
  {
    code: "en",
    nativeLabel: "English",
    name: "English",
  },
  {
    code: "hi",
    nativeLabel: "हिन्दी",
    name: "Hindi",
  },
  {
    code: "mr",
    nativeLabel: "मराठी",
    name: "Marathi",
  },
  {
    code: "pa",
    nativeLabel: "ਪੰਜਾਬੀ",
    name: "Punjabi",
  },
  {
    code: "gu",
    nativeLabel: "ગુજરાતી",
    name: "Gujarati",
  },
  {
    code: "bn",
    nativeLabel: "বাংলা",
    name: "Bengali",
  },
  {
    code: "ta",
    nativeLabel: "தமிழ்",
    name: "Tamil",
  },
  {
    code: "te",
    nativeLabel: "తెలుగు",
    name: "Telugu",
  },
  {
    code: "kn",
    nativeLabel: "ಕನ್ನಡ",
    name: "Kannada",
  },
  {
    code: "ml",
    nativeLabel: "മലയാളം",
    name: "Malayalam",
  },
  {
    code: "or",
    nativeLabel: "ଓଡ଼ିଆ",
    name: "Odia",
  },
  {
    code: "as",
    nativeLabel: "অসমীয়া",
    name: "Assamese",
  },
];

/* ============================================================
   SUPPORTED LANGUAGE CODES
============================================================ */

export const SUPPORTED_LANGUAGE_CODES =
  SUPPORTED_LANGUAGES.map(
    (language) => language.code
  );

/* ============================================================
   INDIAN STATE → LANGUAGE MAP
============================================================ */

export const STATE_LANGUAGE_MAP = {
  /* Hindi */
  "IN-UP": "mr",
  "IN-UK": "hi",
  "IN-DL": "hi",
  "IN-HR": "hi",
  "IN-RJ": "hi",
  "IN-MP": "hi",
  "IN-BR": "hi",
  "IN-JH": "hi",
  "IN-CT": "hi",
  "IN-HP": "hi",

  /* Marathi */
  "IN-MH": "mr",

  /* Punjabi */
  "IN-PB": "pa",

  /* Gujarati */
  "IN-GJ": "gu",

  /* Bengali */
  "IN-WB": "bn",

  /* Odia */
  "IN-OD": "or",
  "IN-OR": "or",

  /* Assamese */
  "IN-AS": "as",

  /* Tamil */
  "IN-TN": "ta",

  /* Telugu */
  "IN-AP": "te",
  "IN-TS": "te",

  /* Kannada */
  "IN-KA": "kn",

  /* Malayalam */
  "IN-KL": "ml",
};

/* ============================================================
   GET LANGUAGE FOR STATE
============================================================ */

export const getLanguageForState = (stateCode) => {
  if (!stateCode) {
    return DEFAULT_LANGUAGE;
  }

  return (
    STATE_LANGUAGE_MAP[stateCode.toUpperCase()] ||
    DEFAULT_LANGUAGE
  );
};

/* ============================================================
   TRANSLATION FILES
============================================================ */

import en from "./locales/en";
import hi from "./locales/hi";
import mr from "./locales/mr";
import pa from "./locales/pa";
import gu from "./locales/gu";
import bn from "./locales/bn";
import ta from "./locales/ta";
import te from "./locales/te";
import kn from "./locales/kn";
import ml from "./locales/ml";
import or from "./locales/or";
import as from "./locales/as";

/* ============================================================
   TRANSLATION REGISTRY
============================================================ */

export const translations = {
  en,
  hi,
  mr,
  pa,
  gu,
  bn,
  ta,
  te,
  kn,
  ml,
  or,
  as,
};

/* ============================================================
   GET TRANSLATION
============================================================ */

export const getTranslation = (
  language,
  key
) => {
  /*
    Invalid / unsupported language
    → fallback to English
  */
  const selectedLanguage =
    SUPPORTED_LANGUAGE_CODES.includes(language)
      ? language
      : DEFAULT_LANGUAGE;

  const keys = key.split(".");

  /* ----------------------------------------------------------
     Try selected language
  ---------------------------------------------------------- */

  let value = translations[selectedLanguage];

  for (const currentKey of keys) {
    value = value?.[currentKey];
  }

  if (value !== undefined) {
    return value;
  }

  /* ----------------------------------------------------------
     Fallback to English
  ---------------------------------------------------------- */

  value = translations[DEFAULT_LANGUAGE];

  for (const currentKey of keys) {
    value = value?.[currentKey];
  }

  return value ?? key;
};

/* ============================================================
   GET LANGUAGE DETAILS
============================================================ */

export const getLanguageDetails = (language) => {
  return (
    SUPPORTED_LANGUAGES.find(
      (item) => item.code === language
    ) ||
    SUPPORTED_LANGUAGES.find(
      (item) => item.code === DEFAULT_LANGUAGE
    )
  );
};