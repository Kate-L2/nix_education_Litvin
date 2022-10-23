let fs = require("fs");

let path = process.cwd() + "/src/contacts_data/contacts.json";

let contactsArr = JSON.parse(fs.readFileSync(path));
console.log(contactsArr);
// let listContacts = () => {
//     fs.readFileSync(path, "utf8", function (err, data) {
//       if (err) {
//         console.log("File read failed:", err);
//         return;
//       }
//       try {
//         return JSON.parse(data);
//       } catch (e) {
//         console.log("Error parsing JSON string:", err);
//       }
//     });
// }
function listContacts() {
  return contactsArr;
}

function getById(id) {
  let foundContact = contactsArr.find((item) => {
    return id === String(item.id);
  });
  return foundContact;
}

function addContact(obj) {
  return contactsArr.push(obj);
}

function removeContact(id) {
  let foundContact = contactsArr.findIndex((item) => id === String(item.id));
  if (foundContact < 0) return null;
  const newContactsArr = contactsArr.splice(foundContact, 1);
  return newContactsArr;
}

function updateContact(id, body) {
  let foundContact = contactsArr.findIndex((item) => id === String(item.id));
  if (foundContact < 0) return null;
  contactsArr[foundContact] = { body };
  return contactsArr[foundContact];
}

module.exports = {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
};
