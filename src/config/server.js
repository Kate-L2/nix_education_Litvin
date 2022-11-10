const express = require("express");
const app = express();
const router = require("../routers/routers");
const connectionDB = require("../repository/DBconnection");

connectionDB();

const port = 3000;

app.set("view engine", "ejs");
app.set("views", process.cwd() + "/src/views");

router.use(express.static("frontend"));
router.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
