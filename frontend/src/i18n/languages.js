export const SUPPORTED_LANGUAGES = [
  {
    code: "en",
    label: "English",
    nativeLabel: "English",
  },
  {
    code: "hi",
    label: "Hindi",
    nativeLabel: "हिन्दी",
  },
  {
    code: "mr",
    label: "Marathi",
    nativeLabel: "मराठी",
  },
  {
    code: "pa",
    label: "Punjabi",
    nativeLabel: "ਪੰਜਾਬੀ",
  },
  {
    code: "gu",
    label: "Gujarati",
    nativeLabel: "ગુજરાતી",
  },
  {
    code: "bn",
    label: "Bengali",
    nativeLabel: "বাংলা",
  },
  {
    code: "ta",
    label: "Tamil",
    nativeLabel: "தமிழ்",
  },
  {
    code: "te",
    label: "Telugu",
    nativeLabel: "తెలుగు",
  },
  {
    code: "kn",
    label: "Kannada",
    nativeLabel: "ಕನ್ನಡ",
  },
  {
    code: "ml",
    label: "Malayalam",
    nativeLabel: "മലയാളം",
  },
  {
    code: "or",
    label: "Odia",
    nativeLabel: "ଓଡ଼ିଆ",
  },
  {
    code: "as",
    label: "Assamese",
    nativeLabel: "অসমীয়া",
  },
];

export const SUPPORTED_LANGUAGE_CODES =
  SUPPORTED_LANGUAGES.map(
    (language) => language.code
  );

export const STATE_LANGUAGE_MAP = {
  // Hindi
  "IN-UP": "hi",
  "IN-UK": "hi",
  "IN-DL": "hi",
  "IN-HR": "hi",
  "IN-RJ": "hi",
  "IN-MP": "hi",
  "IN-BR": "hi",
  "IN-JH": "hi",
  "IN-CT": "hi",
  "IN-HP": "hi",

  // Marathi
  "IN-MH": "mr",

  // Punjabi
  "IN-PB": "pa",

  // Gujarati
  "IN-GJ": "gu",

  // Bengali
  "IN-WB": "bn",

  // Odia
  "IN-OD": "or",
  "IN-OR": "or",

  // Assamese
  "IN-AS": "as",

  // South India
  "IN-TN": "ta",
  "IN-AP": "te",
  "IN-TS": "te",
  "IN-KA": "kn",
  "IN-KL": "ml",
};

export const DEFAULT_LANGUAGE = "en";

export const getLanguageForState = (stateCode) => {
  return (
    STATE_LANGUAGE_MAP[stateCode] ||
    DEFAULT_LANGUAGE
  );
};