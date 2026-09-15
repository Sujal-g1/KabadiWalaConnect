import authController from "./auth.controller.js";

const authRoutes = async (app) => {
  app.post(
    "/sync",
    {
      preHandler: async (request, reply) => {
        await app.authenticate(request, reply);
      },
    },
    authController.syncUser
  );
};

export default authRoutes;