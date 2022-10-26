// Set up mongoose connection
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactsSchema = new Schema({
  id: {
    type: Number,
    required: [true, "Contact must have id"],
    trim: true,
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Contact must have name"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Contact must have email"],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, "Contact is required"],
    trim: true,
  },
});

const Contacts = mongoose.model("Contacts", ContactsSchema);

module.exports = Contacts;
