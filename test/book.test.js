Book = require('./../modules/book.js');
describe('test suite for book module search()', () => {

  it('returns true', () => {
    const myBook = new Book();
    myBook.addBook('angels and demons', 'sci-fi', 'Dan Brown');
    expect(myBook.search('angels and demons', 'Dan Brown')).toMatch('found angels and demons \n by Dan Brown');
  });
  it('returns false', () => {
    const myBook = new Book();
    myBook.addBook('angels and demons', 'sci-fi', 'Dan Brown');
    expect(myBook.search('the subtle art of not giving a fuck', 'Mark Mason')).toBeFalsy();
  });
});
describe("test suite for book module addBook", () => {

  it('returns book added ', () => {
    const myBook = new Book();
    expect(myBook.addBook('angels and demons', 'sci-fi', 'Dan Brown')).toMatch('book created');
  });
});
describe('test suite for book module search()', () => {

  it('returns book added ', () => {
    const myBook = new Book();
    myBook.addBook('angels and demons', 'sci-fi', 'Dan Brown');
    expect(myBook.search('angels and demons', 'Dan Brown')).toMatch('found angels and demons \n by Dan Brown');
  });
  it('returns false ', () => {
    const myBook = new Book();
    myBook.addBook('angels and demons', 'sci-fi', 'Dan Brown');
    expect(myBook.search('angels and demons', 'Danny Brown')).toBeFalsy();
  });
});
describe("test suite for book module getBookID()", () => {

  it('returns an ID', () => {
    const myBook = new Book();
    myBook.addBook('angels and demons', 'sci-fi', 'Dan Brown')
    expect(myBook.getBookID('angels and demons', 'Dan Brown')).not.toMatch(' ');

  });
  it('returns false', () => {
    const myBook = new Book();
    myBook.addBook('angels and demons', 'sci-fi', 'Dan Brown')
    expect(myBook.getBookID('angels and demons', 'Dan Brow')).toBeFalsy();

  });
});
describe("test suite for book readAll()", () => {

  it('returns an array', () => {
    const myBook = new Book();
    myBook.addBook('angels and demons', 'sci-fi', 'Dan Brown');
    expect(myBook.readAll()).toHaveLength(1);
  });
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
  it('returns deleted all books', () => {
    const myBook = new Book();
    myBook.addBook('angels and demons', 'sci-fi', 'Dan Brown');
    danBrown = myBook.getBookID('angels and demons', 'Dan Brown')
    expect(myBook.deleteAll()).toMatch('deleted all books');
  });
  it('returns database empty ', () => {
    const myBook = new Book();
    expect(myBook.deleteAll()).toMatch('database empty');
  });

});
describe("test suite for book update()", () => {

  it('returns an copies added', () => {
    const myBook = new Book();
    myBook.addBook('angels and demons', 'sci-fi', 'Dan Brown');
    danBrown = myBook.getBookID('angels and demons', 'Dan Brown');
    expect(myBook.update(danBrown, 23)).toMatch('23 copies added to angels and demons')
  });
  it('returns false', () => {
    const myBook = new Book();
    myBook.addBook('angels and demons', 'sci-fi', 'Dan Brown');
    expect(myBook.update(261, 45)).toBeFalsy();
  });
});