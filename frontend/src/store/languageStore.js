import { create } from "zustand";

const getStoredLanguage = () => {
  return localStorage.getItem("kabadiwala_language") || "hi";
};

const useLanguageStore = create((set) => ({
  language: getStoredLanguage(),

  setLanguage: (language) => {
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