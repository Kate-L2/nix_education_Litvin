let express = require("express");
let router = express.Router();
let {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
} = require("../controller/controller.js");
router.use(express.json());
// router.use(express.urlencoded({ extended: false }));

router.get("/", function (req, res) {
  res.status(200).send(listContacts());
});
router.get("/:id", function (req, res) {
  let id = req.params.id;
  let contact = getById(id);
  if (contact) {
    res.status(200).send(contact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});
router.post("/", function (req, res) {
  let name = req.body.name;
  let email = req.body.email;
  let phone = req.body.phone;
  if (!name) {
    res.status(400).send({
      message: "Missing required name",
    });
  } else if (!email) {
    res.status(400).send({
      message: "Missing required email",
    });
  } else if (!phone) {
    res.status(400).send({
      message: "Missing required phone",
    });
  } else {
    let newContact = {
      id: Math.floor(Math.random() * 100),
      name: name,
      email: email,
      phone: phone,
    };
    addContact(newContact);
    res.status(201);
  }
});

router.delete("/:id", function (req, res) {
  let id = req.params.id;
  let contact = removeContact(id);
  if (contact) {
    res.status(200).json({ message: "Contact deleted" });
  } else {
    res.status(404).json({ message: "Contact not found" });
  }
});

router.put("/:id", function (req, res) {
  let id = req.params.id;
  let body = req.body;
  if (!body) {
    res.status(400).json({ message: "Missing fields" });
  } else {
    if (updateContact(id, body)) {
      res.status(200);
    } else {
      res.status(400).json({ message: "Contact not found" });
    }
  }
});

module.exports = router;
