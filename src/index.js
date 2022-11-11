const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);

app.get("/", (req, res) => {
  res.send(`<h1>Hi</h1>`);
});

app.use(cors());

const messages = [
  { name: "Tim", message: "yo" },
  { name: "Pam", message: "hi" },
];

app.get("/messages", (req, res) => {
  res.contentType("application/json");
  res.send(JSON.stringify(messages));
});

server.listen(process.env.PORT || 3001, function () {
  console.log("Listening on http://localhost:3001");
});
