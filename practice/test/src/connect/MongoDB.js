const mongoose = require("mongoose");

// Set up default mongoose connection
const { MongoClient } = require("mongodb");
const username = encodeURIComponent("Litvinka ");
const password = encodeURIComponent("HB2002hb");
const cluster = "cluster0.vwex8ht.mongodb.net";
​
let uri =
    `mongodb+srv://Litvinka:<password>@cluster0.vwex8ht.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);
async function testMongoConnection() {
    try {
        await client.connect();
        const database = client.db("LessonNodeDB");
        const ratings = database.collection("Collection0");
        const cursor = ratings.find();
        console.log(ratings)
        await cursor.forEach(doc => console.log(doc));
​
    } finally {
        await client.close();
    }
}
module.exports = testMongoConnection;