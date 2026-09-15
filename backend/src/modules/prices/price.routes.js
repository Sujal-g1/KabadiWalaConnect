import priceController from "./price.controller.js";

const priceRoutes = async (app) => {
  app.get(
    "/",
    {
      preHandler: async (request, reply) => {
        await app.authenticate(request, reply);
      },
    },
    priceController.getPrices
  );

  app.get(
    "/history",
    {
      preHandler: async (request, reply) => {
        await app.authenticate(request, reply);
      },
    },
    priceController.getPriceHistory
  );

  app.post(
  "/valuation",
  {
    preHandler: async (request, reply) => {
      await app.authenticate(
        request,
        reply
      );
    },
  },
  priceController.calculateValuation
);
};

export default priceRoutes;