const router = require("express").Router();
const { deleteByCommentId } = require("../controllers/comments-controller");

router.delete("/:comment_id", deleteByCommentId);

module.exports = router;
