const express = require("express");
const router = express.Router();
const {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controller/blog");

router.route("/").get(getBlogs).post(createBlog);

router.route("/:id").put(updateBlog).get(getBlog).delete(deleteBlog);

module.exports = router;
