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
  newUser.save().then(() => console.log("New user created"));
  // res.status(201).send(newUser);
}

function findByName(req, res) {
  let name = req.body.userName;
  let pass = req.body.userPass;

  const foundUser = User.findOne({ name: name });
  if (
    foundUser &&
    bcrypt.compare(pass, foundUser.password, function (err, res) {
      if (err) {
        console.log("Comparison error: ", err);
      }
      return res.json({
        token: jwt.sign(
          {
            name: foundUser.name,
            email: foundUser.email,
            password: foundUser.password,
            _id: foundUser._id,
          },
          SECRET_JWT_CODE,
          {
            expiresIn: "2h",
          }
        ),
      });
    })
  )
    res.status(400).send("Authentication failed. Invalid name or password.");
}

module.exports = {
  addUser,
  findByName,
};
