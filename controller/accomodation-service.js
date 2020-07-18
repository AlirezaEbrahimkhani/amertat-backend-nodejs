const asyncHandler = require("../middlewares/async");
const fs = require("fs");
const path = require("path");
const client = require("../config/db");

// @desc        Get all accomodation
// @route       GET /api/accomodation
// @access      Public
exports.getAccomodations = asyncHandler(async (req, res, next) => {
  client.query("select * from tbl_accomodationservice", (err, result) => {
    if (!err) {
      res
        .status(200)
        .json({ success: true, count: result.rowCount, data: result.rows });
      fs.appendFileSync(
        `${path.dirname(require.main.filename)}/log/database-log.txt`,
        "Select all Accomodations ... !\n"
      );
    } else {
      fs.appendFileSync(
        `${path.dirname(require.main.filename)}/log/database-log.txt`,
        "Error while selecting all Accomodations ... !\n"
      );
    }
  });
});

// @desc        Get active accomodation
// @route       GET /api/accomodation
// @access      Public
exports.getAccomodation = asyncHandler(async (req, res, next) => {
  client.query(
    "select * from tbl_accomodationservice where id = $1",
    [req.params.id],
    (err, result) => {
      if (!err) {
        res.status(200).json({ success: true, data: result.rows });
        fs.appendFileSync(
          `${path.dirname(require.main.filename)}/log/database-log.txt`,
          "Select Single Accomodation ... !\n"
        );
      } else {
        fs.appendFileSync(
          `${path.dirname(require.main.filename)}/log/database-log.txt`,
          "Error while selecting Single Accomodation ... !\n"
        );
      }
    }
  );
});

// @desc        create new accomodation
// @route       POST /api/accomodation
// @access      Private
exports.createAccomodation = asyncHandler(async (req, res, next) => {
  client.query(
    "update tbl_accomodationservice set active = false where active = true",
    (err, result) => {
      if (!err) {
        fs.appendFileSync(
          `${path.dirname(require.main.filename)}/log/database-log.txt`,
          "update accomodations ... !\n"
        );
        const { explanation, learnmore, otherservice, guides } = req.body;
        client.query(
          "insert into tbl_accomodationservice (explanation,learnmore,otherservice,guides,active) values ($1 , $2 , $3, $4 , $5)",
          [explanation, learnmore, otherservice, guides, true],
          (err, result) => {
            if (!err) {
              res.status(201).json({ success: true, data: {} });
              fs.appendFileSync(
                `${path.dirname(require.main.filename)}/log/database-log.txt`,
                "Create Single Accomodation ... !\n"
              );
            } else {
              fs.appendFileSync(
                `${path.dirname(require.main.filename)}/log/database-log.txt`,
                "Error while Create Single Accomodation ... !\n"
              );
            }
          }
        );
      } else {
        fs.appendFileSync(
          `${path.dirname(require.main.filename)}/log/database-log.txt`,
          "Error while update Accomodations ... !\n"
        );
      }
    }
  );
});

// @desc        Update all accomodation
// @route       PUT /api/accomodation
// @access      Private

// @desc        delete accomodation
// @route       Delete /api/accomodation
// @access      Private
