const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_JWT_CODE = "ndskjJJJKS8883mKJnggv";

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  // console.log(username);
  if (username == "" && email == "" && password == "") {
    return res.status(400).send({ status: "Please fill out all strings" });
  }
  if (!username || typeof username !== "string") {
    return res.json({ status: "error", error: "Invalid username" });
  }

  if (password.length < 8) {
    return res.json({
      status: "error",
      error: "Password too small. Should be atleast 8 characters",
    });
  }

  const passwordHashed = await bcrypt.hash(password, 10);

  try {
    const response = await User.create({
      name: username,
      email: email,
      password: passwordHashed,
    });
    console.log("User created successfully: ", response);
  } catch (error) {
    return res.json({ status: "error" });
  }
  res.json({ status: "ok" });
};

const findByEmail = async (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password);
  const user = await User.findOne({ email }).lean();
  // console.log(user.password);
  if (!user) {
    return res.json({ status: "error", error: "Invalid email/password" });
  }

  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
      },
      SECRET_JWT_CODE
    );

    return res.json({ status: "ok", data: token });
  }

  res.json({ status: "error", error: "Invalid email/password" });
};

module.exports = {
  registerUser,
  findByEmail,
};
