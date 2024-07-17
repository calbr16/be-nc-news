const db = require('../db/connection.js')

const getAllTopics = () => {
    const getTopicsQuery = `SELECT * FROM topics`;
    return db.query(getTopicsQuery).then((result) => {
        return result.rows;
    });
};

module.exports = { getAllTopics };