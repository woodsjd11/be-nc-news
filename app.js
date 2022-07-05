const express = require("express");
const { getTopics, getArticleById } = require("./controllers");
const {
  handleCustomErrors,
  handlePsqlErrors,
} = require("./errors/error_handling");
const app = express();

app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticleById);
app.use("*", (req, res) => {
  res.status(404).send({ message: "404 Error: Invalid Path" });
});

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
module.exports = app;
