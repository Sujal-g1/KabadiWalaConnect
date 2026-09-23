import { useEffect } from "react";

import useThemeStore from "../store/themeStore";

const applyTheme = (theme) => {
  const root = document.documentElement;

  root.classList.remove("light", "dark");

  if (theme === "system") {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    root.classList.add(
      prefersDark ? "dark" : "light"
    );

    return;
  }

  root.classList.add(theme);
};

const ThemeProvider = ({ children }) => {
  const theme = useThemeStore(
    (state) => state.theme
  );

  useEffect(() => {
    applyTheme(theme);

    if (theme !== "system") {
      return;
    }

    const mediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    const handleChange = () => {
      applyTheme("system");
    };

    mediaQuery.addEventListener(
      "change",
      handleChange
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleChange
      );
    };
  }, [theme]);

  return children;
};

export default ThemeProvider;