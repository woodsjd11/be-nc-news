const { fetchTopics, fetchArticleById, fetchUsers } = require("../models");

exports.getTopics = (req, res, next) => {
  fetchTopics().then((topics) => res.status(200).send({ topics }));
};

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getUsers = (req, res, next) => {
  fetchUsers().then((users) => {
    res.status(200).send({ users });
  });
};
