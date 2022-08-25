const fastify = require("fastify")({ logger: true });

const start = async () => {
  await fastify.listen(3000);
  fastify.log.info(`Server listening in port ${fastify.server.address().port}`);
};

start();
