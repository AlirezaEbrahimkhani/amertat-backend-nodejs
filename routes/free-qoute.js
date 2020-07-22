const express = require("express");
const router = express.Router();
const { createNewQouteForm } = require("../controller/free-qoute");

router.route("/").post(createNewQouteForm);

module.exports = router;
