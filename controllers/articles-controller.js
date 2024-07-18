const { getArticles, getArticleById, getArticleComments } = require('../models/article-models.js')

exports.fetchArticles = (request, response, next) => {
    return getArticles().then((articles) => {
        response.status(200).json({articles});
    })
    .catch(next)
};

exports.fetchArticleById = (request, response, next) => {
    const { article_id } = request.params
    return getArticleById(article_id).then((article) => {
        response.status(200).send({ article });
    })
        .catch(next);
};