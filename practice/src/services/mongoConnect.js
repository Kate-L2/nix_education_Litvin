import fs from "fs";
// Set up mongoose connection
const mongoose = require("mongoose");
const mongoDB =
  "mongodb+srv://Litvinka:HB2002hb@cluster0.vwex8ht.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const result = await contacts.insertOne(doc);
console.log(`A document was inserted with the _id: ${result.insertedId}`);

const data = JSON.parse(fs.readFileSync("./contacts.json", "utf-8"));

// const importContacts = async () => {
//   try {
//     await Freelancers.create(data);
//     console.log("data successfully imported");
//     // to exit the process
//     process.exit();
//   } catch (error) {
//     console.log("error", error);
//   }
// };

// console.log(data);
