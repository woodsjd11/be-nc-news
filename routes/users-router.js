const router = require("express").Router();
const { getUsers } = require("../controllers/index");

router.get("/", getUsers);

module.exports = router;
