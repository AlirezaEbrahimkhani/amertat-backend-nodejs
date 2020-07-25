const express = require("express");
const router = express.Router();
const {
  getTeams,
  getTeam,
  updateTeam,
  createTeam,
  deleteTeam,
} = require("../controller/team");

const { protect } = require("../middlewares/auth");

router.route("/").get(getTeams).post(protect, createTeam);

router
  .route("/:id")
  .get(getTeam)
  .put(protect, updateTeam)
  .delete(protect, deleteTeam);

module.exports = router;
