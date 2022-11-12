const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      maxLength: [30, "Please enter less than 30 symbols"],
      require: true,
    },
    email: { type: String, require: true },
    password: {
      type: String,
      minLength: [8, "Please enter more than 8 symbols"],
      require: true,
    },
  },
  { collation: "users" }
);

UserSchema.pre("save", function (next) {
  const user = this;

  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError);
      } else {
        bcrypt.hash(user.password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError);
          }

          user.password = hash;
          next();
        });
      }
    });
  } else {
    return next();
  }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
