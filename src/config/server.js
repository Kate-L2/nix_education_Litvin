const express = require("express");
const app = express();
const router = require("../controllers/routers");
const connectionDB = require("../repository/DBconnection");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const expressValidator = require("express-validator");
const SECRET_JWT_CODE = "ndskjJJJKS8883mKJnggv";

connectionDB();

const port = 3000;

app.set("view engine", "ejs");
app.set("views", process.cwd() + "/src/views");

app.use("/frontend", express.static("frontend"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: "krunal", saveUninitialized: false, resave: false }));
app.use(expressValidator());

// app.use(function (req, res, next) {
//   if (
//     req.headers &&
//     req.headers.authorization &&
//     req.headers.authorization.split(" ")[0] === "JWT"
//   ) {
//     jsonwebtoken.verify(
//       req.headers.authorization.split(" ")[1],
//       SECRET_JWT_CODE,
//       function (err, decode) {
//         if (err) req.user = undefined;
//         req.user = decode;
//         next();
//       }
//     );
//   } else {
//     req.user = undefined;
//     next();
//   }
// });

app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
