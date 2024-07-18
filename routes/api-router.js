const apiRouter = require("express").Router();
const topicsRouter = require("./topics-router.js");
const articlesRouter = require("./articles-router.js")
const endpoints = require("../endpoints.json");

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/articles/:article_id", articlesRouter);
apiRouter.use((error, request, response, next) => {
  if (error.status && error.message) {
    response.status(error.status).send({message: error.message });
  } else {
    console.log(error);
    response.status(500).send({ message: "Internal Server Error!" });
  }
});

apiRouter.get("/", (request, response) => {
  response.status(200).send(endpoints);
});

module.exports = apiRouter;