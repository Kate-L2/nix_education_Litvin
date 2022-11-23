const express = require("express");
const app = express();
const router = require("../controllers/routers");
const connectionDB = require("./DBconnection");

connectionDB();

var port = process.env.PORT || 8080;

app.use("/", router);
app.get("*", function (req, res) {
  res.redirect("https://mac-outlet-store.herokuapp.com/login");

  // Or, if you don't want to automatically detect the domain name from the request header, you can hard code it:
  // res.redirect('https://example.com' + req.url);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
