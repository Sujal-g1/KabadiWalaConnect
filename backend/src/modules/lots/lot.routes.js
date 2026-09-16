import lotController from "./lot.controller.js";

const lotRoutes = async (app) => {
    
  app.post(
    "/",
    {
      preHandler: async (
        request,
        reply
      ) => {
        await app.authenticate(
          request,
          reply
        );
      },
    },
    lotController.createLot
  );

  app.get(
    "/",
    {
      preHandler: async (
        request,
        reply
      ) => {
        await app.authenticate(
          request,
          reply
        );
      },
    },
    lotController.getLots
  );

  app.get(
    "/:id",
    {
      preHandler: async (
        request,
        reply
      ) => {
        await app.authenticate(
          request,
          reply
        );
      },
    },
    lotController.getLotById
  );

  app.patch(
    "/:id",
    {
      preHandler: async (
        request,
        reply
      ) => {
        await app.authenticate(
          request,
          reply
        );
      },
    },
    lotController.updateLot
  );

  app.post(
  "/:id/photos",
  {
    preHandler: async (
      request,
      reply
    ) => {
      await app.authenticate(
        request,
        reply
      );
    },
  },
  lotController.uploadPhoto
);

app.post(
  "/:id/finalize",
  {
    preHandler: async (request, reply) => {
      await app.authenticate(request, reply);
    },
  },
  lotController.finalizeLot
);
};

export default lotRoutes;