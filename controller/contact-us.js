const asyncHandler = require("../middlewares/async");
const Logger = require("../utils/logger");
const Mailer = require("../middlewares/mailer");
const client = require("../config/db");

const mailer = new Mailer();
// @desc        send a new form
// @route       POST /api/contact-us
// @access      Public
exports.createNewForm = asyncHandler(async (req, res, next) => {
  const {
    name,
    family,
    phoneNumber,
    feedBack,
    subject,
    email,
    address,
  } = req.body;
  await client.query(
    "insert into tbl_contactus (first_name  , last_name , phone_number , subject  , email , address , feedback_id)" +
      "values ($1 , $2 ,$3 , $4 , $5, $6 , (select id from tbl_feedback where feedback_value = $7))",
    [name, family, phoneNumber, subject, email, address, feedBack],
    (err, result) => {
      if (!err) {
        const mailerResult = mailer.sendMail(email);
        if (mailerResult) {
          res.status(201).json({ success: true, data: [] });
          new Logger("create new contact us Form ... !");
        } else {
          new Logger("We have problem while sendil Email ... !");
          res.status(500).json({ success: false, data: [] });
        }
      } else {
        new Logger("Error while creating new contact us Form ... !");
      }
    }
  );
});
