import { useEffect } from "react";

import useLanguageStore from "../store/languageStore";
import useRegionStore from "../store/regionStore";

import {
  getUserLocation,
  getRegionFromCoordinates,
} from "../services/langRegion/regionService";

import {
  getLanguageForState,
} from "../i18n/languages";

const useRegionLanguage = () => {
  const languageSource = useLanguageStore(
    (state) => state.languageSource
  );

  const setLanguage = useLanguageStore(
    (state) => state.setLanguage
  );

  const status = useRegionStore(
    (state) => state.status
  );

  const stateCode = useRegionStore(
    (state) => state.stateCode
  );

  const setRegion = useRegionStore(
    (state) => state.setRegion
  );

  const setStatus = useRegionStore(
    (state) => state.setStatus
  );

  useEffect(() => {
    /*
      If we already know the user's region,
      still calculate the language from the
      stored state code.

      This is important because the user may have
      changed STATE_LANGUAGE_MAP during development.
    */
    if (status === "ready" && stateCode) {
      if (languageSource !== "user") {
        const regionalLanguage =
          getLanguageForState(stateCode);

        console.log(
          "Language selected from stored region:",
          stateCode,
          "→",
          regionalLanguage
        );

        setLanguage(
          regionalLanguage,
          "region"
        );
      }

      return;
    }

    const detectRegion = async () => {
      try {
        setStatus("loading");

        console.log(
          "Requesting user location..."
        );

        const coordinates =
          await getUserLocation();

        console.log(
          "Coordinates:",
          coordinates
        );

        const region =
          await getRegionFromCoordinates(
            coordinates
          );

        console.log(
          "Detected region:",
          region
        );

        setRegion({
          city: region.city || "",
          state: region.state || "",
          stateCode:
            region.stateCode || "",
          countryCode:
            region.countryCode || "",
        });

        /*
          Only automatic region detection can
          change the language when the user has
          not manually selected one.
        */
        if (languageSource !== "user") {
          const regionalLanguage =
            getLanguageForState(
              region.stateCode
            );

          console.log(
            "Language selected from region:",
            region.stateCode,
            "→",
            regionalLanguage
          );

          setLanguage(
            regionalLanguage,
            "region"
          );
        }
      } catch (error) {
        console.error(
          "Region detection failed:",
          error
        );

        setStatus("error");

        if (languageSource !== "user") {
          setLanguage(
            "en",
            "region"
          );
        }
      }
    };

    detectRegion();
  }, [
    status,
    stateCode,
    languageSource,
    setLanguage,
    setRegion,
    setStatus,
  ]);
};

export default useRegionLanguage;