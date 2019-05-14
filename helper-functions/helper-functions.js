bookDatabase=require('./../database/database.js').bookDatabase;
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
module.exports = {generateID,search};