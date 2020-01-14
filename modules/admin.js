var book = require('./book.js');
var user = require('./user.js');
const requestTable = require('./../database/database.js').requestTable;
var getBook = require('../helper-functions/helper-functions.js').getBook;
var getRequest = require('../helper-functions/helper-functions.js').getRequest;
const requestQueueTable = require('./../database/database.js').requestQueueTable;

/**
 * admin contructor 
 *
 * @param {string} name
 */
var Admin = function (name) {
  this.name = name;
  user.call(this, name, 'teacher'); //calls user constructor  and passes role as teacher so admin has teacher priority
}
Admin.prototype = Object.create(user.prototype);
Admin.prototype.constructor = Admin;

/**
 * method to add book to library 
 *
 * @param {string} title
 * @param {string} genre
 * @param {string} author
 * @returns string
 */
Admin.prototype.addBook = function (title, genre, author) {
  return book.prototype.add(title, genre, author);
}

/**
 * method to get ID of book from library
 *
 * @param {string} title
 * @param {string} author
 * @returns number
 */
Admin.prototype.getBookID = function (title, author) {
  return book.prototype.getID(title, author);
}



/**
 *
 * method to update book in library 
 * @param {number} bookID
 * @param {number} copies
 * @returns string
 */
Admin.prototype.updateBook = function (bookID, copies) {
  return book.prototype.update(bookID, copies);
}



/**
 *
 * method to delete book from library 
 * @param {number} bookID
 * @returns string
 */
Admin.prototype.deleteBook = function (bookID) {
  return book.prototype.delete(bookID);
}



/**
 * method to delete All book from library
 *
 * @returns string
 */
Admin.prototype.deleteAllBooks = function () {
  return book.prototype.deleteAll();
}


/**
 * method to view all request for book 
 *
 * @returns array
 */
Admin.prototype.viewAllRequest = function () {
  if (requestTable.length === 0) {
    return 'no request';
  }
  return requestTable;
}

/**
 * method to handle book request it either approves request or updates request status to taken
 *
 * @returns string
 */
Admin.prototype.handleRequest = function () {
  if (requestQueueTable.length === 0) {
    return 'no request';
  }
  for (counter = 0; counter < requestQueueTable.length; counter++) {
    var currentBookDetails = requestQueueTable[counter];
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
  requestQueueTable.length = 0;
  return 'request Handled';

}

module.exports = Admin;