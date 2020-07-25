const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth");
const {
  getAccomodations,
  getAccomodation,
  getActiveAccomodation,
  createAccomodation,
  updateAccomodation,
  deleteAccomodation,
} = require("../controller/accomodation-service");

router.route("/active").get(getActiveAccomodation);

router.route("/").get(getAccomodations).post(protect, createAccomodation);

router
  .route("/:id")
  .get(getAccomodation)
  .put(protect, updateAccomodation)
  .delete(protect, deleteAccomodation);

module.exports = router;
