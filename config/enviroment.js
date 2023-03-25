const fs = require("fs");
const rfs = require("rotating-file-stream");
const path = require("path");

const logDirectory = path.join(__dirname, "../production_logs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream("access.log", {
  interval: "1d",
  path: logDirectory,
});

const development = {
  name: "development",
  assets_path: "./assets",
  session_cookie_key: "blahsomething",
  db: "coderial_development",
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    post: 587,
    secure: false,
    auth: {
      // TODO: create email for authenticating the mails
      // ! google doesnt allow using personal emails
      user: "",
      pass: "developmentFor@3896",
    },
  },
  google_client_ID: "******",
  google_client_Secret: "*****",
  mailer_callback_URL: "http://localhost:8000/users/auth/google/callback",
  jwt_secret: "coderial",
  morgan: {
    mode: "dev",
    options: { stream: accessLogStream },
  },
};

const production = {
  name: "production",
  morgan: {
    mode: "combined",
    options: { stream: accessLogStream },
  },
};

module.exports = development;
