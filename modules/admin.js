var book=require('./book.js');
var user=require('./user.js');
var Admin=function(name){
  this.name=name;
  user.call(name,'teacher');
}
Admin.prototype=Object.create(user.prototype);
Admin.prototype.constructor=Admin;
Admin.prototype.addBook=function(title, genre, author){
return book.prototype.add(title, genre, author);
}
Admin.prototype.getBookID=function(title, author){
  return book.prototype.getID(title, author);
}
Admin.prototype.updateBook=function(bookID,copies){
  return book.prototype.update(bookID,copies);
}
module.exports=Admin;
