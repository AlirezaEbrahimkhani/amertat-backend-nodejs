const express = require("express");
const router = express.Router();
const { createNewForm } = require("../controller/contact-us");

router.route("/").post(createNewForm);

module.exports = router;
