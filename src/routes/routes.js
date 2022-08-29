const climaController = require("../controllers/clima.controller");

async function routes(fastify) {
  fastify.get(
    "location",
    {
      schema: {
        description: "Get clima local",
        tags: ["weather"],
      },
    },
    climaController.getClima
  );

  fastify.get(
    "current",
    {
      schema: {
        description: "Get clima local or city parameter optional",
        tags: ["weather"],
        params: {
          type: ["object", "null"],
          properties: {
            city: { type: "string" },
          },
        },
      },
    },
    climaController.getClima
  );

  fastify.get(
    "forecast",
    {
      schema: {
        description: "Returns extended weather from the local city and the five optional parameters.",
        tags: ["weather"],
        params: {
          type: ["object", "null"],
          properties: {
            city: { type: "string" },
          },
        },
      },
    },
    climaController.getClimaExtended
  );
}

module.exports = routes;
