const climaController = require('../controllers/clima.controller')



const routes = [
  {
    url: "/location",
    method: "GET",
    handler: climaController.getClima
  },
  {
    url: "/current",
    method: "GET",
    handler: climaController.getClima
  },
  {
    url: '/forecast',
    method: "GET",
    handler: climaController.getClima
  },
];

module.exports = routes;
