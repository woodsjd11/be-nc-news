const db = require("../db/connection");
const articles = require("../db/data/test-data/articles");

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

exports.fetchArticles = (sort_by = "created_at", order = "desc", topic) => {
  const validSortOptions = [
    "title",
    "topic",
    "author",
    "body",
    "created_at",
    "votes",
    "comment_count",
  ];
  const validOrderOptions = ["asc", "desc"];
  if (
    !validSortOptions.includes(sort_by) ||
    !validOrderOptions.includes(order)
  ) {
    return Promise.reject({ status: 400, message: "Invalid query" });
  }
  let queryStr = `SELECT articles.author, title, articles.article_id, topic, articles.created_at, articles.votes, COUNT(comments.article_id)::int AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id`;

  const topicValue = [];

  if (topic) {
    queryStr += " WHERE topic = $1";
    topicValue.push(topic);
  }
  queryStr += ` GROUP BY articles.article_id ORDER BY ${sort_by} ${order}`;
  
  return db.query(queryStr, topicValue).then(({ rows, rowCount }) => {
    // if (rowCount > 0) {
      return rows;
    // }
    // return Promise.reject({ status: 404, message: "Topic Not Found" });
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
      if (data.rowCount > 0) {
        return data.rows[0];
      }
    });
};
exports.fetchCommentsByArticleId = (article_id) => {
  return db
    .query(
      "SELECT comment_id, votes, created_at, author, body FROM comments WHERE comments.article_id = $1",
      [article_id]
    )
    .then(({ rows }) => {
      return rows;
    });
};
exports.checkArticleExists = (article_id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [article_id])
    .then(({ rowCount }) => {
      if (rowCount === 0) {
        return Promise.reject({ status: 404, message: "Article Not Found" });
      }
    });
};
