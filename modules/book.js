bookDatabase = require('./../database/database.js').bookDatabase;
generateBookID = require('../helper-functions/helper-functions.js').generateBookID;
getBook = require('../helper-functions/helper-functions.js').getBook;
var Book = function () {}

/**
 *
 *
 * @param {string} title
 * @param {string} genre
 * @param {string} author
 * @returns string
 */
Book.prototype.add = function (title, genre, author) {
  var foundBook = getBook(title, author);
  if (foundBook) { //checks if book is already in book database
    foundBook.copies += 1; //increases copy by one if book is already in database
  } else { //if not found it adds book to database
    var bookID = generateBookID();

    var copy = 1;
    bookDatabase.push({
      bookID,
      title,
      genre,
      author,
      copies: copy
    });
  }
  return 'book created';


}

/**
 *
 *
 * @param {string} title
 * @param {string} author
 * @returns number
 */
Book.prototype.getID = function (title, author) {
  found = getBook(title, author);
  if (found) {
    return found.bookID;
  }
  return false;

}
/**
 * method to search for book by title and author
 *
 * @param {string} queryString
 * @returns array
 */
Book.prototype.search = function (queryString) {
  if (queryString === '') {
    return 'cant search with an empty String'
  }
  found = false;
  var booksFound = [];
  var searchRegularExpression = new RegExp(queryString, 'i');
  for (counter = 0; counter < bookDatabase.length; counter++) {
    var currentBookTitle = bookDatabase[counter].title;
    var currentBookAuthor = bookDatabase[counter].author;
    var statusOfSearch = searchRegularExpression.test(currentBookTitle) || searchRegularExpression.test(currentBookAuthor);
    if (statusOfSearch) {
      booksFound.push(bookDatabase[counter]);
      found = true;
    }

  }
  if (found) {
    return booksFound;
  }
  return 'book not found';
}
/**
 *
 *update book method takes bookID and copies as arguments
 * @param {number} bookID
 * @param {number} copies
 * @returns string
 */
Book.prototype.update = function (bookID, copies) {
  var isFound = false;
  var bookFound;
  for (counter = 0; counter < bookDatabase.length; counter++) {
    if (bookDatabase[counter].bookID === bookID) {
      isFound = true;
      bookFound = bookDatabase[counter];
      break;
    }
  }
  if (isFound) {
    bookFound.copies += copies; //updates copies if found
    return `${copies} copies added to ${bookFound.title}`;
  }
  return isFound;
}

/**
 * method to read All book in database
 *
 * @returns array
 */
Book.prototype.readAll = function () {
  if (bookDatabase.length === 0) {
    return 'database empty';
  }
  return bookDatabase;
}

/**
 *method to delete book in database
 *
 * @param {Number} bookID
 * @returns string
 */
Book.prototype.delete = function (bookID) {
  var isFound = false;
  var bookFound;
  for (counter = 0; counter < bookDatabase.length; counter++) {
    if (bookDatabase[counter].bookID === bookID) {
      isFound = true;
      bookFound = bookDatabase[counter];
      index = counter;
      break;
    }
  }
  if (isFound) {
    /* 
    uses ternary operator to check if book copy is 1 removes book from database,
    if its more than 1 copy, reduces book copy by 1
    */
    bookFound.copies === 1 ? bookDatabase.splice(index, 1) : bookFound.copies -= 1;
    return 'deleted';
  }
  return isFound;
}

/**
 * method to delete every book from book database
 *
 * @returns string
 */
Book.prototype.deleteAll = function () {
  if (bookDatabase.length === 0) {
    return 'database empty';
  }
  bookDatabase.length = 0;
  return 'deleted all books';
}

module.exports = Book;