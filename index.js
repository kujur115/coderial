const express = require("express");
const env = require("./config/enviroment");
const logger= require('morgan');
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;
const expressLayout = require("express-ejs-layouts");
const db = require("./config/mongoose");
// used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportJWT = require("./config/passport-jwt-strategy");
const passportGoogle = require("./config/passport-google-oauth2-strategy");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const sassMiddleware = require("node-sass-middleware");
const flash = require("connect-flash");
const customMware = require("./config/middleware");

// ? setup the chat server to be used with socket.io
const chatServer = require("http").Server(app);
const chatSockets = require("./config/chat_sockets").chatSockets(chatServer);
chatServer.listen(5000);
console.log("chat server is listening on port 5000");

const path = require("path");
if (env.name == "development") {
  app.use(
    sassMiddleware({
      src: path.join(__dirname, env.assets_path, "/scss"),
      dest: path.join(__dirname, env.assets_path, "/css"),
      debug: "true",
      outputStyle: "extended",
      prefix: "/css",
    })
  );
}
app.use(express.static(env.assets_path));

// ? make the uploads path available to the browser
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(expressLayout);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger(env.morgan.mode,env.morgan.options))
// extract style and script from sub pages into layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// setup the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(
  session({
    name: "coderial",
    // TODO change the secret before deployment in production mode
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: new MongoStore(
      {
        mongoUrl: "mongodb://0.0.0.0:27017/coderial_development",
        // mongooseConnection:db,
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);

// use express router
app.use("/", require("./routes"));

app.listen(port, (err) => {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }
  console.log(`Server is running on port: ${port}`);
});
