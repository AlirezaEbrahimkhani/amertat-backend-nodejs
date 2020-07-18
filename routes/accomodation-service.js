const express = require("express");
const router = express.Router();
const {
  getAccomodations,
  getAccomodation,
  createAccomodation,
} = require("../controller/accomodation-service");

router.route("/").get(getAccomodations).post(createAccomodation);

router.route("/:id").get(getAccomodation);

module.exports = router;
