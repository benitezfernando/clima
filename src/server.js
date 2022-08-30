const fastify = require("fastify")({
  logger: true,
});

fastify.register(require('@fastify/swagger'), {
  exposeRoute: true,
  routePrefix: '/documentation',
  swagger: {
    info: { title: 'Clima API' }
  },
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    { name: 'weather', description: 'Get weather location' }
  ]
})

fastify.register(require('fastify-healthcheck'))


fastify.register(require("./routes/routes"), { prefix: "/v1/" });

module.exports = fastify;
