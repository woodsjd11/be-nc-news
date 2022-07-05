const express = require("express");
const { getTopics, getArticleById, getUsers } = require("./controllers");
const {
  handleCustomErrors,
  handlePsqlErrors,
} = require("./errors/error_handling");
const app = express();

app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/users", getUsers);
app.use("*", (req, res) => {
  res.status(404).send({ message: "404 Error: Invalid Path" });
});

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
module.exports = app;
