const express = require("express");
const app = express();

const {
  handleCustomErrors,
  handlePsqlErrors,
  serverError,
} = require("./errors/error_handling");

const apiRouter = require("./routes/api-router");

app.use(express.json());

app.use("/api", apiRouter);

app.use("*", (req, res) => {
  res.status(404).send({ message: "404 Error: Invalid Path" });
});

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(serverError);

module.exports = app;
