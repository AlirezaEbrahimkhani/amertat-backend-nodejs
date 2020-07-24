const express = require("express");
const router = express.Router();
const { register } = require("../controller/auth");

router.route("/").post(register);

module.exports = router;
