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

const { protect } = require("../middlewares/auth");

router.route("/").get(getTourismServices).post(protect, createTourismService);

router.route("/active").get(getActiveTourismService);

router
  .route("/:id")
  .get(getTourismService)
  .put(protect, updateTourismService)
  .delete(protect, deleteTourismService);

module.exports = router;
