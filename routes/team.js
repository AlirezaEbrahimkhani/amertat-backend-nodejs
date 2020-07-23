const express = require("express");
const router = express.Router();
const { getTeams, getTeam } = require("../controller/team");

router.route("/").get(getTeams);

router.route("/:id").get(getTeam);

module.exports = router;
