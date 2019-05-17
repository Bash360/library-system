var userTable = require('./../database/database.js').userTable;
const generateUserID = require('../helper-functions/helper-functions.js').generateUserID;
var getBook = require('../helper-functions/helper-functions.js').getBook;
var generatePriority = require('../helper-functions/helper-functions.js').generatePriority;
var addToRequestQueue = require('../helper-functions/helper-functions.js').addToRequestQueue;
const requestTable = require('./../database/database.js').requestTable;
var getRequest = require('../helper-functions/helper-functions.js').getRequest;
var Book = require('./book.js');

/**
 *
 * User constructor to create and add user to user database
 * @param {string} name
 * @param {string} role
 */
var User = function (name, role) {

  this.name = name;
  this.priority = generatePriority(role); //gets the equivalent priority for role
  this.userID = generateUserID(); //generates ID for user
  userTable.push({
    name: this.name,
    priority: this.priority,
    userID: this.userID
  });
}

/**
 * method searches book database with book title and book author
 *
 * @param {string} searchString
 * @returns string
 */
User.prototype.search = function (searchString) {
  return Book.prototype.search(searchString);
}

/**
 * method readsAllBooks in the book database
 *
 * @returns array
 */
User.prototype.readAllBooks = function () {
  return Book.prototype.readAll();
}

/**
 * method for user to request for book
 *
 * @param {string} title
 * @param {string} author
 * @returns string
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
    var requestInMilliseconds = `${time.getHours() + time.getMinutes() + time.getMilliseconds()}`;
    addToRequestQueue(bookID, titleOfBook, authorOfBook, userID, priorityOfUser, requestInMilliseconds); //adds request to book queue
    requestTable.push({
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

/**
 * method to view Request made by user
 *
 * @returns string
 */
User.prototype.viewRequest = function () {
  var isFound = false;
  var request;
  for (counter = 0; counter < requestTable.length; counter++) {
    if (requestTable[counter].userID === this.userID) {
      request = requestTable[counter];
      isFound = true;
    }
  }
  if (isFound) {
    return `Status of Request for ${request.titleOfBook} ${request.requestStatus}......`;
  }
  return 'no request available';
}

/**
 * method to return book back to library
 *
 * @returns string
 */
User.prototype.returnBook = function () {
  var bookRequested = getRequest(this.userID);
  if (!bookRequested) { //if request not found
    return 'no request made yet go search through our library and request for a book';
  }
  var requestIndex = requestTable.indexOf(bookRequested);
  if (bookRequested.requestStatus === 'request Approved') {
    var myBook = getBook(bookRequested.titleOfBook, bookRequested.authorOfBook);
    myBook.copies += 1;
    requestTable.splice(requestIndex, 1); //removes approved request from request database
    return 'book returned back to library';
  }
  requestTable.splice(requestIndex, 1); //removes unsuccessful request from request database
  return 'request was not successful no book to return';
}

/**
 *
 *method to update user details
 * @param {string} name
 * @returns string
 */
User.prototype.update=function(name){
var userID =this.userID;
     for(counter=0;counter<userTable.length;counter++){
       if(userTable[counter].userID===userID){
         userTable[counter].name=name;
       }
     }
  var request=getRequest(userID);
     if(request!==undefined){
       request.nameOfUser=name;
     }
     return 'user details updated';
}

module.exports = User;