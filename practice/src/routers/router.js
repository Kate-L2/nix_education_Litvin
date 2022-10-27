const express = require("express");
const controller = require("../controllers/contactController.js");
let router = express.Router();

router.use(express.json());

router.get("/contacts", controller.listContacts);
router.get("/:id", controller.getById);
router.post("/contacts", controller.addContact);
router.delete("/:id", controller.removeContact);
router.patch("/:id", controller.updateContact);

module.exports = router;
