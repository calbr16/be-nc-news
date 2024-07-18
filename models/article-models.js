const db = require('../db/connection.js')

exports.getArticles = (request, response) => {
    return db.query('SELECT article_id, title, topic, author, created_at, votes, article_img_url FROM articles ORDER BY created_at DESC')
    .then((result) => {
        return result.rows;
    }).catch((error) => {
        return error;
    })
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