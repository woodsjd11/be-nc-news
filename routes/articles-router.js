const router = require("express").Router();

const {
  getArticles,
  getArticleById,
  getCommentsByArticleId,
  patchArticleById,
  postCommentByArticleId,
} = require("../controllers/index");

router.get("/", getArticles);
router.route("/:article_id").get(getArticleById).patch(patchArticleById);

router.get("/:article_id/comments", getCommentsByArticleId);
router.post("/:article_id/comments", postCommentByArticleId);

module.exports = router;
