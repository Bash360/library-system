Book = require('./../modules/book.js');
describe('test suite for book module search()', () => {

  it('returns an array', () => {
    const myBook = new Book();
    myBook.add('angels and demons', 'sci-fi', 'Dan Brown');
    expect(myBook.search('angels and demons')).toHaveLength(1);
  });
  it('returns book not found ', () => {
    const myBook = new Book();
    myBook.add('angels and demons', 'sci-fi', 'Dan Brown');
    expect(myBook.search('the subtle art of not giving a fuck')).toMatch('book not found');
  });
  it('returns cant search with an empty String', () => {
    const myBook = new Book();
    myBook.add('angels and demons', 'sci-fi', 'Dan Brown');
    expect(myBook.search('')).toMatch('cant search with an empty String');
  });
});
describe("test suite for book module add", () => {

  it('returns book added ', () => {
    const myBook = new Book();
    expect(myBook.add('angels and demons', 'sci-fi', 'Dan Brown')).toMatch('book created');
  });
});

describe("test suite for book module getID()", () => {

  it('returns an ID', () => {
    const myBook = new Book();
    myBook.add('angels and demons', 'sci-fi', 'Dan Brown')
    expect(myBook.getID('angels and demons', 'Dan Brown')).not.toMatch(' ');

  });
  it('returns false', () => {
    const myBook = new Book();
    myBook.add('angels and demons', 'sci-fi', 'Dan Brown')
    expect(myBook.getID('angels and demons', 'Dan Brow')).toBeFalsy();

  });
});
describe("test suite for book readAll()", () => {

  it('returns an array', () => {
    const myBook = new Book();
    myBook.add('angels and demons', 'sci-fi', 'Dan Brown');
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
    myBook.add('angels and demons', 'sci-fi', 'Dan Brown');
    danBrown = myBook.getID()
    expect(myBook.delete(danBrown)).toBeFalsy();
  });

  it('returns deleted ', () => {
    const myBook = new Book();
    myBook.add('angels and demons', 'sci-fi', 'Dan Brown');
    danBrown = myBook.getID('angels and demons', 'Dan Brown')
    expect(myBook.delete(danBrown)).toMatch('deleted');
  });
  it('returns deleted all books', () => {
    const myBook = new Book();
    myBook.add('angels and demons', 'sci-fi', 'Dan Brown');
    danBrown = myBook.getID('angels and demons', 'Dan Brown')
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
    myBook.add('angels and demons', 'sci-fi', 'Dan Brown');
    danBrown = myBook.getID('angels and demons', 'Dan Brown');
    expect(myBook.update(danBrown, 23)).toMatch('23 copies added to angels and demons')
  });
  it('returns false', () => {
    const myBook = new Book();
    myBook.add('angels and demons', 'sci-fi', 'Dan Brown');
    expect(myBook.update(261, 45)).toBeFalsy();
  });
});