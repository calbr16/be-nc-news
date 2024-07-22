const { getArticleComments, createArticleComment, deleteArticleComment } = require('../models/comments-models.js')

exports.fetchArticleComments = (request, response, next) => {
    const { article_id } = request.params
    getArticleComments(article_id).then((comments) => { 
        response.status(200).send({ comments });
    })
    .catch(next)
};

exports.postArticleComment = (request, response, next) => {
    const { article_id } = request.params
    const { username, body } = request.body

    if(!username || !body) {
        return response.status(400).send({
            message: "Bad request!"
        })
    }

    createArticleComment(article_id, username, body).then((comment) => {
        response.status(201).send({ comment });
    })
    .catch(next);
};

exports.deleteComment = (request, response, next) => {
    const { comment_id } = request.params;

    deleteArticleComment(comment_id).then(() => {
        response.status(204).send();
    })
    .catch(next);
};