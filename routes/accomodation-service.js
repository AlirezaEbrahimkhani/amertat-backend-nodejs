const express = require("express");
const router = express.Router();
const {
  getAccomodations,
  getAccomodation,
  getActiveAccomodation,
  createAccomodation,
  updateAccomodation,
  deleteAccomodation,
} = require("../controller/accomodation-service");

router.route("/active").get(getActiveAccomodation);

router.route("/").get(getAccomodations).post(createAccomodation);

router
  .route("/:id")
  .get(getAccomodation)
  .put(updateAccomodation)
  .delete(deleteAccomodation);

module.exports = router;
