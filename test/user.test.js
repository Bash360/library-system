User = require('./../modules/user.js');
Book = require('./../modules/book.js');
Admin = require('./../modules/admin.js');
describe("test suite for user", () => {
  it('search to be defined', () => {
    bash = new User('mark bashir', 'teacher');

    expect(bash.search()).toBeDefined();
  });
});
describe("test suite for user", () => {
  it('search to be defined', () => {
    bash = new User('mark bashir', 'teacher');

    expect(bash.readAllBooks()).toBeDefined();
  });
});
describe("test suite for book user", () => {

  it('returns unavailable', () => {
    bash = new User('mark bashir', 'teacher');
    expect(bash.requestBook('dan Brown', 'lily')).toMatch('book not in the library or unavailable request unsuccessful');
  });
  it('returns request pending', () => {
    bash = new User('mark bashir', 'teacher');
    const myBook = new Book();
    myBook.add('angels and demons', 'sci-fi', 'Dan Brown');
    expect(bash.requestBook('angels and demons', 'Dan Brown')).toMatch('request pending wait for approval of admin');
  });
});
describe("test suite for book user", () => {
  it('returns no request available', () => {
    bash = new User('mark bashir', 'teacher');
    const myBook = new Book();
    myBook.add('angels and demons', 'sci-fi', 'Dan Brown');
    expect(bash.viewRequest()).toMatch('no request available');
  });
  it('returns pending ', () => {
    var bash = new User('mark bashir', 'teacher');
    const myBook = new Book();
    myBook.add('angels and demons', 'sci-fi', 'Dan Brown');
    bash.requestBook('angels and demons', 'Dan Brown');
    expect(bash.viewRequest()).toMatch('Request for angels and demons pending......');
  });
});
describe("test suite for book user", () => {
  it('returns no request made', () => {
    var bash = new User('mark bashir', 'teacher');
    const myBook = new Book();
    myBook.add('angels and demons', 'sci-fi', 'Dan Brown');
    expect(bash.returnBook()).toMatch('no request made');
  });
  it('returns book returned back to library ', () => {
    var bash = new User('mark bashir', 'teacher');
    var enigma = new Admin('bash bash');
    const myBook = new Book();
    myBook.add('angels and demons', 'sci-fi', 'Dan Brown');
    bash.requestBook('angels and demons', 'Dan Brown');
    enigma.handleRequest();
    expect(bash.returnBook()).toMatch('book returned back to library');
  });
  it('returns no request made yet go search through our library and request for a book', () => {
    var bash = new User('mark bashir', 'teacher');
    const myBook = new Book();
    myBook.add('angels and demons', 'sci-fi', 'Dan Brown');
    expect(bash.returnBook()).toMatch('no request made yet go search through our library and request for a book');
  });
  it('returns no request made yet go search through our library and request for a book', () => {
    var bash = new User('mark bashir', 'teacher');
    var zinachi = new User('zinachi victor', 'junior student');
    var enigma = new Admin('bash bash');
    var enigma1 = new Admin('bash bash');
    var enigma2 = new Admin('bash bash');
    bash.requestBook('angels and demons', 'Dan Brown');
    enigma1.requestBook('angels and demons', 'Dan Brown');
    enigma2.requestBook('angels and demons', 'Dan Brown');
    enigma.requestBook('angels and demons', 'Dan Brown')
    zinachi.requestBook('angels and demons', 'Dan Brown');
    enigma.handleRequest();
    expect(zinachi.returnBook()).toMatch('request was not successful no book to return');
  });

});
describe("test suite for user", () => {
  it('returns user details updated', () => {
    bash = new User('mark bashir', 'teacher');

    expect(bash.update('bashorun')).toMatch('user details updated');
  });
});