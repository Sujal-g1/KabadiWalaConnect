import { create } from "zustand";

const getStoredTheme = () => {
  return localStorage.getItem("kabadiwala_theme") || "system";
};

const useThemeStore = create((set) => ({
  theme: getStoredTheme(),

  setTheme: (theme) => {
    localStorage.setItem("kabadiwala_theme", theme);

    set({
      theme,
    });
  },
}));

export default useThemeStore;