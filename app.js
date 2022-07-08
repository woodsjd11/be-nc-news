const express = require("express");

const {
  handleCustomErrors,
  handlePsqlErrors,
  serverError,
} = require("./errors/error_handling");

const app = express();

const apiRouter = require("./routes/api-router");
const articleRouter = require("./routes/articles-router");
const topicRouter = require("./routes/topics-router");
const commentRouter = require("./routes/comments-router");
const userRouter = require("./routes/users-router");
app.use(express.json());

app.use("/api", apiRouter);
app.use("/api/articles", articleRouter);
app.use("/api/topics", topicRouter);
app.use("/api/comments", commentRouter);
app.use("/api/users", userRouter);

app.use("*", (req, res) => {
  res.status(404).send({ message: "404 Error: Invalid Path" });
});

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(serverError);

module.exports = app;
