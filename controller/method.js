const asyncHandler = require("../middlewares/async");
const Logger = require("../utils/logger");
const client = require("../config/db");

// @desc        Get all Methods
// @route       GET /api/methods
// @access      Public
exports.getMethods = asyncHandler(async (req, res, next) => {
  await client.query("select * from tbl_method", (err, result) => {
    if (!err) {
      res
        .status(200)
        .json({ success: true, count: result.rowCount, data: result.rows });
      new Logger("Select all Methods ... !");
    } else {
      new Logger("Error while selecting all Methods ... !");
    }
  });
});
