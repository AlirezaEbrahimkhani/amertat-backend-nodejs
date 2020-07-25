const express = require("express");
const router = express.Router();
const {
  getDevelopers,
  getDeveloper,
  createDeveloper,
  updateDeveloper,
  deleteDeveloper,
} = require("../controller/developers");

const { protect } = require("../middlewares/auth");

router.route("/").get(getDevelopers).post(protect, createDeveloper);

router
  .route("/:id")
  .get(getDeveloper)
  .put(protect, updateDeveloper)
  .delete(protect, deleteDeveloper);

module.exports = router;
