const asyncHandler = require("../middlewares/async");
const client = require("../config/db");

// @desc        Get all accomodation
// @route       GET /api/accomodation
// @access      Public
exports.getAccomodations = asyncHandler(async (req, res, next) => {
  client.query("select * from tbl_accomodationservice", (err, result) => {
    res
      .status(201)
      .json({ success: true, count: result.rowCount, data: result.rows });
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
      res.status(201).json({ success: true, data: result.rows });
    }
  );
});

// @desc        create new accomodation
// @route       POST /api/accomodation
// @access      Private

// @desc        Update all accomodation
// @route       PUT /api/accomodation
// @access      Private

// @desc        delete accomodation
// @route       Delete /api/accomodation
// @access      Private
