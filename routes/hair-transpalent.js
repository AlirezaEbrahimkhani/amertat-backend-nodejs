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

const { protect } = require("../middlewares/auth");

Router.route("/").get(getHairTransplants).post(protect, createHairTransplant);

Router.route("/active").get(getActiveHairTransplant);

Router.route("/:id")
  .get(getHairTransplant)
  .put(protect, updateHairTransplant)
  .delete(protect, deleteHairTransplant);

module.exports = Router;
