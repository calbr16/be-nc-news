const { getAllTopics } = require('../models/topic-models.js')

exports.getTopics = (request, response, next) => {
    return getAllTopics().then((topics) => {
        response.status(200).send({topics});
    })
    .catch(next);
};