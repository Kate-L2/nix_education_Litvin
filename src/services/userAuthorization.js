const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_JWT_CODE = "ndskjJJJKS8883mKJnggv";

function addUser(req, res) {
  let name = req.body.userName;
  let email = req.body.userEmail;
  let password = req.body.userPass;
  let newUser = new User({
    name: name,
    email: email,
    password: password,
  });
  newUser
    .save(function (err, user) {
      if (err) {
        return res.status(400).send({
          message: err,
        });
      } else {
        user.hash_password = undefined;
        return res.json(user);
      }
    })
    .then(() => console.log("New user created"));
  // res.status(201).send(newUser);
}

function findByEmail (req, res) {
  let email = req.body.userEmail;
  let pass = req.body.userPass;
  // console.log(email, pass);
  User.findOne({ email: email }, function (err, user) {
    if (err) throw err;
    if (!user || !user.comparePassword(pass)) {
      return res
        .status(401)
        .json({ message: "Authentication failed. Invalid user or password." });
    }
    return res.json({
      token: jwt.sign(
        { name: user.name, email: user.email, _id: user._id },
        SECRET_JWT_CODE
      ),
    });
  });
};

let email = "jdlakmd@gmail.com";
let result = User.findOne({ email: email });
console.log(result.name);

module.exports = {
  addUser,
  findByEmail,
};
