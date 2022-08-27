const fastify = require("fastify")({ logger: true });
const climaRoutes = require("./routes/clima.route");

climaRoutes.forEach((route) => {
  fastify.route(route);
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
