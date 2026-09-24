import { create } from "zustand";
import { persist } from "zustand/middleware";

const getStoredRegion = () => {
  if (typeof window === "undefined") {
    return {
      city: "",
      state: "",
      stateCode: "",
      countryCode: "",
    };
  }

  return {
    city:
      localStorage.getItem(
        "kabadiwala_city"
      ) || "",

    state:
      localStorage.getItem(
        "kabadiwala_state"
      ) || "",

    stateCode:
      localStorage.getItem(
        "kabadiwala_state_code"
      ) || "",

    countryCode:
      localStorage.getItem(
        "kabadiwala_country_code"
      ) || "",
  };
};

const storedRegion = getStoredRegion();

const useRegionStore = create((set) => ({
  city: storedRegion.city,
  state: storedRegion.state,
  stateCode: storedRegion.stateCode,
  countryCode: storedRegion.countryCode,

  status:
    storedRegion.state || storedRegion.city
      ? "ready"
      : "idle",

  setRegion: (region) => {
    console.log(
      "Saving region to store:",
      region
    );

    localStorage.setItem(
      "kabadiwala_city",
      region.city || ""
    );

    localStorage.setItem(
      "kabadiwala_state",
      region.state || ""
    );

    localStorage.setItem(
      "kabadiwala_state_code",
      region.stateCode || ""
    );

    localStorage.setItem(
      "kabadiwala_country_code",
      region.countryCode || ""
    );

    set({
      city: region.city || "",
      state: region.state || "",
      stateCode:
        region.stateCode || "",
      countryCode:
        region.countryCode || "",
      status: "ready",
    });
  },

  setStatus: (status) => {
    set({ status });
  },
}));

export default useRegionStore;