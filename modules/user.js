var userDatabase = require('./../database/database.js').userDatabase;
const generateUserID = require('../helper-functions/helper-functions.js').generateUserID;
var getBook = require('../helper-functions/helper-functions.js').getBook;
var generatePriority = require('../helper-functions/helper-functions.js').generatePriority;
var addToRequestQueue = require('../helper-functions/helper-functions.js').addToRequestQueue;
const requestDatabase = require('./../database/database.js').requestDatabase;
var getRequest = require('../helper-functions/helper-functions.js').getRequest;
var Book = require('./book.js');


var User = function (name, role) {

  this.name = name;
  this.priority = generatePriority(role);
  this.userID = generateUserID();
  userDatabase.push({
    name: this.name,
    priority: this.priority,
    userID: this.userID
  });
}
User.prototype.search = function (searchString) {
  return Book.prototype.search(searchString);
}
User.prototype.readAllBooks = function () {
  return Book.prototype.readAll();
}
User.prototype.requestBook = function (title, author) {
  var found = getBook(title, author);
  if (found && found.copies !== 0) {
    var titleOfBook = found.title;
    var authorOfBook = found.author;
    var priorityOfUser = this.priority;
    var nameOfUser = this.name;
    var userID = this.userID;
    var bookID = found.bookID;
    var requestStatus = 'pending';

    time = new Date();
    timeOfRequest = time.toLocaleString();
    requestInMilliseconds = `${time.getHours()+time.getMinutes()+time.getMilliseconds()}`
    addToRequestQueue(bookID, titleOfBook, authorOfBook, userID, priorityOfUser, requestInMilliseconds); //adds request to priority queue
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
User.prototype.viewRequest = function () {
  var found = false;
  for (counter = 0; counter < requestDatabase.length; counter++) {
    if (requestDatabase[counter].userID === this.userID) {
      found = requestDatabase[counter];
    }
  }
  if (found) {
    return `Status of Request for ${found.titleOfBook} ${found.requestStatus}......`;
  }
  return 'no request available';
}
User.prototype.returnBook = function () {
  var bookRequested = getRequest(this.userID);
  if (!bookRequested) {
    return 'no request made yet go search through our library and request for a book';
  }
  var requestIndex = requestDatabase.indexOf(bookRequested);
  if (bookRequested.requestStatus === 'request Approved') {
    var myBook = getBook(bookRequested.titleOfBook, bookRequested.authorOfBook);
    myBook.copies += 1;
    requestDatabase.splice(requestIndex, 1);
    return 'book returned back to library';
  }
  requestDatabase.splice(requestIndex, 1);
  return 'request was not successful no book to return';
}

module.exports = User;