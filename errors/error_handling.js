exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status && err.message) {
    res.status(err.status).send({ message: `${err.status} Error: ${err.message}` });
  } else {
    next(err);
  }
};
