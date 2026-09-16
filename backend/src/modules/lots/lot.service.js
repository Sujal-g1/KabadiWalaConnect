import prisma from "../../config/prisma.js";

const generateLotReferenceId = async () => {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const prefix = `KC-L-${year}${month}${day}`;

  const existingLots = await prisma.eWasteLot.count({
    where: {
      referenceId: {
        startsWith: prefix,
      },
    },
  });

  const sequence = String(existingLots + 1).padStart(4, "0");

  return `${prefix}-${sequence}`;
};

// lot creation
const createLot = async (firebaseUid, data) => {
  const collector = await prisma.user.findUnique({
    where: {
      firebaseUid,
    },
  });

  if (!collector) {
    throw new Error("Collector account not found");
  }

  if (collector.role !== "COLLECTOR") {
    throw new Error("Only collectors can create lots");
  }

  const referenceId = await generateLotReferenceId();

  const lot = await prisma.eWasteLot.create({
  data: {
    referenceId,

    collectorId: collector.id,

    material: data.material.trim(),
    subcategory: data.subcategory?.trim() || null,

    description:
      data.description?.trim() || null,

    condition:
      data.condition?.trim() || null,

    approximateWeight:
      Number(data.approximateWeight),

    weightUnit:
      data.weightUnit?.trim() || "kg",

    latitude:
      data.latitude ?? null,

    longitude:
      data.longitude ?? null,

    location:
      data.location.trim(),

    estimatedRate:
      data.estimatedRate ?? null,

    minEstimatedValue:
      data.minEstimatedValue ?? null,

    maxEstimatedValue:
      data.maxEstimatedValue ?? null,

    estimatedValue:
      data.estimatedValue ?? null,

    status: "CREATED",
  },

  include: {
    photos: true,
  },
});

  return lot;
};


const getLots = async (firebaseUid) => {
  const collector = await prisma.user.findUnique({
    where: {
      firebaseUid,
    },
  });

  if (!collector) {
    throw new Error("Collector account not found");
  }

  const lots = await prisma.eWasteLot.findMany({
    where: {
      collectorId: collector.id,
    },

    include: {
      photos: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return lots;
};


const getLotById = async (
  firebaseUid,
  lotId
) => {
  const collector = await prisma.user.findUnique({
    where: {
      firebaseUid,
    },
  });

  if (!collector) {
    throw new Error("Collector account not found");
  }

  const lot = await prisma.eWasteLot.findFirst({
    where: {
      id: lotId,
      collectorId: collector.id,
    },

    include: {
      photos: true,
    },
  });

  if (!lot) {
    throw new Error("Lot not found");
  }

  return lot;
};


const updateLot = async (
  firebaseUid,
  lotId,
  data
) => {
  const collector = await prisma.user.findUnique({
    where: {
      firebaseUid,
    },
  });

  if (!collector) {
    throw new Error("Collector account not found");
  }

  const existingLot =
    await prisma.eWasteLot.findFirst({
      where: {
        id: lotId,
        collectorId: collector.id,
      },
    });

  if (!existingLot) {
    throw new Error("Lot not found");
  }

  if (
    existingLot.status !== "CREATED" &&
    existingLot.status !== "AVAILABLE"
  ) {
    throw new Error(
      "This lot can no longer be edited"
    );
  }

  const updateData = {};

  if (data.material !== undefined) {
    updateData.material = data.material.trim();
  }

  if (data.subcategory !== undefined) {
    updateData.subcategory =
      data.subcategory?.trim() || null;
  }

  if (data.description !== undefined) {
    updateData.description =
      data.description?.trim() || null;
  }

  if (data.condition !== undefined) {
    updateData.condition =
      data.condition?.trim() || null;
  }

  if (data.approximateWeight !== undefined) {
    updateData.approximateWeight =
      Number(data.approximateWeight);
  }

  if (data.location !== undefined) {
    updateData.location =
      data.location.trim();
  }

  if (data.latitude !== undefined) {
    updateData.latitude =
      data.latitude === null
        ? null
        : Number(data.latitude);
  }

  if (data.longitude !== undefined) {
    updateData.longitude =
      data.longitude === null
        ? null
        : Number(data.longitude);
  }

  const updatedLot =
    await prisma.eWasteLot.update({
      where: {
        id: lotId,
      },

      data: updateData,

      include: {
        photos: true,
      },
    });

  return updatedLot;
};

const finalizeLot = async (firebaseUid, lotId) => {
  const collector = await prisma.user.findUnique({
    where: {
      firebaseUid,
    },
  });

  if (!collector) {
    throw new Error("Collector account not found.");
  }

  if (collector.role !== "COLLECTOR") {
    throw new Error("Only collectors can finalize lots.");
  }

  const lot = await prisma.eWasteLot.findFirst({
    where: {
      id: lotId,
      collectorId: collector.id,
    },
    include: {
      photos: true,
    },
  });

  if (!lot) {
    throw new Error("Lot not found.");
  }

  if (lot.status !== "CREATED") {
    throw new Error(
      "Only newly created lots can be finalized."
    );
  }

  if (lot.photos.length === 0) {
    throw new Error(
      "At least one photo is required before finalizing the lot."
    );
  }

  const updatedLot = await prisma.eWasteLot.update({
    where: {
      id: lot.id,
    },

    data: {
      status: "AVAILABLE",
    },

    include: {
      photos: true,
    },
  });

  return updatedLot;
};


export default {
  createLot,
  getLots,
  getLotById,
  updateLot,
  finalizeLot
};