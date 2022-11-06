const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const userFunc = require("../services/userAuthorization");
const mainPage = process.cwd() + "/frontend/index.html";
const connectionDB = require("../repository/DBconnection");
// const mainCss = process.cwd() + "/frontend/css/style.css";

const port = 3000;

connectionDB();

app.use(bodyParser.json());
app.use(express.static("frontend"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.set("views", process.cwd() + "/src/views");

app.get("/", (req, res) => {
  res.sendFile(mainPage);
});
app.get("/login", (req, res) => {
  res.render("login.ejs");
});
app.post("/login", (req, res) => {
  userFunc.addUser;
});
app.get("/register", async (req, res) => {
  res.render("register.ejs");
});
app.post("/register", (req, res) => {
  //   res.render("register.ejs");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
