const express = require("express");
const router = express.Router();
const { signUpCheck, loginCheck } = require("../services/validation");
const userAuthorization = require("../services/userAuthorization");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const csvtojson = require("csvtojson");
const Product = require("../models/product");

const mainPage = process.cwd() + "/frontend/index.html";
const login = process.cwd() + "/frontend/login.html";
const register = process.cwd() + "/frontend/register.html";
const itemFilePath = process.cwd() + "/src/device.csv";

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
router.post("/add", async (req, res) => {
  console.log("test");
  csvtojson()
    .fromFile(itemFilePath)
    .then((csvData) => {
      console.log(csvData);
      Product.insertMany(csvData)
        .then(function () {
          console.log("data inserted");
          res.json({ success: "success" });
        })
        .catch(function (err) {
          console.log(err);
        });
    });
});

module.exports = router;
