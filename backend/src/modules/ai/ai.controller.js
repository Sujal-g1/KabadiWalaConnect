import aiService from "./ai.service.js";

const chat = async (
  request,
  reply
) => {
  try {
    const { message } =
      request.body || {};

    const result =
      await aiService.generateResponse({
        message,
      });

    return reply.code(200).send({
      success: true,
      data: result,
    });
  } catch (error) {
    request.log.error(error);

    return reply.code(400).send({
      success: false,
      message:
        error.message ||
        "AI response failed",
    });
  }
};

export default {
  chat,
};