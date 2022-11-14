const express = require("express");
const app = express();
const router = require("../controllers/routers");
const connectionDB = require("../repository/DBconnection");

connectionDB();

const port = 3000;

app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
