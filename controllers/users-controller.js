const { selectAllUsers } = require("../models/user-models")

exports.getUsers = (request, response, next) => {
    selectAllUsers().then((users) => {
        response.status(200).send({ users });
    })
    .catch(next);
};