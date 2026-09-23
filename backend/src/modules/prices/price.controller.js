import priceService from "./price.service.js";
import valuationService from "./valuation.service.js";

const getPrices = async (request, reply) => {
  try {
    const {
      location,
      material,
    } = request.query;

    const prices =
      await priceService.getPrices({
        location,
        material,
      });

    return reply.code(200).send({
      success: true,
      data: prices,
    });
  } catch (error) {
    request.log.error(error);

    return reply.code(500).send({
      success: false,
      message: "Failed to fetch prices",
    });
  }
};

const getPriceHistory = async (
  request,
  reply
) => {
  try {
    const {
      material,
      subcategory,
      location,
      limit,
    } = request.query;

    const prices =
      await priceService.getPriceHistory({
        material,
        subcategory,
        location,
        limit,
      });

    return reply.code(200).send({
      success: true,
      data: prices,
    });
  } catch (error) {
    request.log.error(error);

    return reply.code(500).send({
      success: false,
      message: "Failed to fetch price history",
    });
  }
};

const calculateValuation = async (
  request,
  reply
) => {
  try {
    const {
      material,
      subcategory,
      location,
      weight,
    } = request.body || {};

    const valuation =
      await valuationService.calculateValuation({
        material,
        subcategory,
        location,
        weight,
      });

    return reply.code(200).send({
      success: true,
      data: valuation,
    });
  } catch (error) {
    request.log.error(error);

    return reply.code(400).send({
      success: false,
      message:
        error.message ||
        "Failed to calculate valuation",
    });
  }
};

export default {
  getPrices,
  getPriceHistory,
  calculateValuation,
};