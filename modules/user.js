var userDatabase = require('./../database/database.js').userDatabase;
const generateUserID = require('../helper-functions/helper-functions.js').generateUserID;
var getBook = require('../helper-functions/helper-functions.js').getBook;
var generatePriority = require('../helper-functions/helper-functions.js').generatePriority;
var addToRequestQueue = require('../helper-functions/helper-functions.js').addToRequestQueue;
const requestDatabase = require('./../database/database.js').requestDatabase;
var getRequest = require('../helper-functions/helper-functions.js').getRequest;
var Book = require('./book.js');
/* 
User constructor to add user to user database
*/

var User = function (name, role) {

  this.name = name;
  this.priority = generatePriority(role); //gets the equivalent priority for role
  this.userID = generateUserID(); //generates ID for user
  userDatabase.push({
    name: this.name,
    priority: this.priority,
    userID: this.userID
  });
}
/* 
method searches book database with book title and book author
*/
User.prototype.search = function (searchString) {
  return Book.prototype.search(searchString);
}
/* 
method readsAllBooks in the book database
 */
User.prototype.readAllBooks = function () {
  return Book.prototype.readAll();
}
/* 
method for user to request for book
*/
User.prototype.requestBook = function (title, author) {
  var foundBook = getBook(title, author);
  if (foundBook && foundBook.copies !== 0) {
    var titleOfBook = foundBook.title;
    var authorOfBook = foundBook.author;
    var priorityOfUser = this.priority;
    var nameOfUser = this.name;
    var userID = this.userID;
    var bookID = foundBook.bookID;
    var requestStatus = 'pending';

    var time = new Date();
    var timeOfRequest = time.toLocaleString();
    var requestInMilliseconds = `${time.getHours()+time.getMinutes()+time.getMilliseconds()}`
    addToRequestQueue(bookID, titleOfBook, authorOfBook, userID, priorityOfUser, requestInMilliseconds); //adds request to book queue
    requestDatabase.push({
      nameOfUser,
      userID,
      bookID,
      titleOfBook,
      authorOfBook,
      priorityOfUser,
      timeOfRequest,
      requestStatus

    });
    return 'request pending wait for approval of admin';
  }
  return 'book not in the library or unavailable request unsuccessful';
}
/* 
method to view Request made by user
*/
User.prototype.viewRequest = function () {
  var isFound = false;
  var request;
  for (counter = 0; counter < requestDatabase.length; counter++) {
    if (requestDatabase[counter].userID === this.userID) {
      request = requestDatabase[counter];
      isFound=true;
    }
  }
  if (isFound) {
    return `Status of Request for ${request.titleOfBook} ${request.requestStatus}......`;
  }
  return 'no request available';
}
/* 
method to return book back to library
*/
User.prototype.returnBook = function () {
  var bookRequested = getRequest(this.userID); 
  if (!bookRequested) { //if request not found
    return 'no request made yet go search through our library and request for a book';
  }
  var requestIndex = requestDatabase.indexOf(bookRequested);
  if (bookRequested.requestStatus === 'request Approved') {
    var myBook = getBook(bookRequested.titleOfBook, bookRequested.authorOfBook);
    myBook.copies += 1;
    requestDatabase.splice(requestIndex, 1); //removes approved request from request database
    return 'book returned back to library';
  }
  requestDatabase.splice(requestIndex, 1); //removes unsuccessful request from request database
  return 'request was not successful no book to return';
}

module.exports = User;