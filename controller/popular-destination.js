const asyncHandler = require("../middlewares/async");
const Logger = require("../utils/logger");
const ImageConvertor = require("../utils/image-convertor");
const client = require("../config/db");

const imageConvertor = new ImageConvertor();

// @desc        Get all popular destinations
// @route       GET /api/popular-destination
// @access      Public
exports.getPopularDestinations = asyncHandler(async (req, res, next) => {
  await client.query(
    "select * from tbl_populardestination tp inner join tbl_images ti on tp.image_id = ti.id",
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
            writer,
          } = result.rows[i];
          const name = imageConvertor.imageConvertor(image_id, image, img_name);
          let responseData = {
            title: title,
            description: description,
            writer: writer,
            image: {
              url: `/download/${name}`,
            },
          };
          data.push(responseData);
        }
        res.status(200).json({ success: true, data: data });
        new Logger("Select All Popular destinations ... !");
      } else {
        new Logger("Error while selecting All Popular destinations ... !");
      }
    }
  );
});

// @desc        Get Single popular destination
// @route       GET /api/popular-destination/:id
// @access      Public
exports.getPopularDestination = asyncHandler(async (req, res, next) => {
  await client.query(
    "select * from tbl_populardestination tp inner join tbl_images ti on tp.image_id = ti.id where tp.id = $1",
    [req.params.id],
    (err, result) => {
      if (!err) {
        const {
          image_id,
          image,
          img_name,
          title,
          description,
          writer,
        } = result.rows[0];
        const name = imageConvertor.imageConvertor(image_id, image, img_name);
        let responseData = {
          title: title,
          description: description,
          writer: writer,
          image: {
            url: `/download/${name}`,
          },
        };

        res.status(200).json({ success: true, data: responseData });
        new Logger("Select Single popular destinations ... !");
      } else {
        new Logger("Error while selecting Single popular destinations ... !");
      }
    }
  );
});

// @desc        Create new popular destination
// @route       POST /api/popular-destination
// @access      Private
exports.createPopularDestination = asyncHandler(async (req, res, next) => {
  const { title, description, writer, image_id } = req.body;
  await client.query(
    "insert into tbl_populardestination (title  , description  , writer  , image_id ) values ($1 , $2 , $3 , $4)",
    [title, description, writer, image_id],
    (err, result) => {
      if (!err) {
        res.status(201).json({ success: true, data: [] });
        new Logger("Create new popular destinations ... !");
      } else {
        new Logger("Error while creating new popular destinations ... !");
      }
    }
  );
});

// @desc        Update popular destination
// @route       PUT /api/popular-destination/:id
// @access      Private
exports.updatePopularDestination = asyncHandler(async (req, res, next) => {
  const { title, description, writer, image_id } = req.body;
  await client.query(
    "update tbl_populardestination set title = $1 , description = $2, writer = $3 , image_id = $4 where id = $5",
    [title, description, writer, image_id, req.params.id],
    (err, result) => {
      if (!err) {
        res.status(200).json({ success: true, data: [] });
        new Logger("Update popular destinations ... !");
      } else {
        new Logger("Error while Updating destinations ... !");
      }
    }
  );
});

// @desc        Delete popular destination
// @route       DELETE /api/popular-destination/:id
// @access      Private
exports.deletePopularDestination = asyncHandler(async (req, res, next) => {
  await client.query(
    "delete from tbl_populardestination where id = $1",
    [req.params.id],
    (err, result) => {
      if (!err) {
        res.status(200).json({ success: true, data: [] });
        new Logger("Delete popular destinations ... !");
      } else {
        new Logger("Error while deleting destinations ... !");
      }
    }
  );
});
