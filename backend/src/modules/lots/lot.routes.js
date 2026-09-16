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
};

export default lotRoutes;