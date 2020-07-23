const asyncHandler = require("../middlewares/async");
const Logger = require("../utils/logger");
const ImageConvertor = require("../utils/image-convertor");
const client = require("../config/db");

const imageConvertor = new ImageConvertor();

// @desc        Get all Blogs
// @route       GET /api/blog
// @access      Public
exports.getBlogs = asyncHandler(async (req, res, next) => {
  await client.query(
    "select * from tbl_blog tt inner join tbl_images ti on tt.image_id = ti.id",
    (err, result) => {
      let data = [];
      if (!err) {
        for (let i = 0; i < result.rows.length; i++) {
          const {
            image_id,
            image,
            img_name,
            title,
            description,
            link,
          } = result.rows[i];
          const imgName = imageConvertor.imageConvertor(
            image_id,
            image,
            img_name
          );
          let responseData = {
            title: title,
            image: {
              url: `/download/${imgName}`,
            },
            description: description,
            link: link,
          };
          data.push(responseData);
        }
        res.status(200).json({ success: true, count: data.length, data: data });
        new Logger("Select All Blogs ... !");
      } else {
        new Logger("Error while selecting All Blogs ... !");
      }
    }
  );
});

// @desc        Get Single Blog
// @route       GET /api/blog/:id
// @access      Public
exports.getBlog = asyncHandler(async (req, res, next) => {
  await client.query(
    "select * from tbl_blog tt inner join tbl_images ti on tt.image_id = ti.id where tt.id = $1",
    [req.params.id],
    (err, result) => {
      if (!err) {
        const {
          image_id,
          image,
          img_name,
          title,
          description,
          link,
        } = result.rows[0];
        const imgName = imageConvertor.imageConvertor(
          image_id,
          image,
          img_name
        );
        let responseData = {
          title: title,
          image: {
            url: `/download/${imgName}`,
          },
          description: description,
          link: link,
        };
        res.status(200).json({ success: true, data: responseData });
        new Logger("Select Single Blogs ... !");
      } else {
        new Logger("Error while selecting Single Blogs ... !");
      }
    }
  );
});

// @desc        create new Blog
// @route       POST /api/blog
// @access      Private
exports.createBlog = asyncHandler(async (req, res, next) => {
  const { image_id, title, description, link } = req.body;
  await client.query(
    "insert into tbl_blog (title, description, link ,image_id) values ($1 , $2 , $3 , $4)",
    [title, description, link, image_id],
    (err, result) => {
      if (!err) {
        res.status(200).json({ success: true, data: [] });
        new Logger("Create new Blog ... !");
      } else {
        new Logger("Error while creating new Blog ... !");
      }
    }
  );
});

// @desc        update a Blog
// @route       PUT /api/blog/:id
// @access      Private
exports.updateBlog = asyncHandler(async (req, res, next) => {
  const { image_id, title, description, link } = req.body;
  await client.query(
    "update tbl_blog set title = $1 , description = $2, link = $3, image_id = $4",
    [title, description, link, image_id],
    (err, result) => {
      if (!err) {
        res.status(200).json({ success: true, data: [] });
        new Logger("update a Blog ... !");
      } else {
        new Logger("Error while updating a Blog ... !");
      }
    }
  );
});

// @desc        delete a Blog
// @route       DELETE /api/blog/:id
// @access      Private
exports.deleteBlog = asyncHandler(async (req, res, next) => {
  await client.query(
    "delete from tbl_blog where id = $1",
    [req.params.id],
    (err, result) => {
      if (!err) {
        res.status(200).json({ success: true, data: [] });
        new Logger("delete a Blog ... !");
      } else {
        new Logger("Error while deleting a Blog ... !");
      }
    }
  );
});
