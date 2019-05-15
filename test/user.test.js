User = require('./../modules/user.js');
Book = require('./../modules/book.js');
describe("test suite for user", () => {
  it('search to be defined', () => {
    bash = new User('mark bashir', 1);

    expect(bash.search()).toBeDefined();
  });
});
describe("test suite for user", () => {
  it('search to be defined', () => {
    bash = new User('mark bashir', 1);

    expect(bash.readAllBooks()).toBeDefined();
  });
});
describe("test suite for book user", () => {

  it('returns unavailable', () => {
    bash = new User('mark bashir', 1);
    expect(bash.requestBook('dan Brown', 'lily')).toMatch('book not in the library or unavailable request unsuccessful');
  });
  it('returns request pending', () => {
    bash = new User('mark bashir', 1);
    const myBook = new Book();
    myBook.add('angels and demons', 'sci-fi', 'Dan Brown');
    expect(bash.requestBook('angels and demons', 'Dan Brown')).toMatch('request pending wait for approval of admin');
  });
  describe("test suite for book user", () => {
    it('returns no request available', () => {
      bash = new User('mark bashir', 1);
      const myBook = new Book();
      myBook.add('angels and demons', 'sci-fi', 'Dan Brown');
      expect(bash.viewRequest()).toMatch('no request available');
    });
  });
  it('returns peending ', () => {
    bash = new User('mark bashir', 1);
    const myBook = new Book();
    myBook.add('angels and demons', 'sci-fi', 'Dan Brown');
    bash.requestBook('angels and demons', 'Dan Brown');
    expect(bash.viewRequest()).toMatch('Request for angels and demons pending......');
  });
});