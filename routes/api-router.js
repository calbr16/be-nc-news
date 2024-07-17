const apiRouter = require("express").Router();
const topicsRouter = require("./topics-router.js");
const endpoints = require("../endpoints.json")

apiRouter.use("/topics", topicsRouter);

apiRouter.get("/", (request, response) => {
  response.status(200).send(endpoints);
});

module.exports = apiRouter;