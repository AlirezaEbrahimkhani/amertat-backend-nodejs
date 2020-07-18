const express = require("express");
const Router = express.Router();
const {
  getHairTransplants,
  getHairTransplant,
  getActiveHairTransplant,
  createHairTransplant,
  deleteHairTransplant,
  updateHairTransplant,
} = require("../controller/hair-transpalent");

Router.route("/").get(getHairTransplants).post(createHairTransplant);

Router.route("/active").get(getActiveHairTransplant);

Router.route("/:id")
  .get(getHairTransplant)
  .put(updateHairTransplant)
  .delete(deleteHairTransplant);

module.exports = Router;
