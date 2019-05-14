var Admin = require('./../modules/admin.js');
var User = require('./user.js');
const bookpriorityDatabase = require('./../database/database.js').booksPriorityDatabase;
bash = new Admin('mark bashir');
zinachi = new User('zinachi victor', 'junior student');
zinachi2 = new User('zinachi victor', 'senior student');
bash.addBook('The Lost Symbol', 'sci-fi', 'Dan Brown');
zinachi.requestBook('The Lost Symbol', 'Dan Brown');
zinachi2.requestBook('The Lost Symbol', 'Dan Brown');


console.log(bash.handleRequest());
console.log(bash.viewAllRequest());