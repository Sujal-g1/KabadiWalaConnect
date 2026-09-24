import {
  getDynamicPrice,
} from "./price.engine.js";

const calculateValuation = async ({
  material,
  subcategory,
  location,
  weight,
}) => {
  if (!material) {
    throw new Error(
      "Material is required"
    );
  }

  if (!location) {
    throw new Error(
      "Location is required"
    );
  }

  if (
    weight === undefined ||
    weight === null ||
    Number(weight) <= 0
  ) {
    throw new Error(
      "Weight must be greater than zero"
    );
  }

  const numericWeight = Number(weight);

  if (!Number.isFinite(numericWeight)) {
    throw new Error(
      "Weight must be a valid number"
    );
  }

  const currentPrice =
    getDynamicPrice({
      material,
      subcategory,
      location,
    });

  if (!currentPrice) {
    throw new Error(
      "No market price available for this material and location"
    );
  }

  const estimatedValue =
    numericWeight *
    currentPrice.price;

  return {
    material: currentPrice.material,
    subcategory: currentPrice.subcategory,
    location: currentPrice.location,

    weight: numericWeight,

    rate: currentPrice.price,
    unit: currentPrice.unit,

    estimatedValue: Number(
      estimatedValue.toFixed(2)
    ),

    marketRange: {
      min: currentPrice.minPrice,
      max: currentPrice.maxPrice,
    },

    trend: currentPrice.trend,
    changePercent: currentPrice.changePercent,

    source: currentPrice.source,
    priceRecordedAt: currentPrice.recordedAt,
  };
};

export default {
  calculateValuation,
};
