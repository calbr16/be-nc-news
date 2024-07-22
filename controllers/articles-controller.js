const { getArticles, getArticleById, updateArticleById } = require('../models/article-models.js')

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

exports.updateArticle = (request, response, next) => {
    const { article_id } = request.params;
    const { inc_votes } = request.body;
    return updateArticleById(article_id, inc_votes).then((updatedArticle) => {
        response.status(200).send({ article: updatedArticle });
    })
    .catch(next);
};