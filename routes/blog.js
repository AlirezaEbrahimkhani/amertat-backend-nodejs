const express = require("express");
const router = express.Router();
const {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controller/blog");

const { protect } = require("../middlewares/auth");

router.route("/").get(getBlogs).post(protect, createBlog);

router
  .route("/:id")
  .put(protect, updateBlog)
  .get(getBlog)
  .delete(protect, deleteBlog);

module.exports = router;
