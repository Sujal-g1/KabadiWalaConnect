import prisma from "../../config/prisma.js";
import cloudinary from "../../config/cloudinary.js";

const uploadLotPhoto = async (
  lotId,
  firebaseUid,
  buffer
) => {
  const collector =
    await prisma.user.findUnique({
      where: {
        firebaseUid,
      },
    });

  if (!collector) {
    throw new Error(
      "Collector account not found"
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
    throw new Error("Lot not found");
  }

  const photoCount = await prisma.lotPhoto.count({
      where: {
        lotId,
      },
    });

  if (photoCount >= 5) {
    throw new Error(
      "Maximum 5 photos allowed"
    );
  }

  const uploadResult = await new Promise( (resolve, reject) => {
        const uploadStream =
          cloudinary.uploader.upload_stream(
            {
              folder:
                "kabadiwala-connect/lots",

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

        uploadStream.end(buffer);
      }
    );

  const photo =await prisma.lotPhoto.create({
      data: {
        lotId,

        url:
          uploadResult.secure_url,

        storageKey:
          uploadResult.public_id,
      },
    });

  return photo;
};

export default {
  uploadLotPhoto,
};