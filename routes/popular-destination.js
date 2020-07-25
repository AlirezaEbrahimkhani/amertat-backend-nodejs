const express = require("express");
const router = express.Router();
const {
  getPopularDestinations,
  getPopularDestination,
  createPopularDestination,
  updatePopularDestination,
  deletePopularDestination,
} = require("../controller/popular-destination");

const { protect } = require("../middlewares/auth");

router
  .route("/:id")
  .get(getPopularDestination)
  .put(protect, updatePopularDestination)
  .delete(protect, deletePopularDestination);

router
  .route("/")
  .get(getPopularDestinations)
  .post(protect, createPopularDestination);

module.exports = router;
