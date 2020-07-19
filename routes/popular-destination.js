const express = require("express");
const router = express.Router();
const {
  getPopularDestinations,
  getPopularDestination,
} = require("../controller/popular-destination");

router.route("/:id").get(getPopularDestination);

router.route("/").get(getPopularDestinations);

module.exports = router;
