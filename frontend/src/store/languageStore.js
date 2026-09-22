import { create } from "zustand";

const SUPPORTED_LANGUAGES = ["hi", "mr", "en"];

const getStoredLanguage = () => {
  if (typeof window === "undefined") {
    return "hi";
  }

  const storedLanguage =
    localStorage.getItem("kabadiwala_language");

  if (
    storedLanguage &&
    SUPPORTED_LANGUAGES.includes(storedLanguage)
  ) {
    return storedLanguage;
  }

  return "hi";
};

const useLanguageStore = create((set) => ({
  language: getStoredLanguage(),

  setLanguage: (language) => {
    if (!SUPPORTED_LANGUAGES.includes(language)) {
      return;
    }

    localStorage.setItem(
      "kabadiwala_language",
      language
    );

    set({
      language,
    });
  },
}));

export default useLanguageStore;