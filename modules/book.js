bookDatabase = require('./../database/database.js').bookDatabase;
generateBookID = require('../helper-functions/helper-functions.js').generateBookID;
getBook = require('../helper-functions/helper-functions.js').getBook;
var Book = function () {


}
Book.prototype.add = function (title, genre, author) {
  var found = getBook(title, author);
  if (found) {
    found.copies += 1;
  } else {
    var bookID = generateBookID();

    copies = 1;
    bookDatabase.push({
      bookID,
      title,
      genre,
      author,
      copies
    });
  }
  return 'book created';


}
Book.prototype.getID = function (title, author) {
  found = getBook(title, author);
  if (found) {
    return found.bookID;
  }
  return false;

}
Book.prototype.search = function (queryString) {
  if (queryString === '') {
    return 'cant search with an empty String'
  }
  found = false;
  var booksFound = [];
  var searchReg = new RegExp(queryString, 'i');
  for (counter = 0; counter < bookDatabase.length; counter++) {
    var currentBookTitle = bookDatabase[counter].title;
    var currentBookAuthor=bookDatabase[counter].author;
    statusOfSearch = searchReg.test(currentBookTitle)|| searchReg.test(currentBookAuthor);
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
Book.prototype.update = function (bookID, copies) {
  var found = false;
  var bookFound;
  for (counter = 0; counter < bookDatabase.length; counter++) {
    if (bookDatabase[counter].bookID === bookID) {
      found = true;
      bookFound = bookDatabase[counter];
      break;
    }
  }
  if (found) {
    bookFound.copies += copies;
    return `${copies} copies added to ${bookFound.title}`;
  }
  return found;
}
Book.prototype.readAll = function () {
  if (bookDatabase.length === 0) {
    return 'database empty';
  }
  return bookDatabase;
}
Book.prototype.delete = function (bookID) {
  var found = false;
  var bookFound;
  for (counter = 0; counter < bookDatabase.length; counter++) {
    if (bookDatabase[counter].bookID === bookID) {
      found = true;
      bookFound = bookDatabase[counter];
      index = counter;
      break;
    }
  }
  if (found) {
    bookFound.copies === 1 ? bookDatabase.splice(index, 1) : bookFound.copies -= 1;
    return `deleted`;
  }
  return found;
}
Book.prototype.deleteAll = function () {
  if (bookDatabase.length === 0) {
    return 'database empty';
  }
  bookDatabase.length = 0;
  return 'deleted all books';
}

module.exports = Book;