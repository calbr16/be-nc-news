const db = require('../db/connection.js');
const {
    checkArticleExists, 
    checkUserExists
} = require('../db/seeds/utils.js')

exports.getArticleComments = (article_id) => {
    return db
        .query('SELECT * FROM public.comments WHERE comments.article_id=$1 ORDER BY created_at DESC;', [article_id])
        .then(({ rows }) => {
            const comments = rows;
            return comments;
        });
};

exports.createArticleComment = (article_id, username, body) => {
    return checkArticleExists(article_id).then((article) => {
        if (!article) {
            return Promise.reject({
                status: 404,
                message: `No article with ID ${article_id}`
            });
        }
        
        return checkUserExists(username).then((user) => {
        if (!user) {
            return Promise.reject({
                status: 404,
                message: `No user with username ${username}`
            });
        };
        
        const query = 'INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING *;'
        return db
            .query(query, [article_id, username, body]).then(({ rows }) => {
                return rows[0];
            });
        });
    });
};

exports.deleteArticleComment = (comment_id) => {
    return db
        .query('DELETE FROM comments WHERE comment_id = $1 RETURNING *;', [comment_id])
        .then(({ rows }) => {
            if (!rows.length) {
                return Promise.reject({
                    status: 404,
                    message: `No comment with ID ${comment_id}`
                });
            };
        });
};