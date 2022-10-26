// Set up mongoose connection
// const { connect, connection } = require("mongoose");
const mongoose = require("mongoose");
const username = encodeURIComponent("Litvinka ");
const password = encodeURIComponent("HB2002hb");
const cluster = "cluster0.vwex8ht.mongodb.net";
const Genre = require("../models/genre");

function mongoTest() {
  const mongoDB = `mongodb+srv://Litvinka:HB2002hb@cluster0.vwex8ht.mongodb.net/?retryWrites=true&w=majority`;
  mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  // console.log(db);
}

// Create an instance of model SomeModel
const genre = new Genre({ name: "Kate" });

// Save the new model instance, passing a callback
genre.save((err, data) => {
  console.log("New obj", data);
});

// find all athletes who play tennis, selecting the 'name' and 'age' fields
// Genre.find().exec((err, data) => {
//   console.log("find", data);
// });
// Genre.findOne({ name: "name" }).exec((err, data) => {
//   console.log("findOne", data);
// });
Genre.findById("63592aabcf1106ebe42332a0").exec((err, data) => {
  console.log("findOne", data);
});
Genre.count((err, data) => {
  console.log("Count:", data);
});

mongoTest();

module.exports = mongoTest;
