const { getAllTopics } = require('../models/topic-models.js')

exports.getTopics = (request, response) => {
    return getAllTopics().then((topics) => {
        response.status(200).send({topics});
    });
};