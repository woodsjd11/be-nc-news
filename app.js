const express = require("express");
const { getTopics, patchArticleById } = require("./controllers");
const app = express();
app.use(express.json());

app.get("/api/topics", getTopics);
app.patch("/api/articles/:article_id", patchArticleById);
app.use("*", (req, res) => {
  res.status(404).send({ message: "404 Error: Invalid Path" });
});
module.exports = app;
