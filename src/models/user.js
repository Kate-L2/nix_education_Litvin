const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      maxLength: [30, "Please enter less than 30 symbols"],
      require: true,
      unique: true
    },
    email: { type: String, require: true },
    password: {
      type: String,
      minLength: [8, "Please enter more than 8 symbols"],
      require: true,
    },
  },
  { collection: "users" },
  { collation: { locale: "en_US", strength: 1 } }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
