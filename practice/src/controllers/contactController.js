// const express = require("express");
const Contacts = require("../models/contacts.js");

const listContacts = function (req, res) {
  let contacts = Contacts.find({}, function (err, contacts) {
    if (err) {
      console.log(err);
    } else {
      res.status(200);
      res.json(contacts);
    }
  });
  return contacts;
};

const getById = function (req, res) {
  let id = req.params.id;
  let foundContact = Contacts.findOne({ id: id }, function (err, contact) {
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  });
  return foundContact;
};

const addContact = function (req, res) {
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
    
    res.status(201);
  }
};

// router.delete("/:id", function (req, res) {
//   let id = req.params.id;
//   let contact = removeContact(id);
//   if (contact) {
//     res.status(200).json({ message: "Contact deleted" });
//   } else {
//     res.status(404).json({ message: "Contact not found" });
//   }
// });

// router.put("/:id", function (req, res) {
//   let id = req.params.id;
//   let body = req.body;
//   if (!body) {
//     res.status(400).json({ message: "Missing fields" });
//   } else {
//     if (updateContact(id, body)) {
//       res.status(200);
//     } else {
//       res.status(400).json({ message: "Contact not found" });
//     }
//   }
// });

// function addContact(obj) {
//   return contactsArr.push(obj);
// }

// function removeContact(id) {
//   let foundContact = contactsArr.findIndex((item) => id === String(item.id));
//   if (foundContact < 0) return null;
//   const newContactsArr = contactsArr.splice(foundContact, 1);
//   return newContactsArr;
// }

// function updateContact(id, body) {
//   let foundContact = contactsArr.findIndex((item) => id === String(item.id));
//   if (foundContact < 0) return null;
//   contactsArr[foundContact] = { body };
//   return contactsArr[foundContact];
// }

module.exports = {
  listContacts,
  getById,
  addContact,
  //   removeContact,
  //   updateContact,
};
