const asyncHandler = require("../middlewares/async");
const Logger = require("../utils/logger");
const client = require("../config/db");

// @desc        Get all liposuction
// @route       GET /api/liposuction
// @access      Public
exports.getLiposuctions = asyncHandler(async (req, res, next) => {
  await client.query("select * from tbl_liposuction", (err, result) => {
    if (!err) {
      res
        .status(200)
        .json({ success: true, count: result.rowCount, data: result.rows });
      new Logger("Select all Liposuction ... !");
    } else {
      new Logger("Error while selecting all Liposuction ... !");
    }
  });
});

// @desc        Get Single liposuction
// @route       GET /api/liposuction/:id
// @access      Public
exports.getLiposuction = asyncHandler(async (req, res, next) => {
  await client.query(
    "select * from tbl_liposuction where id = $1",
    [req.params.id],
    (err, result) => {
      if (!err) {
        res.status(200).json({ success: true, data: result.rows });
        new Logger("Select Single Liposuction ... !");
      } else {
        new Logger("Error while selecting Single Liposuction ... !");
      }
    }
  );
});

// @desc        Get Avtive liposuction
// @route       GET /api/liposuction/active
// @access      Public
exports.getActiveLiposuction = asyncHandler(async (req, res, next) => {
  await client.query(
    "select * from tbl_liposuction where active = true",
    (err, result) => {
      if (!err) {
        res.status(200).json({ success: true, data: result.rows });
        new Logger("Select Active Liposuction ... !");
      } else {
        new Logger("Error while selecting Active Liposuction ... !");
      }
    }
  );
});

// @desc        create new liposuction
// @route       POST /api/liposuction
// @access      Private
exports.createLiposuction = asyncHandler(async (req, res, next) => {
  await client.query(
    "update tbl_liposuction set active = false where active = true",
    (err, result) => {
      if (!err) {
        new Logger("update Liposuctions ... !");
        const { explanation, learnmore } = req.body;
        client.query(
          "insert into tbl_liposuction (learnmore,explanation,active) values ($1 , $2 , $3)",
          [learnmore, explanation, true],
          (err, result) => {
            if (!err) {
              res.status(201).json({ success: true, data: [] });
              new Logger("Create Single Liposuction ... !");
            } else {
              new Logger("Error while Create Single Liposuction ... !");
            }
          }
        );
      } else {
        new Logger("Error while update Liposuctions ... !");
      }
    }
  );
});

// @desc        Update a liposuction
// @route       PUT /api/liposuction/:id
// @access      Private
exports.updateLiposuction = asyncHandler(async (req, res, next) => {
  const { explanation, learnmore, active } = req.body;
  await client.query(
    "update tbl_liposuction set explanation = $1 , learnmore = $2 , active = $3 where id = $4",
    [explanation, learnmore, active, req.params.id],
    (err, result) => {
      if (!err) {
        res.status(200).json({ success: true, data: [] });
        new Logger("Update a Liposuction ... !");
      } else {
        new Logger("Error while updating a Liposuction ... !");
      }
    }
  );
});

// @desc        delete a liposuction
// @route       Delete /api/liposuction/:id
// @access      Private
exports.deleteLiposuction = asyncHandler(async (req, res, next) => {
  await client.query(
    "delete from tbl_liposuction where id = $1",
    [req.params.id],
    (err, result) => {
      if (!err) {
        res.status(200).json({ success: true, data: [] });
        new Logger("Delete a Liposuction ... !");
      } else {
        new Logger("Error while deleting a Liposuction ... !");
      }
    }
  );
});
