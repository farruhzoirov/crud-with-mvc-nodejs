const path = require('path');
const fs = require('fs');
const rootDir = require('../util/path');
const p = path.join(rootDir, 'db', 'users.json');


const getUsersFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    }
    cb(JSON.parse(fileContent));
  })
}
module.exports = class Users {
  constructor(id, name, lastname, imageUrl) {
    this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.imageUrl = imageUrl;
  }

  save() {
    if (this.id) {
      getUsersFromFile((users) => {
        const existingUserIndex = users.findIndex(user => user.id === this.id);
        const updatedUser = [...users];
        updatedUser[existingUserIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedUser, null, 2), (err) => {
          console.log(err)
        })
      })
    } else {
      this.id = Math.random().toString();
      getUsersFromFile((users) => {
        users.push(this);
        fs.writeFile(p, JSON.stringify(users, null, 2), (err) => {
          console.log(err)
        })
      })
    }
  }


  static deleteUser(id) {
    if (id) {
      getUsersFromFile((users) => {
        const updatedUsers = users.filter(user => user.id !== id);
        fs.writeFile(p, JSON.stringify(updatedUsers, null, 2), (err) => {
          console.log(err)
        })
      })
    }
  }

  static fetchAll(cb) {
    getUsersFromFile(cb);
  }

  static findById(id, cb) {
    getUsersFromFile((users) => {
      const user = users.find(user => user.id === id);
      cb(user);
    })
  }
}