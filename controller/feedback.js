const asyncHandler = require("../middlewares/async");
const Logger = require("../utils/logger");
const client = require("../config/db");

// @desc        Get all feedbacks
// @route       GET /api/feedbacks
// @access      Public
exports.getFeedbacks = asyncHandler(async (req, res, next) => {
  await client.query("select * from tbl_feedback", (err, result) => {
    if (!err) {
      res
        .status(200)
        .json({ success: true, count: result.rowCount, data: result.rows });
      new Logger("Select all FeedBacks ... !");
    } else {
      new Logger("Error while selecting all FeedBacks ... !");
    }
  });
});
