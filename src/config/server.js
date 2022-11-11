const express = require("express");
const app = express();
const router = require("../controllers/routers");
const connectionDB = require("../repository/DBconnection");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const expressValidator = require("express-validator");

connectionDB();

const port = 3000;

app.set("view engine", "ejs");
app.set("views", process.cwd() + "/src/views");

app.use(express.static("frontend"));
app.use(express.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(cookieParser());
app.use(session({ secret: "krunal", saveUninitialized: false, resave: false }));

app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
