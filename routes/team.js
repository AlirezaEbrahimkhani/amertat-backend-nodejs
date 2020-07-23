const express = require("express");
const router = express.Router();
const {
  getTeams,
  getTeam,
  updateTeam,
  createTeam,
  deleteTeam,
} = require("../controller/team");

router.route("/").get(getTeams).post(createTeam);

router.route("/:id").get(getTeam).put(updateTeam).delete(deleteTeam);

module.exports = router;
