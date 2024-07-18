const { getArticles, getArticleById } = require('../models/article-models.js')

exports.fetchArticles = (request, response) => {
    return getArticles().then((articles) => {
        response.status(200).json({articles});
    });
};

exports.fetchArticleById = (request, response, next) => {
    const { article_id } = request.params
    getArticleById(article_id)
        .then((article) => response.status(200).send({ article }))
        .catch(next);
};


