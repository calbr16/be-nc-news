const { fetchArticles, fetchArticleById } = require("../controllers/articles-controller");

const articlesRouter = require("express").Router();

articlesRouter
    .route("/")
    .get(fetchArticles);

articlesRouter
    .route("/:article_id")
    .get(fetchArticleById);


module.exports = articlesRouter;