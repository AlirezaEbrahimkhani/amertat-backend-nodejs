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

const { protect } = require("../middlewares/auth");

Router.route("/").get(getLiposuctions).post(protect, createLiposuction);

Router.route("/active").get(getActiveLiposuction);

Router.route("/:id")
  .get(getLiposuction)
  .put(protect, updateLiposuction)
  .delete(protect, deleteLiposuction);

module.exports = Router;
