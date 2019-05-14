bookDatabase = require('./../database/database.js').bookDatabase;
bookpriorityDatabase = require('./../database/database.js').booksPriorityDatabase;

function generateRandom() {
  return Math.floor(Math.random() * 1000000).toString();
}

function generateID() {
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

function priorityComplexity(bookID, userID, priority, timeRequest) {
  found = false;
  for (counter = 0; counter < bookpriorityDatabase.length; counter++) {
    if (bookpriorityDatabase[counter].bookID === bookID) {
      bookpriorityDatabase[counter].request.push(priority + timeRequest + '.' + userID);
      bookpriorityDatabase[counter].request.sort(function (a, b) {
        return a - b;
      });
      found = true;
    }
  }
  if (!found) {
    request = [priority + timeRequest + '.' + userID];
    bookpriorityDatabase.push({
      bookID,
      request



    });
  }
}


module.exports = {
  generateID,
  search,
  generatePriority,
  priorityComplexity
};