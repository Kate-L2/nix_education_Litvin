const express = require("express");
const router = express.Router();
const userFunc = require("../services/userAuthorization");
const mainPage = process.cwd() + "/frontend/index.html";

router.use(express.json());


router.get("/", (req, res) => {
  res.sendFile(mainPage);
});
router.get("/login", (req, res) => {
  res.render("login.ejs");
});
router.post("/login", (req, res) => {
  try {
    userFunc.findByName(req, res);
    res.redirect("/register");
  } catch (er) {
    console.log(er);
  }
});
router.get("/register", (req, res) => {
  res.render("register.ejs");
});
router.post("/register", (req, res) => {
  try {
    userFunc.addUser(req, res);
    res.redirect("/login");
  } catch (er) {
    res.redirect("/register");
  }
});

module.exports = router;
