const asyncHandler = require("../middlewares/async");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Logger = require("../utils/logger");
const client = require("../config/db");

// @desc        register new user
// @route       GET /api/auth/register
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

// @desc        sign in user
// @route       GET /api/auth/login
// @access      Public
exports.signIn = asyncHandler(async (req, res, next) => {
  const { user_name } = req.body;
  const enterdPass = req.body.password;
  client.query(
    "select id , password from tbl_users where user_name = $1",
    [user_name],
    (err, result) => {
      if (!err) {
        const { id, password } = result.rows[0];
        bcryptPass(enterdPass, password).then((result) => {
          if (result) {
            genToken(id).then((token) => {
              res.status(200).json({ success: true, token });
            });
          } else {
            res
              .status(401)
              .json({ success: false, message: "Invalid Credantial ... !" });
          }
        });
      }
    }
  );
});

bcryptPass = async (enterdPass, password) => {
  const result = await bcrypt.compare(enterdPass, password);
  return result;
};

encryptPass = async (password) => {
  const salt = await bcrypt.genSaltSync(10);
  const newPass = await bcrypt.hash(password, salt);
  return newPass;
};

genToken = async (id) => {
  return await jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
