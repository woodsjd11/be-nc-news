const {
  fetchTopics,
  updateArticleById,
  fetchArticleById,
  fetchUsers,
  fetchCommentsByArticleId,
  fetchArticles,
  createCommentByArticleId,
  checkArticleExists,
  fetchEndpoints,
} = require("../models");

const endpoints = require("../endpoints.json");

exports.getEndpoints = (req, res, next) => {
  res.status(200).send({endpoints});
};

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

exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const promise1 = checkArticleExists(article_id);
  const promise2 = fetchCommentsByArticleId(article_id);
  Promise.all([promise2, promise1])
    .then(([comments]) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
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
      next(err);
    });
};
