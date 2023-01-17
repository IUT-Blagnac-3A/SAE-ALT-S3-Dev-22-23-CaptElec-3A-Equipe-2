require("dotenv").config();

const UNDEFINED = "UNDEFINED";
const EMAIL = process.env["EMAIL"] || UNDEFINED;
const EMAIL_PASSWORD = process.env["EMAIL_PASSWORD"] || UNDEFINED;

module.exports = {
  UNDEFINED,
  EMAIL,
  EMAIL_PASSWORD,
};
