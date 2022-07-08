const router = require("express").Router();
const {
  getArticles,
  getArticleById,
  getCommentsByArticleId,
  patchArticleById,
  postCommentByArticleId,
} = require("../controllers/articles-controller");

router.get("/", getArticles);
router.route("/:article_id").get(getArticleById).patch(patchArticleById);
router
  .route("/:article_id/comments")
  .get(getCommentsByArticleId)
  .post(postCommentByArticleId);

module.exports = router;
