const asyncHandler = require("../middlewares/async");
const Logger = require("../utils/logger");
const ImageConvertor = require("../utils/image-convertor");
const client = require("../config/db");

const imageConvertor = new ImageConvertor();

// @desc        Get image and Store
// @route       GET /api/upload
// @access      Public
exports.getImage = asyncHandler(async (req, res, next) => {
  await client.query(
    "select * from tbl_images where id = $1",
    [req.params.id],
    (err, result) => {
      if (!err) {
        const { id, image, img_name } = result.rows[0];
        const name = imageConvertor.imageConvertor(id, image, img_name);
        res.status(200).json({ success: true, url: `/download/${name}` });
        new Logger("Select an Image ... !");
      } else {
        new Logger("Error while selecting an Image ... !");
      }
    }
  );
});

// @desc        insert new image
// @route       POST /api/upload
// @access      Public
exports.insertImage = asyncHandler(async (req, res, next) => {
  const { name, data } = req.files.file;
  await client.query(
    "insert into tbl_images (image , img_name) values ($1 , $2)",
    [data, name],
    (err, result) => {
      if (!err) {
        client.query(
          "select id from tbl_images where img_name = $1",
          [name],
          (err, data) => {
            res.status(201).json({ success: true, data: data.rows });
          }
        );
        new Logger("Insert new Image ... !");
      } else {
        new Logger("Error while inserting new image ... !");
      }
    }
  );
});

// @desc        update new image
// @route       PUT /api/upload/:id
// @access      Private
exports.updateImage = asyncHandler(async (req, res, next) => {
  const { name, data } = req.files.file;
  await client.query(
    "update tbl_images set image = $1 , img_name = $2 where id = $3",
    [data, name, req.params.id],
    (err, result) => {
      if (!err) {
        res.status(200).json({ success: true, data: [] });
        new Logger("Update a Image ... !");
      } else {
        new Logger("Error while updating a image ... !");
      }
    }
  );
});
