Book = require('./../modules/book.js');
describe('test suite for book module search()', () => {
  const myBook = new Book();
  myBook.addBook('angels and demons', 'sci-fi', 'Dan Brown');
  it('returns true', () => {
    expect(myBook.search('angels and demons', 'Dan Brown')).toBeTruthy();
  });
  it('returns false', () => {
    expect(myBook.search('the subtle art of not giving a fuck', 'Mark Mason')).toBeFalsy();
  });
});
describe("test suite for book module addBook", () => {
  const myBook = new Book();
  it('returns book added ', () => {
    expect(myBook.addBook('angels and demons', 'sci-fi', 'Dan Brown')).toMatch('book created');
  });
});
describe("test suite for book module search()", () => {
  const myBook = new Book();
  myBook.addBook('angels and demons', 'sci-fi', 'Dan Brown');
  it('returns book added ', () => {
    expect(myBook.search('angels and demons', 'Dan Brown')).toMatch('found angels and demons \n by Dan Brown');
  });
  it('returns false ', () => {
    expect(myBook.search('angels and demons', 'Danny Brown')).toBeFalsy();
  });
});
describe("test suite for book module getBookID()", () => {

  it('returns an ID', () => {
    const myBook = new Book();
    myBook.addBook('angels and demons', 'sci-fi', 'Dan Brown')
    expect(myBook.getBookID()).not.toBe(' ');
  });
});
describe("test suite for book readAll()", () => {

  it('returns an array', () => {
    const myBook = new Book();
    myBook.addBook('angels and demons', 'sci-fi', 'Dan Brown');
    expect(myBook.readAll()).toHaveLength(1);
  });

});
describe("test suite for book readAll()", () => {


  it('returns database empty', () => {
    const myBook = new Book();
    myBook.deleteAll();

    expect(myBook.readAll()).toMatch('database empty');
  });

});
describe("test suite for book delete", () => {

  it('returns falsy ', () => {
    const myBook = new Book();
    myBook.addBook('angels and demons', 'sci-fi', 'Dan Brown');
    danBrown = myBook.getBookID()
    expect(myBook.delete(danBrown)).toBeFalsy();
  });

  it('returns deleted ', () => {
    const myBook = new Book();
    myBook.addBook('angels and demons', 'sci-fi', 'Dan Brown');
    danBrown = myBook.getBookID('angels and demons', 'Dan Brown')
    expect(myBook.delete(danBrown)).toMatch('deleted');
  });
  it('returns deleted ', () => {
    const myBook = new Book();
    myBook.addBook('angels and demons', 'sci-fi', 'Dan Brown');
    danBrown = myBook.getBookID('angels and demons', 'Dan Brown')
    expect(myBook.deleteAll()).toMatch('deleted all books');
  });
  it('returns deleted ', () => {
    const myBook = new Book();
    expect(myBook.deleteAll()).toMatch('database empty');
  });

});