const asyncHandler = require("../middlewares/async");
const Logger = require("../utils/logger");
const client = require("../config/db");

// @desc        Get all Home
// @route       GET /api/home
// @access      Public
exports.getHomes = asyncHandler(async (req, res, next) => {
  await client.query("select * from tbl_home", (err, result) => {
    if (!err) {
      res
        .status(200)
        .json({ success: true, count: result.rowCount, data: result.rows });
      new Logger("Select all Home ... !");
    } else {
      new Logger("Error while selecting all Home ... !");
    }
  });
});

// @desc        Get Single Home
// @route       GET /api/home/:id
// @access      Public
exports.getHome = asyncHandler(async (req, res, next) => {
  await client.query(
    "select * from tbl_home where id = $1",
    [req.params.id],
    (err, result) => {
      if (!err) {
        res.status(200).json({ success: true, data: result.rows });
        new Logger("Select Single Home ... !");
      } else {
        new Logger("Error while selecting Single Home ... !");
      }
    }
  );
});

// @desc        Get Avtive Home
// @route       GET /api/home/active
// @access      Public
exports.getActiveHome = asyncHandler(async (req, res, next) => {
  await client.query(
    "select * from tbl_home where active = true",
    (err, result) => {
      if (!err) {
        res.status(200).json({ success: true, data: result.rows });
        new Logger("Select Active Home ... !");
      } else {
        new Logger("Error while selecting Active Home ... !");
      }
    }
  );
});

// @desc        create new Home
// @route       POST /api/home
// @access      Private
exports.createHome = asyncHandler(async (req, res, next) => {
  await client.query(
    "update tbl_home set active = false where active = true",
    (err, result) => {
      if (!err) {
        new Logger("update Homes ... !");
        const { introduction, about, whyiran, whyamertat } = req.body;
        client.query(
          "insert into tbl_home (introduction, about, whyiran, whyamertat, active) values ($1 , $2 , $3 , $4 ,$5)",
          [introduction, about, whyiran, whyamertat, true],
          (err, result) => {
            if (!err) {
              res.status(201).json({ success: true, data: [] });
              new Logger("Create Single Home ... !");
            } else {
              new Logger("Error while Create Single Home ... !");
            }
          }
        );
      } else {
        new Logger("Error while update Homes ... !");
      }
    }
  );
});

// @desc        Update a Home
// @route       PUT /api/home/:id
// @access      Private
exports.updateHome = asyncHandler(async (req, res, next) => {
  const { introduction, about, whyiran, whyamertat, active } = req.body;
  await client.query(
    "update tbl_home set introduction = $1 ,about = $2 , whyiran = $3 , whyamertat = $4, active = $5 where id = $6",
    [introduction, about, whyiran, whyamertat, active, req.params.id],
    (err, result) => {
      if (!err) {
        res.status(200).json({ success: true, data: [] });
        new Logger("Update a Home ... !");
      } else {
        new Logger("Error while updating a Home ... !");
      }
    }
  );
});

// @desc        delete a Home
// @route       Delete /api/home/:id
// @access      Private
exports.deleteHome = asyncHandler(async (req, res, next) => {
  await client.query(
    "delete from tbl_home where id = $1",
    [req.params.id],
    (err, result) => {
      if (!err) {
        res.status(200).json({ success: true, data: [] });
        new Logger("Delete a Home ... !");
      } else {
        new Logger("Error while deleting a Home ... !");
      }
    }
  );
});
