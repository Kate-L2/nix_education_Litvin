const User = require("../models/user");

const addUser = function (req, res) {
  let name = req.body.name;
  let email = req.body.email;
  let phone = req.body.phone;
  if (!name) {
    res.status(400).send({
      message: "Missing required name",
    });
  } else if (!email) {
    res.status(400).send({
      message: "Missing required email",
    });
  } else if (!phone) {
    res.status(400).send({
      message: "Missing required phone",
    });
  } else {
    let newUser = new User({
      name: name,
      email: email,
      phone: phone,
    });
    newUser.save().then(() => console.log("New user created"));
    res.status(201).send(newUser);
  }
};

module.exports = {
  addUser,
};
