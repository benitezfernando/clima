const fastify = require("fastify")({ logger: true });
const routes = require("./routes/clima.route");
require("dotenv").config();

routes.forEach((route) => {
  fastify.route(route);
});

const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
