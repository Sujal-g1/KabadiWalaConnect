import useLanguageStore from "../store/languageStore";
import { SUPPORTED_LANGUAGES } from "../i18n/languages";

const LanguageSelector = () => {
  const language = useLanguageStore(
    (state) => state.language
  );

  const setLanguage = useLanguageStore(
    (state) => state.setLanguage
  );

  return (
    <div className="flex flex-wrap gap-2">
      {SUPPORTED_LANGUAGES.map((item) => {
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
              font-medium
              transition-all duration-200
              ${
                active
                  ? "border-[var(--primary)] bg-[var(--accent)] text-[var(--primary)] shadow-sm"
                  : "border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--primary)]/50 hover:bg-[var(--surface-soft)] hover:text-[var(--primary)]"
              }
            `}
          >
            <span>{item.nativeLabel}</span>
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSelector;