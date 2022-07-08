const router = require("express").Router();
const { getTopics } = require("../controllers/index");

router.get("/", getTopics);

module.exports = router;
