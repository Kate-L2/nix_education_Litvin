var express = require("express");
var router = require("../routers/routers.js");
var app = express();
// ...
app.use("/contacts", router);

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
