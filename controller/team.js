const asyncHandler = require("../middlewares/async");
const Logger = require("../utils/logger");
const ImageConvertor = require("../utils/image-convertor");
const client = require("../config/db");

const imageConvertor = new ImageConvertor();

// @desc        Get all teams
// @route       GET /api/team
// @access      Public
exports.getTeams = asyncHandler(async (req, res, next) => {
  await client.query(
    "select * from tbl_team tt inner join tbl_images ti on tt.image_id = ti.id",
    (err, result) => {
      let data = [];
      if (!err) {
        for (let i = 0; i < result.rows.length; i++) {
          const {
            image_id,
            image,
            img_name,
            name,
            description,
            position,
          } = result.rows[i];
          const imgName = imageConvertor.imageConvertor(
            image_id,
            image,
            img_name
          );
          let responseData = {
            name: name,
            description: description,
            position: position,
            image: {
              url: `/download/${imgName}`,
            },
          };
          data.push(responseData);
        }
        res.status(200).json({ success: true, count: data.length, data: data });
        new Logger("Select All Teams ... !");
      } else {
        new Logger("Error while selecting All Teams ... !");
      }
    }
  );
});

// @desc        Get Single teams
// @route       GET /api/team/:id
// @access      Public
exports.getTeam = asyncHandler(async (req, res, next) => {
  await client.query(
    "select * from tbl_team tt inner join tbl_images ti on tt.image_id = ti.id where tt.id = $1",
    [req.params.id],
    (err, result) => {
      if (!err) {
        const {
          image_id,
          image,
          img_name,
          name,
          description,
          position,
        } = result.rows[0];
        const imgName = imageConvertor.imageConvertor(
          image_id,
          image,
          img_name
        );
        let responseData = {
          name: name,
          description: description,
          position: position,
          image: {
            url: `/download/${imgName}`,
          },
        };
        res.status(200).json({ success: true, data: responseData });
        new Logger("Select Single Teams ... !");
      } else {
        new Logger("Error while selecting Single Teams ... !");
      }
    }
  );
});

// @desc        create new team
// @route       POST /api/team
// @access      Private
exports.createTeam = asyncHandler(async (req, res, next) => {
  const { name, position, description, image_id } = req.body;
  await client.query(
    "insert into tbl_team (name, position, description, image_id) values ($1 , $2 , $3 , $4)",
    [name, position, description, image_id],
    (err, result) => {
      if (!err) {
        res.status(200).json({ success: true, data: [] });
        new Logger("Create new Team ... !");
      } else {
        new Logger("Error while creating new Team ... !");
      }
    }
  );
});

// @desc        update a team
// @route       PUT /api/team/:id
// @access      Private
exports.updateTeam = asyncHandler(async (req, res, next) => {
  const { name, position, description, image_id } = req.body;
  await client.query(
    "update tbl_team set name = $1 , position = $2, description = $3, image_id = $4",
    [name, position, description, image_id],
    (err, result) => {
      if (!err) {
        res.status(200).json({ success: true, data: [] });
        new Logger("update a Team ... !");
      } else {
        new Logger("Error while updating a Team ... !");
      }
    }
  );
});

// @desc        delete a team
// @route       DELETE /api/team/:id
// @access      Private
exports.deleteTeam = asyncHandler(async (req, res, next) => {
  await client.query(
    "delete from tbl_team where id = $1",
    [req.params.id],
    (err, result) => {
      if (!err) {
        res.status(200).json({ success: true, data: [] });
        new Logger("delete a Team ... !");
      } else {
        new Logger("Error while deleting a Team ... !");
      }
    }
  );
});
