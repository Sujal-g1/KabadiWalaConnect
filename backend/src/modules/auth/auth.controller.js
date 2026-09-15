import authService from "./auth.service.js";

const syncUser = async (request, reply) => {
  try {
    const result = await authService.syncUser(
      request.user,
      request.body || {}
    );

    return reply.code(200).send({
      success: true,
      message: "Authentication successful",
      ...result,
    });
  } catch (error) {
    request.log.error(error);

    return reply.code(400).send({
      success: false,
      message: error.message || "Authentication failed",
    });
  }
};

export default {
  syncUser,
};