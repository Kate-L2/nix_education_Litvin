const mongoose = require("mongoose");

function connectionDB() {
  const mongoDB =
    "mongodb+srv://Litvinka:HB2002hb@cluster0.vwex8ht.mongodb.net/?retryWrites=true&w=majority";
  mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
}

module.exports = connectionDB;