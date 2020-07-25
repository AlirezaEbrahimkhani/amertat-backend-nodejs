const express = require("express");
const router = express.Router();
const {
  getPopularProcedures,
  getPopularProcedure,
  createPopularProcedure,
  updatePopularProcedure,
  deletePopularProcedure,
} = require("../controller/popular-procedure");

const { protect } = require("../middlewares/auth");

router
  .route("/")
  .get(getPopularProcedures)
  .post(protect, createPopularProcedure);

router
  .route("/:id")
  .get(getPopularProcedure)
  .put(protect, updatePopularProcedure)
  .delete(protect, deletePopularProcedure);

module.exports = router;
