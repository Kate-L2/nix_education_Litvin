const express = require("express");
const router = express.Router();
const { signUpCheck, loginCheck } = require("../services/validation");
const userAuthorization = require("../services/userAuthorization");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");

const mainPage = process.cwd() + "/frontend/index.html";
const login = process.cwd() + "/frontend/login.html";
const register = process.cwd() + "/frontend/register.html";

router.use(express.json());
router.use("/css", express.static(process.cwd() + "/frontend/css"));
router.use("/script", express.static(process.cwd() + "/frontend/script"));
router.use("/img", express.static(process.cwd() + "/frontend/img"));
router.use("/fonts", express.static(process.cwd() + "/frontend/fonts"));

router.use(cookieParser());
router.use(expressValidator());

router.get("/home", userAuthorization.requireAuth, (req, res) => {
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
