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

const translations = {
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

const getTranslation = (language, key) => {
  const keys = key.split(".");

  let value = translations[language];

  for (const currentKey of keys) {
    value = value?.[currentKey];
  }

  // English fallback
  if (value === undefined) {
    value = translations.en;

    for (const currentKey of keys) {
      value = value?.[currentKey];
    }
  }

  return value ?? key;
};

export const createTranslator = (language) => {
  return (key) => getTranslation(language, key);
};

export default translations;