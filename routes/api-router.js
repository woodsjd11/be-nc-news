const apiRouter = require("express").Router();
const { getEndpoints } = require("../controllers/api-controller");
const articleRouter = require("./articles-router");
const userRouter = require("./users-router");
const commentRouter = require("./comments-router");
const topicRouter = require("./topics-router");

apiRouter.get("/", getEndpoints);
apiRouter.use("/articles", articleRouter);
apiRouter.use("/topics", topicRouter);
apiRouter.use("/comments", commentRouter);
apiRouter.use("/users", userRouter);

module.exports = apiRouter;
