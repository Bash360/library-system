function generateRandom() {
  return Math.floor(Math.random() * 1000000).toString();
}

function generateBookID() {
  random = generateRandom();
  var bookID = random.length <= 4 ? generateRandom() : random;
  return bookID;
}
module.exports = generateBookID;