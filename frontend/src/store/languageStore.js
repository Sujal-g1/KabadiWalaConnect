import { create } from "zustand";

import {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGE_CODES,
} from "../i18n/languages.js";

const getStoredLanguage = () => {
  if (typeof window === "undefined") {
    return DEFAULT_LANGUAGE;
  }

  const stored =
    localStorage.getItem(
      "kabadiwala_language"
    );

  if (
    stored &&
    SUPPORTED_LANGUAGE_CODES.includes(stored)
  ) {
    return stored;
  }

  return DEFAULT_LANGUAGE;
};

const getStoredSource = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(
    "kabadiwala_language_source"
  );
};

const useLanguageStore = create((set) => ({
  language: getStoredLanguage(),

  /*
    null   → never detected
    region → automatically selected
    user   → manually selected
  */
  languageSource: getStoredSource(),

  setLanguage: (
    language,
    source = "user"
  ) => {
    if (
      !SUPPORTED_LANGUAGE_CODES.includes(
        language
      )
    ) {
      return;
    }

    localStorage.setItem(
      "kabadiwala_language",
      language
    );

    localStorage.setItem(
      "kabadiwala_language_source",
      source
    );

    set({
      language,
      languageSource: source,
    });
  },
}));

export default useLanguageStore;