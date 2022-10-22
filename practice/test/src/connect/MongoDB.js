const mongoose = require("mongoose");
const username = encodeURIComponent("Kyrylo");
const password = encodeURIComponent("Ed2XzDCJZ5HzW2R0ELVm");
const cluster = "cluster0.aut047l.mongodb.net";
let mongoDB = `mongodb+srv://${username}:${password}@${cluster}/?retryWrites=true&w=majority`;
// Import the mongoose module

// Set up default mongoose connection
// const mongoDB = "mongodb://127.0.0.1/my_database";

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const SomeModelSchema = new Schema({
  a_string: String,
  a_date: Date,
});