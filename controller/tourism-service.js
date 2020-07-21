const asyncHandler = require("../middlewares/async");
const Logger = require("../utils/logger");
const client = require("../config/db");

// @desc        Get all Tourism Service
// @route       GET /api/tourism-service
// @access      Public
exports.getTourismServices = asyncHandler(async (req, res, next) => {
  await client.query("select * from tbl_tourismservie", (err, result) => {
    if (!err) {
      res
        .status(200)
        .json({ success: true, count: result.rowCount, data: result.rows });
      new Logger("Select all Tourism Service ... !");
    } else {
      new Logger("Error while selecting all Tourism Service ... !");
    }
  });
});

// @desc        Get Single Tourism Service
// @route       GET /api/tourism-service/:id
// @access      Public
exports.getTourismService = asyncHandler(async (req, res, next) => {
  await client.query(
    "select * from tbl_tourismservie where id = $1",
    [req.params.id],
    (err, result) => {
      if (!err) {
        res.status(200).json({ success: true, data: result.rows });
        new Logger("Select Single Tourism Service ... !");
      } else {
        new Logger("Error while selecting Single Tourism Service ... !");
      }
    }
  );
});

// @desc        Get Avtive Tourism Service
// @route       GET /api/tourism-service/active
// @access      Public
exports.getActiveTourismService = asyncHandler(async (req, res, next) => {
  await client.query(
    "select * from tbl_tourismservie where active = true",
    (err, result) => {
      if (!err) {
        res.status(200).json({ success: true, data: result.rows });
        new Logger("Select Active Tourism Service ... !");
      } else {
        new Logger("Error while selecting Active Tourism Service ... !");
      }
    }
  );
});

// @desc        create new Tourism Service
// @route       POST /api/tourism-service
// @access      Private
exports.createTourismService = asyncHandler(async (req, res, next) => {
  await client.query(
    "update tbl_tourismservie set active = false where active = true",
    (err, result) => {
      if (!err) {
        new Logger("update Tourism Services ... !");
        const { explanation } = req.body;
        client.query(
          "insert into tbl_tourismservie (explanation,active) values ($1 , $2)",
          [explanation, true],
          (err, result) => {
            if (!err) {
              res.status(201).json({ success: true, data: [] });
              new Logger("Create Single Tourism Service ... !");
            } else {
              new Logger("Error while Create Single Tourism Service ... !");
            }
          }
        );
      } else {
        new Logger("Error while update Tourism Services ... !");
      }
    }
  );
});

// @desc        Update a Tourism Service
// @route       PUT /api/tourism-service/:id
// @access      Private
exports.updateTourismService = asyncHandler(async (req, res, next) => {
  const { explanation, active } = req.body;
  await client.query(
    "update tbl_tourismservie set explanation = $1 , active = $2 where id = $3",
    [explanation, active, req.params.id],
    (err, result) => {
      if (!err) {
        res.status(200).json({ success: true, data: [] });
        new Logger("Update a Tourism Service ... !");
      } else {
        new Logger("Error while updating a Tourism Service ... !");
      }
    }
  );
});

// @desc        delete a Tourism Service
// @route       Delete /api/tourism-service/:id
// @access      Private
exports.deleteTourismService = asyncHandler(async (req, res, next) => {
  await client.query(
    "delete from tbl_tourismservie where id = $1",
    [req.params.id],
    (err, result) => {
      if (!err) {
        res.status(200).json({ success: true, data: [] });
        new Logger("Delete a Tourism Service ... !");
      } else {
        new Logger("Error while deleting a Tourism Service ... !");
      }
    }
  );
});
