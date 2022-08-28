const fastify = require("fastify")({ logger: true });
const axios = require("axios");
const _ = require("lodash");

const getClimaIp = async (data) => {
  try {
    res = await axios(
      `https://api.openweathermap.org/data/2.5/weather?lat=${data.latitude}&lon=${data.longitude}&appid=${process.env.API_WEATHER_KEY}`
    );
    return res.data;
  } catch (error) {
    fastify.log.error(err);
    process.exit(1);
  }
};

const getClimaCity = async (city) => {
  try {
    res = await axios(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_WEATHER_KEY}`
    );
    return res.data;
  } catch (error) {
    fastify.log.error(err);
    process.exit(1);
  }
};

const getClima = async (request, reply) => {
  if (request.query.city) {
    reply.send(await getClimaCity(request.query.city));
  } else {
    res = await axios(
      `https://api.maptiler.com/geolocation/ip.json?key=${process.env.API_GEO_KEY}`
    );

    reply.send(await getClimaIp(res.data));
  }
};

const getClimaExtended = async (request, reply) => {
  try {
    if (request.query.city) {
      const req = [];
      req.push(request.query.city);
      const cities = _.flatten(req);

      const weather = await Promise.all(
        _.map(cities, async (city) => {
          res = await axios(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.API_WEATHER_KEY}`
          );
          return res.data;
        })
      );

      location = await axios(
        `https://api.maptiler.com/geolocation/ip.json?key=${process.env.API_GEO_KEY}`
      );

      res = await axios(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${location.data.latitude}&lon=${location.data.longitude}&appid=${process.env.API_WEATHER_KEY}`
      );

      weather.unshift(res.data);

      reply.send(weather);
    } else {
      location = await axios(
        `https://api.maptiler.com/geolocation/ip.json?key=${process.env.API_GEO_KEY}`
      );

      res = await axios(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${location.data.latitude}&lon=${location.data.longitude}&appid=${process.env.API_WEATHER_KEY}`
      );

      reply.send(res.data);
    }
  } catch (error) {
    fastify.log.error(err);
    process.exit(1);
  }
};

module.exports = {
  getClima,
  getClimaExtended,
};
