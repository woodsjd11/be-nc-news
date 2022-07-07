const express = require("express");

const {
  getTopics,
  getArticleById,
  patchArticleById,
  getUsers,
  getCommentsByArticleId,
  getArticles,
  postCommentByArticleId,

  deleteByCommentId,
} = require("./controllers");

const {
  handleCustomErrors,
  handlePsqlErrors,
  serverError,
} = require("./errors/error_handling");

const app = express();

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/users", getUsers);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.patch("/api/articles/:article_id", patchArticleById);

app.post("/api/articles/:article_id/comments", postCommentByArticleId);

app.delete("/api/comments/:comment_id", deleteByCommentId);

app.use("*", (req, res) => {
  res.status(404).send({ message: "404 Error: Invalid Path" });
});

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(serverError);
module.exports = app;
