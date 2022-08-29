const climaController = require("../controllers/clima.controller");

async function routes(fastify) {
  fastify.get(
    "location",
    {
      schema: {
        description: "Get clima local",
        tags: ["location"],
      },
    },
    climaController.getClima
  );

  fastify.get(
    "current",
    {
      schema: {
        description: "Get current clima",
        tags: ["current"],
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
        description: "Get extended clima",
        tags: ["forecast"],
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
