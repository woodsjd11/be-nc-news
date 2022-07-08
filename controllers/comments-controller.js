const { removeByCommentId } = require("../models/comments-model");

exports.deleteByCommentId = (req, res, next) => {
  const { comment_id } = req.params;
  removeByCommentId(comment_id)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};
