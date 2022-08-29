const fastify = require("fastify")({
  logger: true,
});

fastify.register(require("./routes/routes"), { prefix: "/v1/" });

module.exports = fastify;
