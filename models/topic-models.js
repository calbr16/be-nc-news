const db = require('../db/connection.js')

exports.getAllTopics = () => {
    const getTopicsQuery = `SELECT * FROM topics;`;
    return db.query(getTopicsQuery).then((result) => {
        const topics = result.rows;
        if (!topics) {
            return Promise.reject({
                status: 404,
                message: 'Invalid endpoint!'
            });
        };
        return topics;
    });
};

