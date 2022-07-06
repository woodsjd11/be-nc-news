const db = require("../db/connection");

exports.fetchTopics = () => {
  return db.query("SELECT * FROM topics").then(({ rows }) => {
    return rows;
  });
};

exports.fetchArticleById = (article_id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [article_id])
    .then((data) => {
      if (data.rowCount > 0) {
        return data.rows[0];
      }
      return Promise.reject({ status: 404, message: "Article Not Found" });
    });
};

exports.fetchUsers = () => {
  return db.query("SELECT * FROM users").then(({ rows }) => {
    return rows;
  });
};

exports.fetchArticles = () => {
  return db
    .query(
      "SELECT articles.author, title, articles.article_id, topic, articles.created_at, articles.votes, COUNT(comments.article_id)::int AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id GROUP BY articles.article_id ORDER BY articles.created_at DESC"
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.updateArticleById = (body, article_id) => {
  // handle missing inc_votes key
  if (!body.inc_votes) {
    body.inc_votes = 0;
  }

  return db
    .query(
      "UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING*",
      [body.inc_votes, article_id]
    )
    .then((article) => {
      if (article.rowCount > 0) {
        return article.rows[0];
      }
      return Promise.reject({
        status: 404,
        message: "Article Not Found",
      });
    });
};

exports.fetchArticleById = (article_id) => {
  return db
    .query(
      "SELECT articles.*, COUNT(comments.article_id) AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id WHERE articles.article_id = $1 GROUP BY articles.article_id",
      [article_id]
    )
    .then((data) => {
      if (data.rowCount > 0) {
        return data.rows[0];
      }
      return Promise.reject({ status: 404, message: "Article Not Found" });
    });
};

exports.fetchUsers = () => {
  return db.query("SELECT * FROM users").then(({ rows }) => {
    return rows;
  });
};

exports.createCommentByArticleId = (username, body, article_id) => {
  return db
    .query(
      "INSERT INTO comments (author, body, article_id) VALUES ($1, $2, $3) RETURNING*",
      [username, body, article_id]
    )
    .then((data) => {
      // console.log(data);
      if (data.rowCount > 0) {
        return data.rows[0];
      }
    });
};
exports.fetchCommentsByArticleId = (article_id) => {
  return db
    .query(
      "SELECT comment_id, comments.votes, comments.created_at, comments.author, comments.body FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id WHERE articles.article_id = $1",
      [article_id]
    )
    .then((data) => {
      console.log(data);
      if (data.rowCount > 0) {
        return data.rows;
      }
      return Promise.reject({ status: 404, message: "Article Not Found" });
    });
};
