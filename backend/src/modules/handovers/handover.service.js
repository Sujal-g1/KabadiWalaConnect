import prisma from "../../config/prisma.js";

const generateHandoverReferenceId = async () => {
    const date = new Date();

    const year = date.getFullYear();

    const month = String(
      date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      date.getDate()
    ).padStart(2, "0");

    const prefix =
      `KC-H-${year}${month}${day}`;

    const existingHandovers =
      await prisma.handover.count({
        where: {
          referenceId: {
            startsWith: prefix,
          },
        },
      });

    const sequence =
      String(
        existingHandovers + 1
      ).padStart(4, "0");

    return `${prefix}-${sequence}`;
  };

const createHandover = async (
  firebaseUid,
  lotId,
  data
) => {
  const collector =
    await prisma.user.findUnique({
      where: {
        firebaseUid,
      },
    });

  if (!collector) {
    throw new Error(
      "Collector account not found."
    );
  }

  if (
    collector.role !== "COLLECTOR"
  ) {
    throw new Error(
      "Only collectors can create handovers."
    );
  }

  const lot =
    await prisma.eWasteLot.findFirst({
      where: {
        id: lotId,
        collectorId: collector.id,
      },
      include: {
        handover: true,
      },
    });

  if (!lot) {
    throw new Error(
      "Lot not found."
    );
  }

  if (
    lot.status !== "PICKED_UP" &&
    lot.status !== "AVAILABLE"
  ) {
    throw new Error(
      "This lot cannot be handed over in its current state."
    );
  }

  if (lot.handover) {
    throw new Error(
      "A handover record already exists for this lot."
    );
  }

  const referenceId =
    await generateHandoverReferenceId();

  const handover =
    await prisma.handover.create({
      data: {
        referenceId,

        lotId: lot.id,

        actualWeight:
          Number(data.actualWeight),

        weightUnit:
          data.weightUnit || "kg",

        latitude:
          data.latitude ?? null,

        longitude:
          data.longitude ?? null,

        location:
          data.location?.trim() || null,

        finalValue:
          data.finalValue !== undefined &&
          data.finalValue !== null
            ? Number(data.finalValue)
            : null,

        status: "PENDING",
      },

      include: {
        photos: true,
      },
    });

  return handover;
};

const getHandoverByLotId = async (
  firebaseUid,
  lotId
) => {
  const collector = await prisma.user.findUnique({
    where: {
      firebaseUid,
    },
  });

  if (!collector) {
    throw new Error(
      "Collector account not found."
    );
  }

  if (collector.role !== "COLLECTOR") {
    throw new Error(
      "Only collectors can view handovers."
    );
  }

  const lot =
    await prisma.eWasteLot.findFirst({
      where: {
        id: lotId,
        collectorId: collector.id,
      },
    });

  if (!lot) {
    throw new Error("Lot not found.");
  }

  const handover =
    await prisma.handover.findUnique({
      where: {
        lotId,
      },
      include: {
        photos: true,
      },
    });

  if (!handover) {
    throw new Error(
      "Handover not found."
    );
  }

  return handover;
};

export default {
  createHandover,
  getHandoverByLotId
};