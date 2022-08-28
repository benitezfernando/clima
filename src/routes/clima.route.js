const climaController = require("../controllers/clima.controller");

const params = {
  type: ["object", "null"],
  properties: {
    city: { type: "string" },
  },
};

const schema = { params };

const routes = [
  {
    url: "/location",
    method: "GET",
    handler: climaController.getClima,
  },
  {
    url: "/current",
    method: "GET",
    schema: schema,
    handler: climaController.getClima,
  },
  {
    url: "/forecast",
    method: "GET",
    schema: schema,
    handler: climaController.getClimaExtended,
  },
];

module.exports = routes;
