// const express = require("express");
const Contacts = require("../models/contacts.js");

const listContacts = function (req, res) {
  Contacts.find({})
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).json({ error: "Could not find a collection" });
    });
};

const getById = function (req, res) {
  let id = req.params.id;
  Contacts.findOne({ id: id })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).json({ error: "Could not find a contact with this id" });
    });
};

const addContact = function (req, res) {
  let id = req.body.id;
  let name = req.body.name;
  let email = req.body.email;
  let phone = req.body.phone;
  if (!id) {
    res.status(400).send({
      message: "Missing required id",
    });
  }
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
    let newContact = new Contacts({
      id: id,
      name: name,
      email: email,
      phone: phone,
    });
    newContact.save().then(() => console.log("New contact created"));
    res.status(201).send(newContact);
  }
};

const removeContact = function (req, res) {
  let id = req.params.id;
  Contacts.deleteOne({ id: id })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).json({ error: "Could not delete a contact" });
    });
};

const updateContact = function (req, res) {
  let id = req.body.id;
  let name = req.body.name;
  let email = req.body.email;
  let phone = req.body.phone;
  Contacts.updateOne(
    { id: id },
    {
      $set: {
        id: id,
        name: name,
        email: email,
        phone: phone,
      },
    }
  )
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).json({ error: "Could not update a contact" });
    });
};

module.exports = {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
};
