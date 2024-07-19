const db = require('../db/connection.js');
const articles = require('../db/data/test-data/articles.js');

exports.getArticles = (request, response) => {
    return db
    .query('SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id) ::int AS comment_count FROM articles LEFT JOIN comments ON comments.article_id=articles.article_id GROUP BY articles.article_id ORDER BY articles.created_at DESC;')
    .then((result) => {
        const articles = result.rows;
        return articles;
    });
};

exports.getArticleById = (article_id) => {
    return db
    .query('SELECT * FROM articles WHERE article_id = $1;', [article_id])
    .then(({ rows }) => {
        const article = rows[0]
        if (!article) {
            return Promise.reject({
                status: 404,
                message: `No article found for article_id: ${article_id}`,
            });
        } 
        return article;
    });
};

exports.getArticleComments = (article_id) => {
    return db
        .query('SELECT * FROM comments WHERE comments.article_id=$1 ORDER BY created_at DESC;', [article_id])
        .then(({ rows }) => {
            const comments = rows;
            return comments;
        });
};
