const {
  fetchTopics,
  updateArticleById,
  fetchArticleById,
  fetchUsers,
  fetchArticles,
} = require("../models");

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
      console.log(err);
      next(err);
    });
};

exports.getUsers = (req, res, next) => {
  fetchUsers().then((users) => {
    res.status(200).send({ users });
  });
};

exports.getArticles = (req, res, next) => {
  fetchArticles().then((articles) => {
    res.status(200).send({ articles });
  });
};

exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  updateArticleById(req.body, article_id)
    .then((article) => {
      //// handle missing inc_votes key, 200 message
      if (req.body.inc_votes === 0) {
        res.status(200).send({ article });
      }
      res.status(201).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};
