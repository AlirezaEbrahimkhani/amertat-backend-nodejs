const asyncHandler = require("../middlewares/async");
const Logger = require("../utils/logger");
const client = require("../config/db");
const path = require("path");
const fs = require("fs");

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
        var buffer = Buffer.from(image, "base64");
        const name = `${id}_${img_name}`;
        fs.writeFile(
          path.join(
            `${path.dirname(require.main.filename)}/public/download`,
            name
          ),
          buffer,
          (err) => {
            new Logger("Error while selecting an Image ... !");
          }
        );
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
        res.status(201).json({ success: true, data: [] });
        new Logger("Insert new Image ... !");
      } else {
        new Logger("Error while inserting new image ... !");
      }
    }
  );
});
