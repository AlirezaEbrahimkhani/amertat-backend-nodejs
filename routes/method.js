const express = require("express");
const router = express.Router();
const { getMethods } = require("../controller/method");

router.route("/").get(getMethods);

module.exports = router;
