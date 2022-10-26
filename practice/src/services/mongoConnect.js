const mongoose = require("mongoose");
const fs = require("fs");
const Contacts = require("../models/contacts.js");
const jsonFilePath = process.cwd() + "/src/resource/contacts.json";

const mongoDB =
  "mongodb+srv://Litvinka:HB2002hb@cluster0.vwex8ht.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const data = JSON.parse(fs.readFileSync(jsonFilePath, "utf-8"));

const importContacts = async () => {
  try {
    await Contacts.create(data);
    console.log("data successfully imported");
    // to exit the process
    process.exit();
  } catch (error) {
    console.log("error", error);
  }
};

importContacts();
console.log(data);
