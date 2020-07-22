const asyncHandler = require("../middlewares/async");
const Logger = require("../utils/logger");
const client = require("../config/db");

// @desc        send a new form
// @route       POST /api/qoute
// @access      Public
exports.createNewQouteForm = asyncHandler(async (req, res, next) => {
  const {
    name,
    family,
    phoneNumber,
    method,
    subject,
    message,
    address,
  } = req.body;
  await client.query(
    "insert into tbl_getfreeqoute (first_name  , last_name , phone_number , subject , address , message , method_id)" +
      "values ($1 , $2 ,$3 , $4 , $5, $6 , $7)",
    [name, family, phoneNumber, subject, address, message, method],
    (err, result) => {
      if (!err) {
        res.status(201).json({ success: true, data: [] });
        new Logger("create new free Qoute Form ... !");
      } else {
        new Logger("Error while creating new free Qoute Form ... !");
      }
    }
  );
});
