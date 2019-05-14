var book = require('./book.js');
var user = require('./user.js');
const requestDatabase = require('./../database/database.js').requestDatabase;
var Admin = function (name) {
  this.name = name;
  user.call(this, name, 'teacher');
}
Admin.prototype = Object.create(user.prototype);
Admin.prototype.constructor = Admin;
Admin.prototype.addBook = function (title, genre, author) {
  return book.prototype.add(title, genre, author);
}
Admin.prototype.getBookID = function (title, author) {
  return book.prototype.getID(title, author);
}
Admin.prototype.updateBook = function (bookID, copies) {
  return book.prototype.update(bookID, copies);
}
Admin.prototype.deleteBook = function (bookID) {
  return book.prototype.delete(bookID);
}
Admin.prototype.deleteAllBooks = function () {
  return book.prototype.deleteAll();
}
Admin.prototype.viewAllRequest = function () {
  if (requestDatabase.length === 0) {
    return 'no request';
  }
  return requestDatabase;
}

module.exports = Admin;