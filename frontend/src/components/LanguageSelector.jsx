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
    <select
      value={language}
      onChange={(e) =>
        setLanguage(e.target.value)
      }
      className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none"
    >
      {Object.values(languages).map(
        (item) => (
          <option
            key={item.code}
            value={item.code}
            className="bg-[#0a1813] text-white"
          >
            {item.nativeName}
          </option>
        )
      )}
    </select>
  );
};

export default LanguageSelector;