const express = require("express");
const router = express.Router();
const { getFeedbacks } = require("../controller/feedback");

router.route("/").get(getFeedbacks);

module.exports = router;
