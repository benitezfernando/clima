const fastify = require("../src/server");
const axios = require("axios");

describe("GET /location", () => {
  test("Should return code 200", async () => {
    const cityIp = await axios.get(
      `https://api.maptiler.com/geolocation/ip.json?key=mkY10haMivU40c8lo3W2`
    );

    return fastify
      .inject({ method: "GET", url: "/v1/location" })
      .then((received) => {
        expect(received.statusCode).toEqual(200);
      });
  });
  test("Should return IP City", async () => {
    const cityIp = await axios.get(
      `https://api.maptiler.com/geolocation/ip.json?key=mkY10haMivU40c8lo3W2`
    );

    return fastify
      .inject({ method: "GET", url: "/v1/location" })
      .then((received) => {
        expect(received.json().name).toEqual(cityIp.data.city);
      });
  });
});

describe("GET /current", () => {
  test("Should return code 200 and IP city", async () => {
    const cityIp = await axios.get(
      `https://api.maptiler.com/geolocation/ip.json?key=mkY10haMivU40c8lo3W2`
    );

    return fastify
      .inject({ method: "GET", url: "/v1/current" })
      .then((received) => {
        expect(received.statusCode).toEqual(200);
        expect(received.json().name).toEqual(cityIp.data.city);
      });
  });
  test("Should return only City param", async () => {
    return fastify
      .inject({ method: "GET", url: "/v1/current", query: { city: "London" } })
      .then((received) => {
        expect(received.json().name).toEqual("London");
      });
  });
});

describe("GET /forecast", () => {
  test("Should return code 200 and weather extended only IP city", async () => {
    const cityIp = await axios.get(
      `https://api.maptiler.com/geolocation/ip.json?key=mkY10haMivU40c8lo3W2`
    );

    return fastify
      .inject({ method: "GET", url: "/v1/forecast" })
      .then((received) => {
        expect(received.statusCode).toEqual(200);
        expect(received.json().list).toHaveLength(40);
        expect(received.json().city.name).toEqual(cityIp.data.city);
      });
  });
  test("Should return weather extended IP city and other five cities", async () => {
    const cityIp = await axios.get(
      `https://api.maptiler.com/geolocation/ip.json?key=mkY10haMivU40c8lo3W2`
    );

    return fastify
      .inject({
        method: "GET",
        url: "/v1/forecast",
        query: { city: ["Miami", "New York", "Mendoza", "Roma", "London"] },
      })
      .then((received) => {
        expect(received.json()).toHaveLength(6);
        expect(received.json()[0].list).toHaveLength(40);
        expect(received.json()[0].city.name).toEqual(cityIp.data.city);
        expect(received.json()[1].city.name).toEqual("Miami");
      });
  });
});
