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
  checkTopicExists,
  removeByCommentId,
} = require("../models");

exports.getEndpoints = (req, res, next) => {
  fetchEndpoints().then((endpoints) => {
    console.log(endpoints);
    res.status(200).send(JSON.stringify({ endpoints }));
  });
};

exports.getTopics = (req, res, next) => {
  fetchTopics().then((topics) => res.status(200).send({ topics }));
};

exports.getUsers = (req, res, next) => {
  fetchUsers().then((users) => {
    res.status(200).send({ users });
  });
};

exports.getArticles = (req, res, next) => {
  const { sort_by, order, topic } = req.query;

  const promise1 = checkTopicExists(topic);
  const promise2 = fetchArticles(sort_by, order, topic);
  Promise.allSettled([promise1, promise2])
    .then(([prom1, prom2]) => {
      if (topic && prom1.status === "rejected") {
        throw prom1.reason;
      } else if (prom2.status === "rejected") {
        throw prom2.reason;
      }

      res.status(200).send({ articles: prom2.value });
    })
    .catch((err) => {
      next(err);
    });
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

exports.deleteByCommentId = (req, res, next) => {
  const { comment_id } = req.params;
  removeByCommentId(comment_id)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};
