// const userFunc = require("../services/userAuthorization");
// const passport = require("passport");
// const bcrypt = require("bcrypt");
// const User = require("../models/user");
// const localStrategy = require("passport-local").Strategy;

// function initializePassport(passport) {
//   const authenticateUser = async (name, password, done) => {
//     const user = await User.findOne({ name: name });
//     if (user == null) {
//       return done(null, false, { message: "No user with this name" });
//     }
//     try {
//       if (bcrypt.compare(password, user.userPass)) {
//         return done(null, user);
//       } else {
//         return done(null, false, { message: "Incorect password" });
//       }
//     } catch (e) {
//       return done(e);
//     }
//   };
//   passport.use(
//     new localStrategy({ usernameField: "userName" }),
//     authenticateUser
//   );
//   passport.serializeUser((user, done) => {});
//   passport.deserializeUser((id, done) => {});
// }

// module.exports = initializePassport;
