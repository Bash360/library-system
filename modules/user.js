var userDatabase = require('./../database/database.js').userDatabase;
const generateUserID = require('../helper-functions/helper-functions.js').generateUserID;
var search = require('../helper-functions/helper-functions.js').search;
var generatePriority = require('../helper-functions/helper-functions.js').generatePriority;
var priorityQueue = require('../helper-functions/helper-functions.js').priorityComplexity;
const requestDatabase = require('./../database/database.js').requestDatabase;
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
User.prototype.search = function (title, author) {
  return Book.prototype.search(title, author);
}
User.prototype.readAllBooks = function () {
  return Book.prototype.readAll();
}
User.prototype.requestBook = function (title, author) {
  var found = search(title, author);
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
    priorityQueue(bookID, titleOfBook, authorOfBook, userID, priorityOfUser, requestInMilliseconds); //adds request to priority queue
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
    return `Request for ${found.titleOfBook} ${found.requestStatus}......`;
  }
  return 'no request available';
}

module.exports = User;