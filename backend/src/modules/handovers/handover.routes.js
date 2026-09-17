import handoverController from "./handover.controller.js";

const handoverRoutes = async (app) => {
  app.post(
    "/lots/:lotId",
    {
      preHandler: async (request, reply) => {
        await app.authenticate(
          request,
          reply
        );
      },
    },
    handoverController.createHandover
  );

  app.get(
    "/lots/:lotId",
    {
      preHandler: async (request, reply) => {
        await app.authenticate(
          request,
          reply
        );
      },
    },
    handoverController.getHandoverByLotId
  );

  app.post(
    "/:handoverId/photos",
    {
      preHandler: async (request, reply) => {
        await app.authenticate(
          request,
          reply
        );
      },
    },
    handoverController.uploadHandoverPhoto
  );
};

export default handoverRoutes;