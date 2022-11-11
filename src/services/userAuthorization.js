const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_JWT_CODE = "ndskjJJJKS8883mKJnggv";

function addUser(req, res) {
  let name = req.body.userName;
  let email = req.body.userEmail;
  let pass = req.body.userPass;
  if (!name || !email || !pass) {
    res.status(400).send({
      message: "Please fill out all fileds",
    });
  } else if (pass.length < 8) {
    res.status(400).send({
      message: "Password has to be more than 8 symbols",
    });
  } else {
    let newUser = new User({
      name: name,
      email: email,
      password: pass,
    });
    newUser.save().then(() => console.log("New user created"));
    res.status(201).send(newUser);
  }
}

function findByName(req, res) {
  let name = req.body.userName;
  let pass = req.body.userPass;

  User.findOne({ name: name }).then((user) => {
    if (!user || !user.comparePassword(pass)) {
      return res
        .status(401)
        .then((er) => console.log("Authentication failed. Invalid name or password."));
        // .json({ message: "Authentication failed. Invalid name or password." });
    }
    return res.status(201).json({
      token: jwt.sign(
        {
          name: user.name,
          email: user.email,
          password: user.password,
          _id: user._id,
        },
        SECRET_JWT_CODE
      ),
    });
  });
}

module.exports = {
  addUser,
  findByName,
};
