const express = require("express");
const router = express.Router();
const { getImage, insertImage } = require("../controller/image");

router.route("/:id").get(getImage);

router.route("/").post(insertImage);

module.exports = router;
