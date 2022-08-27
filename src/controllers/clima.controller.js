const fastify = require("fastify")({ logger: true });
const axios = require("axios");

const apiKey = "7245ef545421cec34099ff6394ee927c";

const getClimaIp = async (data) => {
  try {
    res = await axios(
      `https://api.openweathermap.org/data/2.5/weather?lat=${data.latitude}&lon=${data.longitude}&appid=${apiKey}`
    );
    return res.data;
  } catch (error) {
    fastify.log.error(err);
    process.exit(1);
  }
};

const getClimaIpExtended = async (data) => {
 //TODO
};

const getClimaCity = async (city) => {
  try {
    res = await axios(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    );
    return res.data;
  } catch (error) {
    fastify.log.error(err);
    process.exit(1);
  }
  
};

const getClimaCityExtended = async (city) => {
  //TODO
};

const getClima = async (request, reply) => {
  if (request.query.city) {
    reply.send(await getClimaCity(request.query.city));
  } else {
    res = await axios(
      "https://api.maptiler.com/geolocation/ip.json?key=mkY10haMivU40c8lo3W2"
    );
    reply.send(await getClimaIp(res.data));
  }
};

const getClimaExtended = async (request, reply) => {
  if (request.query.city) {
    reply.send(await getClimaCityExtended(request.query.city));
  } else {
    res = await axios(
      "https://api.maptiler.com/geolocation/ip.json?key=mkY10haMivU40c8lo3W2"
    );
    reply.send(await getClimaIpExtended(res.data));
  }
};

module.exports = {
  getClima,
  getClimaExtended,
};
