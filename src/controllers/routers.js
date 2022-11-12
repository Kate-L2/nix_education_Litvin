const express = require("express");
const { validationResult } = require("express-validator/check");
const router = express.Router();
const { findByName, addUser } = require("../services/userAuthorization");
const mainPage = process.cwd() + "/frontend/index.html";
const { signUpCheck, loginCheck } = require("../services/validation");

router.use(express.json());

router.get("/", (req, res) => {
  res.sendFile(mainPage);
});
router.get("/login", (req, res) => {
  res.render("login.ejs");
});
router.post("/login", loginCheck(), (req, res) => {
  let errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      findByName(req, res);
      res.redirect("/");
    } catch (er) {
      console.log(er);
    }
  } else {
    console.log(errors.array());
    return res.json({ errors: errors.array() });
  }
});
router.get("/register", (req, res) => {
  res.render("register.ejs");
});
router.post("/register", signUpCheck(), (req, res) => {
  let errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      addUser(req, res);
      res.redirect("/login");
    } catch (er) {
      res.redirect("/register");
    }
  } else {
    console.log(errors.array());
    return res.json({ errors: errors.array() });
  }
});

module.exports = router;
