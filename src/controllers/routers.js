const express = require("express");
const router = express.Router();
const { signUpCheck, loginCheck } = require("../services/validation");
const { isLogged } = require("../services/checkUser");
const userAuthorization = require("../services/userAuthorization");

const mainPage = process.cwd() + "/frontend/index.html";
const login = process.cwd() + "/frontend/login.html";
const register = process.cwd() + "/frontend/register.html";

router.use(express.json());
router.use(express.static("frontend"));

router.get("/home", isLogged, (req, res) => {
  res.sendFile(mainPage);
});
router.get("/login", (req, res) => {
  res.sendFile(login);
});
router.get("/register", (req, res) => {
  res.sendFile(register);
});
router.post("/login", userAuthorization.findByEmail);
router.post("/register", userAuthorization.registerUser);

module.exports = router;
