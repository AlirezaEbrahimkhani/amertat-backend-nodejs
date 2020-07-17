const express = require("express");
const router = express.Router();
const {
  getAccomodations,
  getAccomodation,
} = require("../controller/accomodation-service");

router.route("/").get(getAccomodations);

router.route("/:id").get(getAccomodation);

module.exports = router;
