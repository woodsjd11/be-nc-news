const express = require("express");

const {
  getTopics,
  getArticleById,
  patchArticleById,
  getUsers,
  getArticles,
  postCommentByArticleId,
} = require("./controllers");

const {
  handleCustomErrors,
  handlePsqlErrors,
} = require("./errors/error_handling");

const app = express();

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/users", getUsers);

app.get("/api/articles", getArticles);

app.patch("/api/articles/:article_id", patchArticleById);

app.post("/api/articles/:article_id/comments", postCommentByArticleId);

app.use("*", (req, res) => {
  res.status(404).send({ message: "404 Error: Invalid Path" });
});

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
module.exports = app;
