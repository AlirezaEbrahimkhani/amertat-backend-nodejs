const express = require("express");
const router = express.Router();
const {
  getPopularProcedures,
  getPopularProcedure,
  createPopularProcedure,
  updatePopularProcedure,
  deletePopularProcedure,
} = require("../controller/popular-procedure");

router.route("/").get(getPopularProcedures).post(createPopularProcedure);

router
  .route("/:id")
  .get(getPopularProcedure)
  .put(updatePopularProcedure)
  .delete(deletePopularProcedure);

module.exports = router;
