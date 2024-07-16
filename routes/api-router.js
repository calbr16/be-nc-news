const apiRouter = require("express").Router();
const topicsRouter = require("./topics-router.js");

apiRouter.use("/topics", topicsRouter);

apiRouter.get("/", (request, response) => {
  response.status(200).send("All OK from /api");
});

module.exports = apiRouter;