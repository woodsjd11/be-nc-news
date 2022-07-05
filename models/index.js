const db = require("../db/connection");

exports.fetchTopics = () => {
  return db.query("SELECT * FROM topics").then(({ rows }) => {
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

exports.fetchCommentsByArticleId = (article_id) => {
  return db
    .query(
      "SELECT comment_id, comments.votes, comments.created_at, comments.author, comments.body FROM articles RIGHT JOIN comments ON articles.article_id = comments.article_id WHERE articles.article_id = $1",
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
