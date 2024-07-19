const { fetchArticles, fetchArticleById, fetchArticleComments } = require("../controllers/articles-controller");

const articlesRouter = require("express").Router();

articlesRouter
    .route("/")
    .get(fetchArticles);

articlesRouter
    .route("/:article_id")
    .get(fetchArticleById);

articlesRouter
    .route("/:article_id/comments")
    .get(fetchArticleComments);


module.exports = articlesRouter;