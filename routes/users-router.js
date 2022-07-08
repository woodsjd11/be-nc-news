const router = require("express").Router();
const { getUsers } = require("../controllers/users-controller");

router.get("/", getUsers);

module.exports = router;
