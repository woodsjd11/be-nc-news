const {
  fetchTopics,
  updateArticleById,
  fetchArticleById,
  fetchUsers,
  fetchArticles,
  createCommentByArticleId,
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

exports.postCommentByArticleId = (req, res, next) => {
  const { username, body } = req.body;
  const { article_id } = req.params;
  //require both properties
  if (!username || !body) {
    err = { status: 400, message: "Bad Request" };
    throw err;
  }
  createCommentByArticleId(username, body, article_id)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch((err) => {
      //400 error for invalid username. Required as the same psql error code is being used for a 404 error - article not found
      if (
        err.detail ===
        'Key (author)=(invalid user) is not present in table "users".'
      ) {
        res.status(400).send({ message: "400 Error: User Not Found" });
      }
      next(err);
    });
};
