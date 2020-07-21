const asyncHandler = require("../middlewares/async");
const Logger = require("../utils/logger");
const ImageConvertor = require("../utils/image-convertor");
const client = require("../config/db");

const imageConvertor = new ImageConvertor();

// @desc        Get all popular Procedures
// @route       GET /api/popular-procedure
// @access      Public
exports.getPopularProcedures = asyncHandler(async (req, res, next) => {
  await client.query(
    "select * from tbl_popularprocedure tp inner join tbl_images ti on tp.image_id = ti.id",
    (err, result) => {
      let data = [];
      if (!err) {
        for (let i = 0; i < result.rows.length; i++) {
          const { image_id, image, img_name, description, link } = result.rows[
            i
          ];
          const name = imageConvertor.imageConvertor(image_id, image, img_name);
          let responseData = {
            description: description,
            link: link,
            image: {
              url: `/download/${name}`,
            },
          };
          data.push(responseData);
        }
        res.status(200).json({ success: true, count: data.length, data: data });
        new Logger("Select All Popular Procedures ... !");
      } else {
        new Logger("Error while selecting All Popular Procedures ... !");
      }
    }
  );
});

// @desc        Get Single popular Procedure
// @route       GET /api/popular-procedure/:id
// @access      Public
exports.getPopularProcedure = asyncHandler(async (req, res, next) => {
  await client.query(
    "select * from tbl_popularprocedure tp inner join tbl_images ti on tp.image_id = ti.id where tp.id = $1",
    [req.params.id],
    (err, result) => {
      if (!err) {
        const { image_id, image, img_name, description, link } = result.rows[0];
        const name = imageConvertor.imageConvertor(image_id, image, img_name);
        let responseData = {
          description: description,
          link: link,
          image: {
            url: `/download/${name}`,
          },
        };

        res.status(200).json({ success: true, data: responseData });
        new Logger("Select Single popular Procedures ... !");
      } else {
        new Logger("Error while selecting Single popular Procedures ... !");
      }
    }
  );
});

// @desc        Create new popular Procedure
// @route       POST /api/popular-procedure
// @access      Private
exports.createPopularProcedure = asyncHandler(async (req, res, next) => {
  const { description, link, image_id } = req.body;
  await client.query(
    "insert into tbl_popularprocedure (description  , link  , image_id ) values ($1 , $2 , $3)",
    [description, link, image_id],
    (err, result) => {
      if (!err) {
        res.status(201).json({ success: true, data: [] });
        new Logger("Create new popular Procedures ... !");
      } else {
        new Logger("Error while creating new popular Procedures ... !");
      }
    }
  );
});

// @desc        Update popular Procedure
// @route       PUT /api/popular-procedure/:id
// @access      Private
exports.updatePopularProcedure = asyncHandler(async (req, res, next) => {
  const { description, link, image_id } = req.body;

  await client.query(
    "update tbl_popularprocedure set description = $1, link = $2 , image_id = $3 where id = $4",
    [description, link, image_id, req.params.id],
    (err, result) => {
      if (!err) {
        res.status(200).json({ success: true, data: [] });
        new Logger("Update popular Procedures ... !");
      } else {
        new Logger("Error while Updating Procedures ... !");
      }
    }
  );
});

// @desc        Delete popular Procedure
// @route       DELETE /api/popular-procedure/:id
// @access      Private
exports.deletePopularProcedure = asyncHandler(async (req, res, next) => {
  await client.query(
    "delete from tbl_popularprocedure where id = $1",
    [req.params.id],
    (err, result) => {
      if (!err) {
        res.status(200).json({ success: true, data: [] });
        new Logger("Delete popular Procedures ... !");
      } else {
        new Logger("Error while deleting Procedures ... !");
      }
    }
  );
});
