bookDatabase = require('./../database/database.js').bookDatabase;
generateBookID = require('./../helper-functions/random.js');
var Book = function () {}
Book.prototype.addBook = function (title, genre, author) {
  var found = Book.prototype.search(title, author);
  if (found) {
    found.copies += 1;
    return 'Book added';
  }
  var bookID = generateBookID();
  var copies = 1;
  bookDatabase.push({
    bookID,
    title,
    genre,
    author,
    copies
  });

}
Book.prototype.search = function (title, author) {
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

module.exports = Book;