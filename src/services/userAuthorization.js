const User = require("../models/user");
const bcrypt = require("bcrypt");

function addUser (req, res) {
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
  } else {
    let newUser = new User({
      name: name,
      email: email,
      password: pass,
    });
    newUser.save().then(() => console.log("New user created"));
    // res.status(201).send(newUser);
  }
};

// function findByName () {
//   let name = req.body.userName;
//   User.findOne({ name: name})
//     .then((result) => {
//       res.status(200).json(result);
//     })
//     .catch((err) => {
//       res.status(404).json({ error: "Could not find a user with this name" });
//     });
// };

module.exports = {
  addUser,
  // findByName
};
