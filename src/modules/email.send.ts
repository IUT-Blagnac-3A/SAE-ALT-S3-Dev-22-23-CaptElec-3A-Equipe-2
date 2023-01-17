const nodemailer = require("nodemailer");
const xoauth2 = require("xoauth2");
// const generator = xoauth2.createXOAuth2Generator({
//     user: ENV.EMAIL,
//     clientId: "your-client-id",
//     clientSecret: "your-client-secret",
//     refreshToken: "your-refresh-token",
// });

const ENV = require("../env");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: ENV.EMAIL,
    pass: ENV.EMAIL_PASSWORD,
  },
});

const sendEmail = function (to: string, html: string) {
  console.log(ENV.EMAIL, ENV.EMAIL_PASSWORD);

  const mailOptions = {
    from: ENV.EMAIL,
    to: "ericphlpp@gmail.com",
    subject: "Hello",
    text: "Hello World!",
  };

  transporter.sendMail(mailOptions, (error: Error, info: any) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
};

sendEmail("", "");
