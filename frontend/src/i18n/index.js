import en from "./locales/en";
import hi from "./locales/hi";
import mr from "./locales/mr";

const translations = {
  en,
  hi,
  mr,
};

const getTranslation = (language, key) => {
  const keys = key.split(".");

  let value = translations[language];

  for (const currentKey of keys) {
    value = value?.[currentKey];
  }

  return value || key;
};

export const createTranslator = (language) => {
  return (key) => getTranslation(language, key);
};

export default translations;