import prisma from "../../config/prisma.js";
import cloudinary from "../../config/cloudinary.js";

const uploadHandoverPhoto = async (
  firebaseUid,
  handoverId,
  file
) => {
  const collector = await prisma.user.findUnique({
    where: {
      firebaseUid,
    },
  });

  if (!collector) {
    throw new Error("Collector account not found.");
  }

  if (collector.role !== "COLLECTOR") {
    throw new Error(
      "Only collectors can upload handover photos."
    );
  }

  const handover = await prisma.handover.findFirst({
    where: {
      id: handoverId,
      lot: {
        collectorId: collector.id,
      },
    },
  });

  if (!handover) {
    throw new Error("Handover not found.");
  }

  if (
    handover.status === "CANCELLED" ||
    handover.status === "CONFIRMED"
  ) {
    throw new Error(
      "Photos cannot be added to this handover."
    );
  }

  if (!file) {
    throw new Error("Photo is required.");
  }

  const result =
    await new Promise((resolve, reject) => {
      const uploadStream =
        cloudinary.uploader.upload_stream(
          {
            folder:
              "kabadiwala-connect/handovers",
            resource_type: "image",
            format: "webp",
          },
          (error, result) => {
            if (error) {
              reject(error);
              return;
            }

            resolve(result);
          }
        );

      uploadStream.end(file);
    });

  const photo =
    await prisma.handoverPhoto.create({
      data: {
        handoverId: handover.id,
        url: result.secure_url,
        storageKey: result.public_id,
      },
    });

  return photo;
};

export default {
  uploadHandoverPhoto,
};