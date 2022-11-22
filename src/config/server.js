const express = require("express");
const app = express();
const router = require("../controllers/routers");
const connectionDB = require("./DBconnection");

connectionDB();

var port = process.env.PORT || 8080;

app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
