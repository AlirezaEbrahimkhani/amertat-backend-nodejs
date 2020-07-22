const nodemailer = require("nodemailer");

class Mailer {
  sendMail = async (emailAddress) => {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const option = {
      from: `"Amertat Medical Tourism 👻" ${process.env.EMAIL_ADDRESS}`,
      to: emailAddress,
      subject: "Your From Submited Successfully ... !",
      text: "Thanks For your feedback we will call you soon ... !",
    };

    await transporter.sendMail(option, (err, info) => {
      if (!err) {
        console.log(`Email sent Successfully ... !`.green.underline.bold);
        return true;
      } else {
        console.log(
          `We have problem while sendil Email ... !`.red.underline.bold
        );
        return false;
      }
    });
  };
}

module.exports = Mailer;
