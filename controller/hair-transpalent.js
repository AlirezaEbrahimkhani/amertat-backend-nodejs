const asyncHandler = require("../middlewares/async");
const Logger = require("../utils/logger");
const client = require("../config/db");

// @desc        Get all hair Transplant
// @route       GET /api/hair-transplant
// @access      Public
exports.getHairTransplants = asyncHandler(async (req, res, next) => {
  await client.query("select * from tbl_hairtransplant", (err, result) => {
    if (!err) {
      res
        .status(200)
        .json({ success: true, count: result.rowCount, data: result.rows });
      new Logger("Select all hairTransplant ... !");
    } else {
      new Logger("Error while selecting all hairTransplant ... !");
    }
  });
});

// @desc        Get Single hair Transplant
// @route       GET /api/hair-transplant/:id
// @access      Public
exports.getHairTransplant = asyncHandler(async (req, res, next) => {
  await client.query(
    "select * from tbl_hairtransplant where id = $1",
    [req.params.id],
    (err, result) => {
      if (!err) {
        res.status(200).json({ success: true, data: result.rows });
        new Logger("Select Single hairTransplant ... !");
      } else {
        new Logger("Error while selecting Single hairTransplant ... !");
      }
    }
  );
});

// @desc        Get Avtive hair Transplant
// @route       GET /api/hair-transplant/active
// @access      Public
exports.getActiveHairTransplant = asyncHandler(async (req, res, next) => {
  await client.query(
    "select * from tbl_hairtransplant where active = true",
    (err, result) => {
      if (!err) {
        res.status(200).json({ success: true, data: result.rows });
        new Logger("Select Active hairTransplant ... !");
      } else {
        new Logger("Error while selecting Active hairTransplant ... !");
      }
    }
  );
});

// @desc        create new hair Transplant
// @route       POST /api/hair-transplant
// @access      Private
exports.createHairTransplant = asyncHandler(async (req, res, next) => {
  await client.query(
    "update tbl_hairtransplant set active = false where active = true",
    (err, result) => {
      if (!err) {
        new Logger("update hairTransplants ... !");
        const { explanation, learnmore } = req.body;
        client.query(
          "insert into tbl_hairtransplant (learnmore,explanation,active) values ($1 , $2 , $3)",
          [learnmore, explanation, true],
          (err, result) => {
            if (!err) {
              res.status(201).json({ success: true, data: [] });
              new Logger("Create Single hairTransplant ... !");
            } else {
              new Logger("Error while Create Single hairTransplant ... !");
            }
          }
        );
      } else {
        new Logger("Error while update hairTransplants ... !");
      }
    }
  );
});

// @desc        Update a hair Transplant
// @route       PUT /api/hair-transplant/:id
// @access      Private
exports.updateHairTransplant = asyncHandler(async (req, res, next) => {
  const { explanation, learnmore, active } = req.body;
  await client.query(
    "update tbl_hairtransplant set explanation = $1 , learnmore = $2 , active = $3 where id = $4",
    [explanation, learnmore, active, req.params.id],
    (err, result) => {
      if (!err) {
        res.status(200).json({ success: true, data: [] });
        new Logger("Update a hairTransplant ... !");
      } else {
        new Logger("Error while updating a hairTransplant ... !");
      }
    }
  );
});

// @desc        delete a hair Transplant
// @route       Delete /api/hair-transplant/:id
// @access      Private
exports.deleteHairTransplant = asyncHandler(async (req, res, next) => {
  await client.query(
    "delete from tbl_hairtransplant where id = $1",
    [req.params.id],
    (err, result) => {
      if (!err) {
        res.status(200).json({ success: true, data: [] });
        new Logger("Delete a hairTransplant ... !");
      } else {
        new Logger("Error while deleting a hairTransplant ... !");
      }
    }
  );
});
