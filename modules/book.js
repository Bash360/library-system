bookDatabase = require('./../database/database.js').bookDatabase;
generateBookID = require('../helper-functions/helper-functions.js').generateID;
search = require('../helper-functions/helper-functions.js').search;
var Book = function () {


}
Book.prototype.addBook = function (title, genre, author) {
  var found = search(title, author);
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
Book.prototype.getBookID = function (title, author) {
  found = search(title, author);
  if (found) {
    return found.bookID;
  }
  return false;

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
    return `found ${bookFound.title} \n by ${bookFound.author} `;
  }
  return found;
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
Book.prototype.delete=function (bookID) {
  var found = false;
  var bookFound;
  for (counter = 0; counter < bookDatabase.length; counter++) {
    if (bookDatabase[counter].bookID === bookID) {
      found = true;
      bookFound = bookDatabase[counter];
      index=counter;
      break;
    }
  }
  if (found) {
    bookFound.copies===1?bookDatabase.splice(index,1):bookFound.copies -=1;
    return `deleted`;
  }
  return found;
}
Book.prototype.deleteAll=function(){
  if(bookDatabase.length===0){
    return 'database empty';
  }
  bookDatabase.length=0;
  return 'deleted all books';
}

module.exports = Book;