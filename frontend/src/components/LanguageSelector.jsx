
import useLanguageStore from "../store/languageStore";
import { languages } from "../i18n/languages";

const LanguageSelector = () => {
  const language = useLanguageStore(
    (state) => state.language
  );

  const setLanguage = useLanguageStore(
    (state) => state.setLanguage
  );

  return (
    <div className="flex gap-2">
      {Object.values(languages).map((item) => {
        const active = language === item.code;

        return (
          <button
            key={item.code}
            type="button"
            onClick={() => setLanguage(item.code)}
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
                  : "border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--primary)]/50 hover:text-[var(--primary)]"
              }
            `}
          >
            <span>{item.icon}</span>
            <span>{item.nativeName}</span>
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSelector;
