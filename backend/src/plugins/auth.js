import fp from "fastify-plugin";
import { auth } from "../config/firebase.js";

const authPlugin = async (app) => {
  app.decorateRequest("user", null);

  app.decorate("authenticate", async (request, reply) => {
    const authorization = request.headers.authorization;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return reply.code(401).send({
        success: false,
        message: "Authentication token is required",
      });
    }

    const idToken = authorization.substring(7);

    try {
      const decodedToken = await auth.verifyIdToken(idToken);

      request.user = decodedToken;
    } catch (error) {
      request.log.error(error);

      return reply.code(401).send({
        success: false,
        message: "Invalid or expired authentication token",
      });
    }
  });
};

export default fp(authPlugin);