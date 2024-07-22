const { deleteComment } = require('../controllers/comments-controller.js')

const commentsRouter = require("express").Router()

commentsRouter
    .route('/:comment_id')
    .delete(deleteComment);

    
module.exports = commentsRouter;