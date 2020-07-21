const express = require("express");
const router = express.Router();
const {
  getHomes,
  getHome,
  getActiveHome,
  updateHome,
  createHome,
  deleteHome,
} = require("../controller/home");

router.route("/").get(getHomes).post(createHome);

router.route("/active").get(getActiveHome);

router.route("/:id").get(getHome).put(updateHome).delete(deleteHome);

module.exports = router;
