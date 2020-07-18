const express = require("express");
const Router = express.Router();
const {
  getLiposuctions,
  getLiposuction,
  getActiveLiposuction,
  createLiposuction,
  deleteLiposuction,
  updateLiposuction,
} = require("../controller/liposuction");

Router.route("/").get(getLiposuctions).post(createLiposuction);

Router.route("/active").get(getActiveLiposuction);

Router.route("/:id")
  .get(getLiposuction)
  .put(updateLiposuction)
  .delete(deleteLiposuction);

module.exports = Router;
