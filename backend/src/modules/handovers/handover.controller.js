import handoverService from "./handover.service.js";
import { validateCreateHandover,} from "./handover.validation.js";
import handoverPhotoService from "./handover.photo.service.js";

const createHandover = async (
  request,
  reply
) => {
  try {
    const errors =
      validateCreateHandover(
        request.body || {}
      );

    if (
      Object.keys(errors).length > 0
    ) {
      return reply.code(400).send({
        success: false,
        message:
          "Validation failed",
        errors,
      });
    }

    const handover =
      await handoverService.createHandover(
        request.user.uid,
        request.params.lotId,
        request.body
      );

    return reply.code(201).send({
      success: true,
      message:
        "Handover record created.",
      handover,
    });
  } catch (error) {
    request.log.error(error);

    return reply.code(400).send({
      success: false,
      message:
        error.message ||
        "Failed to create handover.",
    });
  }
};

const uploadHandoverPhoto = async (
  request,
  reply
) => {
  try {
    const file =
      await request.file();

    if (!file) {
      return reply.code(400).send({
        success: false,
        message: "Photo is required.",
      });
    }

    const buffer =
      await file.toBuffer();

    const photo =
      await handoverPhotoService.uploadHandoverPhoto(
        request.user.uid,
        request.params.handoverId,
        buffer
      );

    return reply.code(201).send({
      success: true,
      message:
        "Handover photo uploaded successfully.",
      photo,
    });
  } catch (error) {
    request.log.error(error);

    return reply.code(400).send({
      success: false,
      message:
        error.message ||
        "Failed to upload handover photo.",
    });
  }
};

const getHandoverByLotId = async (
  request,
  reply
) => {
  try {
    const handover =
      await handoverService.getHandoverByLotId(
        request.user.uid,
        request.params.lotId
      );

    return reply.code(200).send({
      success: true,
      handover,
    });
  } catch (error) {
    request.log.error(error);

    return reply.code(404).send({
      success: false,
      message:
        error.message ||
        "Handover not found.",
    });
  }
};


export default {
  createHandover,
  uploadHandoverPhoto,
  getHandoverByLotId
};