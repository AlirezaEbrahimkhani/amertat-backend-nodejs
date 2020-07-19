const express = require("express");
const router = express.Router();
const {
  getPopularDestinations,
  getPopularDestination,
  createPopularDestination,
  updatePopularDestination,
  deletePopularDestination,
} = require("../controller/popular-destination");

router
  .route("/:id")
  .get(getPopularDestination)
  .put(updatePopularDestination)
  .delete(deletePopularDestination);

router.route("/").get(getPopularDestinations).post(createPopularDestination);

module.exports = router;
