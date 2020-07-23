const asyncHandler = require("../middlewares/async");
const Logger = require("../utils/logger");
const ImageConvertor = require("../utils/image-convertor");
const client = require("../config/db");

const imageConvertor = new ImageConvertor();

// @desc        Get all Developers
// @route       GET /api/developers
// @access      Public
exports.getDevelopers = asyncHandler(async (req, res, next) => {
  await client.query(
    "select * from tbl_developers tt inner join tbl_images ti on tt.image_id = ti.id",
    (err, result) => {
      let data = [];
      if (!err) {
        for (let i = 0; i < result.rows.length; i++) {
          const { image_id, image, img_name, name, position } = result.rows[i];
          const imgName = imageConvertor.imageConvertor(
            image_id,
            image,
            img_name
          );
          let responseData = {
            name: name,
            position: position,
            image: {
              url: `/download/${imgName}`,
            },
          };
          data.push(responseData);
        }
        res.status(200).json({ success: true, count: data.length, data: data });
        new Logger("Select All Developers ... !");
      } else {
        new Logger("Error while selecting All Developers ... !");
      }
    }
  );
});

// @desc        Get Single Developer
// @route       GET /api/developers/:id
// @access      Public
exports.getDeveloper = asyncHandler(async (req, res, next) => {
  await client.query(
    "select * from tbl_developers tt inner join tbl_images ti on tt.image_id = ti.id where tt.id = $1",
    [req.params.id],
    (err, result) => {
      if (!err) {
        const { image_id, image, img_name, name, position } = result.rows[0];
        const imgName = imageConvertor.imageConvertor(
          image_id,
          image,
          img_name
        );
        let responseData = {
          name: name,
          position: position,
          image: {
            url: `/download/${imgName}`,
          },
        };
        res.status(200).json({ success: true, data: responseData });
        new Logger("Select Single Developers ... !");
      } else {
        new Logger("Error while selecting Single Developers ... !");
      }
    }
  );
});

// @desc        create new Developer
// @route       POST /api/developers
// @access      Private
exports.createDeveloper = asyncHandler(async (req, res, next) => {
  const { name, position, description, image_id } = req.body;
  await client.query(
    "insert into tbl_developers (name, position, image_id) values ($1 , $2 , $3)",
    [name, position, image_id],
    (err, result) => {
      if (!err) {
        res.status(200).json({ success: true, data: [] });
        new Logger("Create new Developer ... !");
      } else {
        new Logger("Error while creating new Developer ... !");
      }
    }
  );
});

// @desc        update a Developer
// @route       PUT /api/developers/:id
// @access      Private
exports.updateDeveloper = asyncHandler(async (req, res, next) => {
  const { name, position, image_id } = req.body;
  await client.query(
    "update tbl_developers set name = $1 , position = $2, image_id = $3",
    [name, position, image_id],
    (err, result) => {
      if (!err) {
        res.status(200).json({ success: true, data: [] });
        new Logger("update a Developer ... !");
      } else {
        new Logger("Error while updating a Developer ... !");
      }
    }
  );
});

// @desc        delete a Developer
// @route       DELETE /api/developers/:id
// @access      Private
exports.deleteDeveloper = asyncHandler(async (req, res, next) => {
  await client.query(
    "delete from tbl_developers where id = $1",
    [req.params.id],
    (err, result) => {
      if (!err) {
        res.status(200).json({ success: true, data: [] });
        new Logger("delete a Developer ... !");
      } else {
        new Logger("Error while deleting a Developer ... !");
      }
    }
  );
});
