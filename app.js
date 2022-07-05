const express = require("express");

const {
  getTopics,
  getArticleById,
  patchArticleById,
} = require("./controllers");
const {
  handleCustomErrors,
  handlePsqlErrors,
} = require("./errors/error_handling");
const app = express();
app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleById);
app.patch("/api/articles/:article_id", patchArticleById);
app.use("*", (req, res) => {
  res.status(404).send({ message: "404 Error: Invalid Path" });
});
app.use(handleCustomErrors);
app.use(handlePsqlErrors);
module.exports = app;
