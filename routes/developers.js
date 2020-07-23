const express = require("express");
const router = express.Router();
const {
  getDevelopers,
  getDeveloper,
  createDeveloper,
  updateDeveloper,
  deleteDeveloper,
} = require("../controller/developers");

router.route("/").get(getDevelopers).post(createDeveloper);

router
  .route("/:id")
  .get(getDeveloper)
  .put(updateDeveloper)
  .delete(deleteDeveloper);

module.exports = router;
