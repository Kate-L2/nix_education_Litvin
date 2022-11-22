const User = require("../models/user");
const Product = require("../models/product");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_JWT_CODE = "ndskjJJJKS8883mKJnggv";
const products = require("../config/products");

const maxAge = 1000 * 60 * 60 * 24;

const createToken = (id) => {
  return jwt.sign({ id }, SECRET_JWT_CODE, {
    expiresIn: maxAge,
  });
};

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  const oldUser = await User.findOne({ email }).lean();
  if (!(username && email && password)) {
    return res.json({
      status: "error",
      error: "All input is required",
    });
  } else if (!username || typeof username !== "string") {
    return res.json({ status: "error", error: "Invalid username" });
  } else if (password.length < 8) {
    return res.json({
      status: "error",
      error: "Password too small. Should be atleast 8 characters",
    });
  } else if (oldUser) {
    return res.json({
      status: "error",
      error: "User Already Exist. Please Login",
    });
  } else {
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
  }
};

const findByEmail = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).lean();

  if (!(email && password)) {
    return res.json({
      status: "error",
      error: "All input is required",
    });
  } else if (!user) {
    return res.json({ status: "error", error: "Invalid email/password" });
  } else if (await bcrypt.compare(password, user.password)) {
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
const sendProductsToDB = (req, res) => {
  Product.insertMany(products)
    .then(function () {
      console.log("data inserted");
      res.json({ success: "success" });
    })
    .catch(function (err) {
      console.log(err);
    });
};
const getProducts = (req, res) => {
  Product.find({})
    .lean()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  registerUser,
  findByEmail,
  requireAuth,
  getProducts,
  sendProductsToDB,
};
