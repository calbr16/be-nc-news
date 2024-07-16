const { getAllTopics } = require('../models/topic-models.js')

const getTopics = (request, response) => {
    return getAllTopics().then((topics) => {
        response.status(200).send({topics});
    });
};

module.exports = { getTopics };