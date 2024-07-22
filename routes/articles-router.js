const { fetchArticles, fetchArticleById, updateArticle } = require('../controllers/articles-controller.js');

const { fetchArticleComments, postArticleComment } = require('../controllers/comments-controller.js');

const articlesRouter = require('express').Router();

articlesRouter
    .route('/')
    .get(fetchArticles);

articlesRouter
    .route('/:article_id')
    .get(fetchArticleById)
    .patch(updateArticle);

articlesRouter
    .route('/:article_id/comments')
    .get(fetchArticleComments)
    .post(postArticleComment);
    

module.exports = articlesRouter;