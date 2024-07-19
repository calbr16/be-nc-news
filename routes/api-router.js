const apiRouter = require("express").Router();
const topicsRouter = require("./topics-router.js");
const articlesRouter = require("./articles-router.js")
const endpoints = require("../endpoints.json");

apiRouter.get("/", (request, response) => {
  response.status(200).send(endpoints);
});

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/articles/:article_id", articlesRouter);
apiRouter.use("/articles/:article_id/comments", articlesRouter);

apiRouter.use((error, request, response, next) => { 
  if (error.status && error.message) {
    response.status(error.status).send({message: error.message });
  } else next(error);
});
  
apiRouter.use((error, request, response, next) => {
  if (error.code === '22P02'){
    response.status(400).send({ message: "Bad Request!"});
  } else next(error);
});

apiRouter.use((error, request, response, next) => {
  console.log(error)
  response.status(500).send({ message: "Internal Server Error!" });
});

module.exports = apiRouter;