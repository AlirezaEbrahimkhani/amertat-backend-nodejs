const express = require("express");
const router = express.Router();
const {
  getTourismServices,
  getTourismService,
  getActiveTourismService,
  deleteTourismService,
  updateTourismService,
  createTourismService,
} = require("../controller/tourism-service");

router.route("/").get(getTourismServices).post(createTourismService);

router.route("/active").get(getActiveTourismService);

router
  .route("/:id")
  .get(getTourismService)
  .put(updateTourismService)
  .delete(deleteTourismService);

module.exports = router;
