const asyncHandler = require("../middlewares/async");
const bcrypt = require("bcryptjs");
const Logger = require("../utils/logger");
const client = require("../config/db");

// @desc        register new user
// @route       GET /api/register
// @access      Private
exports.register = asyncHandler(async (req, res, next) => {
  const { first_name, last_name, user_name, password } = req.body;
  const hashPass = await encryptPass(password);
  await client.query(
    "insert into tbl_users (first_name , last_name , user_name , password , role_id) values ($1 , $2 , $3 , $4 , $5)",
    [first_name, last_name, user_name, hashPass, 2],
    (err, result) => {
      if (!err) {
        res.status(201).json({ success: true, data: [] });
        new Logger("User registerd successfully ... !");
      } else {
        new Logger("Error while registering user ... !");
      }
    }
  );
});

encryptPass = async (password) => {
  const salt = await bcrypt.genSaltSync(10);
  const newPass = await bcrypt.hash(password, salt);
  return newPass;
};
