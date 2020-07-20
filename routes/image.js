const express = require("express");
const router = express.Router();
const { getImage, insertImage, updateImage } = require("../controller/image");

router.route("/:id").get(getImage).put(updateImage);

router.route("/").post(insertImage);

module.exports = router;
