const router = require("express").Router();
const { deleteByCommentId } = require("../controllers/index");

router.delete("/:comment_id", deleteByCommentId);

module.exports = router;
