const db = require("../db/connection");

exports.fetchTopics = () => {
  return db.query("SELECT * FROM topics").then(({ rows }) => {
    return rows;
  });
};

exports.updateArticleById = (body, article_id) => {
  if (body.inc_votes) {
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
  }
};
exports.fetchArticleById = (article_id) => {
  // if (/\D+/.test(article_id)) {
  //   return Promise.reject({ status: 400, message: "Bad Request" });
  // }
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [article_id])
    .then((data) => {
      if (data.rowCount > 0) {
        return data.rows[0];
      }
      return Promise.reject({ status: 404, message: "Article Not Found" });
    });
};
