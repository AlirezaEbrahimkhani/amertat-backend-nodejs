const express = require("express");
const router = express.Router();
const {
  getAccomodations,
  getAccomodation,
  getActiveAccomodation,
  createAccomodation,
  updateAccomodation,
} = require("../controller/accomodation-service");

router.route("/active").get(getActiveAccomodation);

router.route("/").get(getAccomodations).post(createAccomodation);

router.route("/:id").get(getAccomodation).put(updateAccomodation);

module.exports = router;
