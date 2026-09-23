import prisma from "../../config/prisma.js";

const calculateValuation = async ({
  material,
  subcategory,
  location,
  weight,
}) => {
  if (!material) {
    throw new Error("Material is required");
  }

  if (!location) {
    throw new Error("Location is required");
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

  const where = {
    material: {
      equals: material,
      mode: "insensitive",
    },

    location: {
      equals: location,
      mode: "insensitive",
    },
  };

  if (subcategory) {
    where.subcategory = {
      equals: subcategory,
      mode: "insensitive",
    };
  }

  const latestPrice =
    await prisma.priceHistory.findFirst({
      where,
      orderBy: {
        recordedAt: "desc",
      },
    });

  if (!latestPrice) {
    throw new Error(
      "No market price available for this material and location"
    );
  }

  const estimatedValue =
    numericWeight * latestPrice.price;

  return {
    material: latestPrice.material,
    subcategory: latestPrice.subcategory,

    location: latestPrice.location,

    weight: numericWeight,

    rate: latestPrice.price,

    unit: latestPrice.unit,

    estimatedValue: Number(
      estimatedValue.toFixed(2)
    ),

    marketRange: {
      min: latestPrice.minPrice,
      max: latestPrice.maxPrice,
    },

    source: latestPrice.source,

    priceRecordedAt:
      latestPrice.recordedAt,
  };
};

export default {
  calculateValuation,
};