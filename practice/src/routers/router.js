const express = require("express");
const controller = require("../controllers/contactController.js");
let router = express.Router();

router.get("/contacts", controller.listContacts);
router.get("/:id", controller.getById);
router.post("/", controller.listContacts);
router.delete("/:id", controller.listContacts);
router.put("/:id", controller.listContacts);

module.exports = router;
