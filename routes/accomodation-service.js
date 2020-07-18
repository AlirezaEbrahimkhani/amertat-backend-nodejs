const express = require("express");
const router = express.Router();
const {
  getAccomodations,
  getAccomodation,
  getActiveAccomodation,
  createAccomodation,
} = require("../controller/accomodation-service");

router.route("/active").get(getActiveAccomodation);

router.route("/").get(getAccomodations).post(createAccomodation);

router.route("/:id").get(getAccomodation);

module.exports = router;
