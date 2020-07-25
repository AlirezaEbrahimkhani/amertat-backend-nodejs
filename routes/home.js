const express = require("express");
const router = express.Router();
const {
  getHomes,
  getHome,
  getActiveHome,
  updateHome,
  createHome,
  deleteHome,
} = require("../controller/home");

const { protect } = require("../middlewares/auth");

router.route("/").get(getHomes).post(protect, createHome);

router.route("/active").get(getActiveHome);

router
  .route("/:id")
  .get(getHome)
  .put(protect, updateHome)
  .delete(protect, deleteHome);

module.exports = router;
