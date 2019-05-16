var book = require('./book.js');
var user = require('./user.js');
const requestDatabase = require('./../database/database.js').requestDatabase;
var getBook = require('../helper-functions/helper-functions.js').getBook;
var getRequest = require('../helper-functions/helper-functions.js').getRequest;
const bookpriorityDatabase = require('./../database/database.js').booksPriorityDatabase;

/* 
admin contructor 
*/
var Admin = function (name) {
  this.name = name;
  user.call(this, name, 'teacher'); //calls user constructor  and passes role as teacher so admin has teacher priority
}
Admin.prototype = Object.create(user.prototype);
Admin.prototype.constructor = Admin;
/* 
method to add book to library 
title,
genre,
author
as arguments
*/
Admin.prototype.addBook = function (title, genre, author) {
  return book.prototype.add(title, genre, author);
}
/* 
method to get ID of book from library
title,
author
as arguments
*/
Admin.prototype.getBookID = function (title, author) {
  return book.prototype.getID(title, author);
}
/* 
method to update book in library 
bookID,
copies 
as arguments
*/
Admin.prototype.updateBook = function (bookID, copies) {
  return book.prototype.update(bookID, copies);
}
/* 
method to delete book from library 
bookID as argument
*/
Admin.prototype.deleteBook = function (bookID) {
  return book.prototype.delete(bookID);
}
/* 
method to delete All book from library
no argument
*/
Admin.prototype.deleteAllBooks = function () {
  return book.prototype.deleteAll();
}
/* 
method to view all request for book 
no argument
*/
Admin.prototype.viewAllRequest = function () {
  if (requestDatabase.length === 0) {
    return 'no request';
  }
  return requestDatabase;
}
/* 
method to handle book request it either approves request or updates request status to taken
no argument
*/
Admin.prototype.handleRequest = function () {
  if (bookpriorityDatabase.length === 0) {
    return 'no request';
  }
  for (counter = 0; counter < bookpriorityDatabase.length; counter++) {
    var currentBookDetails = bookpriorityDatabase[counter];
    var bookTitle = currentBookDetails.titleOfBook;
    var bookAuthor = currentBookDetails.authorOfBook;
    var requestQueue = currentBookDetails.requestQueue; //book queque
    var bookFromLibrary = getBook(bookTitle, bookAuthor); //gets the current boook from book database
    for (secondCounter = 0; secondCounter < requestQueue.length; secondCounter++) {
      var priorityTimeUserID = requestQueue[secondCounter];
      var userIDRegEx = /(?<=\.)\d{1,}/; //regular expression for extracting userID
      var userID = priorityTimeUserID.match(userIDRegEx).join(''); //extracts user ID
      var request = getRequest(userID);
      if (bookFromLibrary.copies !== 0) {
        bookFromLibrary.copies -= 1;
        request.requestStatus = 'request Approved';
      } else {
        request.requestStatus = 'book taken';
      }
    }
  }
  bookpriorityDatabase.length = 0;
  return 'request Handled';

}

module.exports = Admin;