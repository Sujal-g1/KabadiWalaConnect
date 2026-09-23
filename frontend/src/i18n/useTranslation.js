import useLanguageStore from "../store/languageStore";
import { createTranslator } from "./index";

const useTranslation = () => {
  const language = useLanguageStore(
    (state) => state.language
  );

  const t = createTranslator(language);

  return {
    t,
    language,
  };
};

export default useTranslation;