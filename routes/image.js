const express = require("express");
const router = express.Router();
const { getImage, insertImage, updateImage } = require("../controller/image");

const { protect } = require("../middlewares/auth");

router.route("/:id").get(getImage).put(protect, updateImage);

router.route("/").post(insertImage);

module.exports = router;
