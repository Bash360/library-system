bookTable = require('./../database/database.js').bookTable;
const requestQueueTable = require('./../database/database.js').requestQueueTable;
const requestTable = require('./../database/database.js').requestTable;
/**
 *helper method to generate random number 
 *
 * @returns number
 */
function generateRandom() {
  return Math.floor(Math.random() * 1000000).toString();
}

/**
 *helper method to generate book ID
 *
 * @returns number
 */
function generateBookID() {
  var random = generateRandom();
  var ID = random.length <= 4 ? generateRandom() : random; //for random number not less than four in length
  return ID;
}

/**
 *helper function to generate random user ID
 *
 * @returns number
 */
function generateUserID() {
  random = generateRandom();
  var ID = random.length <= 4 ? generateRandom() : random; //for random number not less than four in length
  return ID;
}


/**
 *
 * helper function to get book from database
 * @param {string} title
 * @param {string} author
 * @returns object
 */
function getBook(title, author) {
  var isFound = false;
  var bookFound;
  for (counter = 0; counter < bookTable.length; counter++) {
    if (bookTable[counter].title === title && bookTable[counter].author === author) {
      isFound = true;
      bookFound = bookTable[counter]; //book isFound
      break;
    }
  }
  if (isFound) {
    return bookFound;
  }
  return isFound; //returns false when book not isFound
}

/**
 *
 *
 * @param {string} role
 * @returns number
 */
function generatePriority(role) {
  var rolesAndPriority = {
    'teacher': 1,
    'senior student': 2,
    'junior student': 3
  };
  if (role in rolesAndPriority) {
    return rolesAndPriority[role]; // returns the equivalent priority of role e.g generatePriority('senior student') returns 2
  }
}

/**
 *a helper method to add book request, to request queue
 *
 * @param {number} bookID 
 * @param {string} titleOfBook string
 * @param {string} authorOfBook string
 * @param {number} userID
 * @param {number} priority
 * @param {number} timeRequest
 */
function addToRequestQueue(bookID, titleOfBook, authorOfBook, userID, priority, timeRequest) {
  isFound = false;
  for (counter = 0; counter < requestQueueTable.length; counter++) {
    if (requestQueueTable[counter].bookID === bookID) { // checks if a request for the book has been made if it has adds it to the book queue
      requestQueueTable[counter].requestQueue.push(priority + timeRequest + '.' + userID); //concatenates the priority,time of request in milliseconds and the userId, userID after the decimal point
      /**  sorting book request by time and priority  */
      requestQueueTable[counter].requestQueue.sort(function (a, b) {
        var reg = /\./g; //regular expression to find a decimal point
        var indexA = a.toString().search(reg); //uses regular expression defined above to find the index of the decimal point
        var indexB = b.toString().search(reg); //uses regular expression defined above to find the index of the decimal point

        return +a.toString().substr(0, indexA) - +b.toString().substr(0, indexB); //removes the userID using substr(index) so it does not affect the sorting

      });
      isFound = true;
      break;
    }
  }
  if (!isFound) {
    var requestArr = [priority + timeRequest + '.' + userID]; //adds request to the Book queque when no request for book has been made, first request in the queue
    requestQueueTable.push({
      bookID,
      titleOfBook,
      authorOfBook,
      requestQueue: requestArr,



    });
  }
}

/**
 *
 *helper method to get request from request database
 * @param {number} userID
 * @returns object
 */
function getRequest(userID) {
  for (counter = 0; counter < requestTable.length; counter++) {
    if (requestTable[counter].userID === userID) {
      return requestTable[counter];
    }
  }



}


module.exports = {
  generateBookID,
  generateUserID,
  getBook,
  generatePriority,
  addToRequestQueue,
  getRequest
};