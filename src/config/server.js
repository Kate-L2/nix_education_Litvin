// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").config;
// }
const express = require("express");
const app = express();
const userFunc = require("../services/userAuthorization");
const mainPage = process.cwd() + "/frontend/index.html";
const passport = require("passport");
const connectionDB = require("../repository/DBconnection");
// const initializePassport = require("../services/passport-config");
const flash = require("express-flash");
const { session } = require("passport");
// const mainCss = process.cwd() + "/frontend/css/style.css";

const port = 3000;

connectionDB();
// initializePassport(passport);

app.use(express.static("frontend"));

app.set("view engine", "ejs");
app.set("views", process.cwd() + "/src/views");
app.use(express.urlencoded({ extended: true }));
app.use(flash());
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//   })
// );
app.use(passport.session());
app.use(passport.initialize());

app.get("/", (req, res) => {
  res.sendFile(mainPage);
});
app.get("/login", (req, res) => {
  res.render("login.ejs");
});
// app.post("/login", passport.authenticate("local"), {
//   successRedirect: "/",
//   failureRedirect: "/login",
//   failureFlash: true,
// });
app.get("/register", async (req, res) => {
  res.render("register.ejs");
});
app.post("/register", (req, res) => {
  try {
    userFunc.addUser(req, res);
    res.redirect("/login");
  } catch (er) {
    res.redirect("/register");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
