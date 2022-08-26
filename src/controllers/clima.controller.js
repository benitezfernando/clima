const axios = require("axios");

const apiKey = "7245ef545421cec34099ff6394ee927c";

const getClimaApi = async (apiKey) => {
  res = await axios(
    `https://api.openweathermap.org/data/2.5/weather?q=6070&appid=${apiKey}`
  );
  return res.data;
};

const getClimaApiExtended = async (apiKey) => {
  res = await axios(
    `https://api.openweathermap.org/data/2.5/weather?q=6070&appid=${apiKey}`
  );
  return res.data;
};

const getClima = async (req, reply) => {
  reply.send(await getClimaApi(apiKey));
};

const getClimaExtended = async (req, reply) => {
  reply.send(await getClimaApiExtended(apiKey));
};

module.exports = {
  getClima,
  getClimaExtended,
};
