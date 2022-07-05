exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status && err.message) {
    res
      .status(err.status)
      .send({ message: `${err.status} Error: ${err.message}` });
  } else {
    next(err);
  }
};

exports.handlePsqlErrors = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ message: "400 Error: Bad Request" });
  } else {
    next(err);
  }
};
