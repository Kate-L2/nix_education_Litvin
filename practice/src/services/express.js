const express = require("express");
const app = express();
const connectionDB = require("../services/connection.js");
const router = require("../routers/router.js");

connectionDB();

app.use("/", router);

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
