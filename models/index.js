const db = require("../db/connection");

exports.fetchTopics = () => {
  return db.query("SELECT * FROM topics").then(({ rows }) => {
    return rows;
  });
};

exports.fetchArticleById = (article_id) => {
  if (/\D+/.test(article_id)) {
    return Promise.reject({ status: 400, message: "Bad Request" });
  }
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [article_id])
    .then((data) => {
      if (data.rowCount > 0) {
        return data.rows[0];
      }
      return Promise.reject({ status: 404, message: "Article Not Found" });
    });
};
