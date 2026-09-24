import {
  getCurrentPrices,
  getDynamicPriceHistory,
} from "./price.engine.js";

const getPrices = async ({
  location = "Meerut",
  material,
} = {}) => {
  return getCurrentPrices({
    location,
    material,
  });
};

const getPriceHistory = async ({
  material,
  subcategory,
  location = "Meerut",
  limit = 30,
} = {}) => {
  return getDynamicPriceHistory({
    material,
    subcategory,
    location,
    limit,
  });
};

export default {
  getPrices,
  getPriceHistory,
};
