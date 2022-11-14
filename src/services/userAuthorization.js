const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_JWT_CODE = "ndskjJJJKS8883mKJnggv";

const maxAge = 1000 * 60 * 60 * 24;

const createToken = (id) => {
  return jwt.sign({ id }, SECRET_JWT_CODE, {
    expiresIn: maxAge,
  });
};

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
    const user = await User.create({
      name: username,
      email: email,
      password: passwordHashed,
    });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    console.log("User created successfully: ", user);
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
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

    return res.json({ status: "ok", data: token });
  }

  res.json({ status: "error", error: "Invalid email/password" });
};

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, SECRET_JWT_CODE, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};


module.exports = {
  registerUser,
  findByEmail,
  requireAuth,
};
