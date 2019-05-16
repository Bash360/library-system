bookDatabase = require('./../database/database.js').bookDatabase;
const bookpriorityDatabase = require('./../database/database.js').booksPriorityDatabase;
const requestDatabase = require('./../database/database.js').requestDatabase;
/*
helper function to generate random Numbers for ID
 */
function generateRandom() {
  return Math.floor(Math.random() * 1000000).toString();
}
/* helper function to generate book ID calling the random helper function
 */
function generateBookID() {
  var random = generateRandom();
  var ID = random.length <= 4 ? generateRandom() : random; //for random number not less than four in length
  return ID;
}
/* helper function to generate user ID calling the random helper function
 */
function generateUserID() {
  random = generateRandom();
  var ID = random.length <= 4 ? generateRandom() : random; //for random number not less than four in length
  return ID;
}

/* a helper function to search the book database and return the book isFound 
 */
function getBook(title, author) {
  var isFound = false;
  var bookFound;
  for (counter = 0; counter < bookDatabase.length; counter++) {
    if (bookDatabase[counter].title === title && bookDatabase[counter].author === author) {
      isFound = true;
      bookFound = bookDatabase[counter]; //book isFound
      break;
    }
  }
  if (isFound) {
    return bookFound;
  }
  return isFound; //returns false when book not isFound
}
/*
a helper function to return priority 
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
/* a helper function to add request to queue */
function addToRequestQueue(bookID, titleOfBook, authorOfBook, userID, priority, timeRequest) {
  isFound = false;
  for (counter = 0; counter < bookpriorityDatabase.length; counter++) {
    if (bookpriorityDatabase[counter].bookID === bookID) { // checks if a request for the book has been made if it has adds it to the book queue
      bookpriorityDatabase[counter].requestQueue.push(priority + timeRequest + '.' + userID); //concatenates the priority,time of request in milliseconds and the userId, userID after the decimal point
      /**  sorting book request by time and priority  */
      bookpriorityDatabase[counter].requestQueue.sort(function (a, b) {
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
    requestArr = [priority + timeRequest + '.' + userID]; //adds request to the Book queque when no request for book has been made, first request in the queue
    bookpriorityDatabase.push({
      bookID,
      requestQueue: requestArr,
      titleOfBook,
      authorOfBook,



    });
  }
}
/** helper function to get request with userID */
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
  getBook,
  generatePriority,
  addToRequestQueue,
  getRequest
};