var book = require('./book.js');
var user = require('./user.js');
const requestDatabase = require('./../database/database.js').requestDatabase;
const bookDatabase = require('./../database/database.js').bookDatabase;
var search = require('../helper-functions/helper-functions.js').search;
var getRequest = require('../helper-functions/helper-functions.js').getRequest;
const bookpriorityDatabase = require('./../database/database.js').booksPriorityDatabase;


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
Admin.prototype.handleRequest = function () {
  if (bookpriorityDatabase.length === 0) {
    return 'no request';
  }
  for (counter = 0; counter < bookpriorityDatabase.length; counter++) {
    var currentBookDetails = bookpriorityDatabase[counter];
    var bookTitle = currentBookDetails.titleOfBook;
    var bookAuthor = currentBookDetails.authorOfBook;
    var bookID = currentBookDetails.bookID;
    var currentBook = search(bookTitle, bookAuthor);
    var requestArr = bookpriorityDatabase[counter].request;
    for (secondCounter = 0; secondCounter < requestArr.length; secondCounter++) {
      var unfilteredUserID = requestArr[secondCounter]
      var filteredUserID = unfilteredUserID.match(/(?<=\.)\d{1,}/g).join('');
      var request = getRequest(filteredUserID, bookID);
      if (currentBook.copies !== 0) {
        currentBook.copies -= 1;

        request.requestStatus = 'request Approved';
      } else {
        request.requestStatus = 'book taken';


      }
    }
  }
  bookpriorityDatabase.length = 0;
  return 'request Handled'

}

module.exports = Admin;