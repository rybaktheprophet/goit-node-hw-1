const fs = require('fs');
const path = require('path');
const contactsPath = path.resolve('./db/contacts.json');

function listContacts() {
  fs.readFile(contactsPath, 'utf-8', (error, data) => {
    if (error) {
      return console.log(error);
    }
    const contacts = JSON.parse(data);
    console.log('List of contacts: ');
    console.table(contacts);
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, 'utf-8', (error, data) => {
    if (error) {
      return console.log(error);
    }
    const contacts = JSON.parse(data);
    const contact = contacts.find(contact => {
      if (contact.id === contactId) {
        console.log(`Find contact by ID ${contactId}:`);
        console.table(contact);
        return contact;
      }
    });

    if (contact == null) {
      console.log(`Contact with ID "${contactId}" not found!`);
    }
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, 'utf-8', (error, data) => {
    if (error) {
      return console.log(error);
    }
    const contacts = JSON.parse(data);
    const random =
      Math.floor(
        Math.random() * (999999999999999999999 - 100000000000000000000 + 1)
      ) + 100000000000000000000;
    contacts.push({
      id: random.toString(),
      name: name,
      email: email,
      phone: phone,
    });
    console.log('Contact added! New lists of contacts: ');
    console.table(contacts);
    fs.writeFile(contactsPath, JSON.stringify(contacts), error => {
      if (error) {
        return console.log(error);
      }
    });
  });
}
function removeContact(contactId) {
  fs.readFile(contactsPath, 'utf-8', (error, data) => {
    const contacts = JSON.parse(data);
    const deleteContact = contacts.filter(contact => {
      if (contact.id === contactId) {
        console.log(
          `Delete contact with ID "${contactId}". New list of contacts:`
        );
        const newContacts = contacts.filter(
          contact => contact.id !== contactId
        );
        console.table(newContacts);

        fs.writeFile(contactsPath, JSON.stringify(newContacts), error => {
          if (error) {
            return console.log(error);
          }
        });
      }
    });
    if (error) {
      return console.log(error);
    }
  });
}

module.exports = {
  listContacts,
  addContact,
  removeContact,
  getContactById,
};
