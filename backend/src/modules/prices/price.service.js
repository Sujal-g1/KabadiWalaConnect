import prisma from "../../config/prisma.js";

const getPrices = async ({
  location,
  material,
}) => {
  const where = {};

  if (location) {
    where.location = {
      equals: location,
      mode: "insensitive",
    };
  }

  if (material) {
    where.material = {
      equals: material,
      mode: "insensitive",
    };
  }

  const prices = await prisma.priceHistory.findMany({
    where,
    orderBy: {
      recordedAt: "desc",
    },
  });

  return prices;
};

const getPriceHistory = async ({
  material,
  location,
  limit = 30,
}) => {
  const where = {};

  if (material) {
    where.material = {
      equals: material,
      mode: "insensitive",
    };
  }

  if (location) {
    where.location = {
      equals: location,
      mode: "insensitive",
    };
  }

  return prisma.priceHistory.findMany({
    where,
    orderBy: {
      recordedAt: "desc",
    },
    take: Number(limit),
  });
};

export default {
  getPrices,
  getPriceHistory,
};