import lotService from "./lot.service.js";
import lotPhotoService from "./lot.photo.service.js";
import { validateCreateLot, } from "./lot.validation.js";


const createLot = async (
  request,
  reply
) => {
  try {
    const errors =
      validateCreateLot(
        request.body || {}
      );

    if (Object.keys(errors).length > 0) {
      return reply.code(400).send({
        success: false,
        message: "Invalid lot data",
        errors,
      });
    }

    const lot =
      await lotService.createLot(
        request.user.uid,
        request.body
      );

    return reply.code(201).send({
      success: true,
      message: "Lot created successfully",
      lot,
    });
  } catch (error) {
    request.log.error(error);

    return reply.code(400).send({
      success: false,
      message:
        error.message ||
        "Failed to create lot",
    });
  }
};


const getLots = async (
  request,
  reply
) => {
  try {
    const lots =
      await lotService.getLots(
        request.user.uid
      );

    return reply.code(200).send({
      success: true,
      lots,
    });
  } catch (error) {
    request.log.error(error);

    return reply.code(400).send({
      success: false,
      message:
        error.message ||
        "Failed to fetch lots",
    });
  }
};


const getLotById = async (
  request,
  reply
) => {
  try {
    const { id } = request.params;

    const lot =
      await lotService.getLotById(
        request.user.uid,
        id
      );

    return reply.code(200).send({
      success: true,
      lot,
    });
  } catch (error) {
    request.log.error(error);

    return reply.code(404).send({
      success: false,
      message:
        error.message ||
        "Lot not found",
    });
  }
};


const updateLot = async (
  request,
  reply
) => {
  try {
    const { id } = request.params;

    const lot =
      await lotService.updateLot(
        request.user.uid,
        id,
        request.body || {}
      );

    return reply.code(200).send({
      success: true,
      message: "Lot updated successfully",
      lot,
    });
  } catch (error) {
    request.log.error(error);

    return reply.code(400).send({
      success: false,
      message:
        error.message ||
        "Failed to update lot",
    });
  }
};

const uploadPhoto = async (
  request,
  reply
) => {
  try {
    const { id } =
      request.params;

    const file =
      await request.file();

    if (!file) {
      return reply.code(400).send({
        success: false,
        message: "Photo is required",
      });
    }

    if (
      !file.mimetype.startsWith(
        "image/"
      )
    ) {
      return reply.code(400).send({
        success: false,
        message: "Only image files are allowed",
      });
    }

    const buffer =
      await file.toBuffer();

    const photo =
      await lotPhotoService.uploadLotPhoto(
        id,
        request.user.uid,
        buffer
      );

    return reply.code(201).send({
      success: true,
      message:
        "Photo uploaded successfully",
      photo,
    });
  } catch (error) {
    request.log.error(error);

    return reply.code(400).send({
      success: false,
      message:
        error.message ||
        "Failed to upload photo",
    });
  }
};

const finalizeLot = async (request, reply) => {
  try {
    const lot = await lotService.finalizeLot(
      request.user.uid,
      request.params.id
    );

    return reply.code(200).send({
      success: true,
      message: "Lot is now available to recyclers.",
      lot,
    });
  } catch (error) {
    request.log.error(error);

    return reply.code(400).send({
      success: false,
      message:
        error.message ||
        "Failed to finalize lot.",
    });
  }
};

export default {
  createLot,
  getLots,
  getLotById,
  updateLot,
  uploadPhoto,
  finalizeLot
};