bookDatabase = require('./../database/database.js').bookDatabase;
const bookpriorityDatabase = require('./../database/database.js').booksPriorityDatabase;
const requestDatabase = require('./../database/database.js').requestDatabase;
/*
helper function to generate random ID that her not less
 */
function generateRandom() {
  return Math.floor(Math.random() * 1000000).toString();
}

function generateBookID() {
  random = generateRandom();
  var ID = random.length <= 4 ? generateRandom() : random;
  return ID;
}

function generateUserID() {
  random = generateRandom();
  var ID = random.length <= 4 ? generateRandom() : random;
  return ID;
}

function search(title, author) {
  var found = false;
  var bookFound;
  for (counter = 0; counter < bookDatabase.length; counter++) {
    if (bookDatabase[counter].title === title && bookDatabase[counter].author === author) {
      found = true;
      bookFound = bookDatabase[counter];
      break;
    }
  }
  if (found) {
    return bookFound;
  }
  return found;
}

function generatePriority(role) {
  var rolesAndPriority = {
    'teacher': 1,
    'senior student': 2,
    'junior student': 3
  };
  if (role in rolesAndPriority) {
    return rolesAndPriority[role];
  }
}

function priorityComplexity(bookID, titleOfBook, authorOfBook, userID, priority, timeRequest) {
  found = false;
  for (counter = 0; counter < bookpriorityDatabase.length; counter++) {
    if (bookpriorityDatabase[counter].bookID === bookID) {
      bookpriorityDatabase[counter].request.push(priority + timeRequest + '.' + userID);
      bookpriorityDatabase[counter].request.sort(function (a, b) {
        var reg = /\./g;
        var indexA = a.toString().search(reg);
        var indexB = b.toString().search(reg);

        return +a.toString().substr(0, indexA) - +b.toString().substr(0, indexB);

      });
      found = true;
      break;
    }
  }
  if (!found) {
    requestArr = [priority + timeRequest + '.' + userID];
    bookpriorityDatabase.push({
      bookID,
      request: requestArr,
      titleOfBook,
      authorOfBook,



    });
  }
}

function getRequest(userID) {
  for (counter = 0; counter < requestDatabase.length; counter++) {
    if (requestDatabase[counter].userID === userID) {
      return requestDatabase[counter];
    }
  }



}


module.exports = {
  generateBookID,
  generateUserID,
  search,
  generatePriority,
  priorityComplexity,
  getRequest
};