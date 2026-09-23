import useThemeStore from "../store/themeStore";

const themes = [
  {
    value: "system",
    label: "System",
    icon: "◐",
  },
  {
    value: "light",
    label: "Light",
    icon: "☀",
  },
  {
    value: "dark",
    label: "Dark",
    icon: "☾",
  },
];

const ThemeSelector = () => {
  const theme = useThemeStore(
    (state) => state.theme
  );

  const setTheme = useThemeStore(
    (state) => state.setTheme
  );

  return (
    <div className="flex gap-2">
      {themes.map((item) => {
        const active = theme === item.value;

        return (
          <button
            key={item.value}
            type="button"
            onClick={() => setTheme(item.value)}
            className={`
              flex items-center gap-2
              rounded-xl
              border
              px-3 py-2
              text-sm
              transition
              ${
                active
                  ? "border-[var(--primary)] bg-[var(--accent)] text-[var(--primary)]"
                  : "border-[var(--border)] bg-[var(--surface)] text-[var(--muted)]"
              }
            `}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ThemeSelector;