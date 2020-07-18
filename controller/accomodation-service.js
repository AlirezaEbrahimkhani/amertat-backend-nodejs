const asyncHandler = require("../middlewares/async");
const fs = require("fs");
const path = require("path");
const Logger = require("../utils/logger");
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
      new Logger("Select all Accomodations ... !");
    } else {
      new Logger("Error while selecting all Accomodations ... !");
    }
  });
});

// @desc        Get Single accomodation
// @route       GET /api/accomodation
// @access      Public
exports.getAccomodation = asyncHandler(async (req, res, next) => {
  client.query(
    "select * from tbl_accomodationservice where id = $1",
    [req.params.id],
    (err, result) => {
      if (!err) {
        res.status(200).json({ success: true, data: result.rows });
        new Logger("Select Single Accomodation ... !");
      } else {
        new Logger("Error while selecting Single Accomodation ... !");
      }
    }
  );
});

// @desc        Get Avtive accomodation
// @route       GET /api/accomodation/active
// @access      Public
exports.getActiveAccomodation = asyncHandler(async (req, res, next) => {
  client.query(
    "select * from tbl_accomodationservice where active = true",
    (err, result) => {
      if (!err) {
        res.status(200).json({ success: true, data: result.rows });
        new Logger("Select Active Accomodation ... !");
      } else {
        new Logger("Error while selecting Active Accomodation ... !");
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
        new Logger("update accomodations ... !");
        const { explanation, learnmore, otherservice, guides } = req.body;
        client.query(
          "insert into tbl_accomodationservice (explanation,learnmore,otherservice,guides,active) values ($1 , $2 , $3, $4 , $5)",
          [explanation, learnmore, otherservice, guides, true],
          (err, result) => {
            if (!err) {
              res.status(201).json({ success: true, data: {} });
              new Logger("Create Single Accomodation ... !");
            } else {
              new Logger("Error while Create Single Accomodation ... !");
            }
          }
        );
      } else {
        new Logger("Error while update Accomodations ... !");
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
