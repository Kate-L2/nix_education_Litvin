// // const { body } = require("express-validator");
// const { check } = require("express-validator/check");

// const signUpCheck = () => {
//   return [
//     check("userName")
//       .trim()
//       .not()
//       .isEmpty()
//       .withMessage("This filed is required")
//       .isLength({ max: 30 })
//       .withMessage("Please enter a valid name"),
//     check("userEmail")
//       .trim()
//       .not()
//       .isEmpty()
//       .withMessage("This filed is required")
//       .isEmail()
//       .withMessage(
//         "Please enter a valid email like this ====> jdlakmd@gmail.com"
//       ),
//     check("userPass")
//       .trim()
//       .not()
//       .isEmpty()
//       .withMessage("This filed is required")
//       .isLength({ min: 8 })
//       .withMessage("Please enter a valid password"),
//   ];
// };

// const loginCheck = () => {
//   return [
//     check("userEmail")
//       .trim()
//       .not()
//       .isEmpty()
//       .withMessage("This filed is required"),
//     check("userPass")
//       .trim()
//       .not()
//       .isEmpty()
//       .withMessage("This filed is required"),
//   ];
// };

// module.exports = {
//   signUpCheck,
//   loginCheck,
// };
