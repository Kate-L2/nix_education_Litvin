const User = require("../models/user");
const bcrypt = require("bcrypt");

function addUser(req, res) {
  let name = req.body.userName;
  let email = req.body.userEmail;
  let pass = req.body.userPass;
  if (!name) {
    res.status(400).send({
      message: "Missing required name",
    });
  } else if (!email) {
    res.status(400).send({
      message: "Missing required email",
    });
  } else if (!pass) {
    res.status(400).send({
      message: "Missing required pass",
    });
  } else if (pass.length < 8) {
    res.status(400).send({
      message: "Password is too short",
    });
  } else {
    let newUser = new User({
      name: name,
      email: email,
      password: pass,
    });
    newUser.save().then(() => console.log("New user created"));
    // res.status(201).send(newUser);
  }
}

function findByName(req, res) {
  let name = req.body.userName;
  let pass = req.body.userPass;
  User.findOne({ name: name }).then((user) => {
    res.status(200).json(user);
    bcrypt.compare(pass, user.password, function (err, isValid) {
      if (isValid) {
        request.server.log("info", "user authentication successful");
        const token = user.generateAuthToken();
        res.send(token);
        res.redirect("/");
      } else if (err) {
        res.status(404).json({ error: "Could not find a user" });
      }
    });
  });
}

module.exports = {
  addUser,
  findByName,
};
