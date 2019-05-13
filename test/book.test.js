Book=require('./../modules/book.js');
describe('test suite for book module search()',()=>{
  const myBook=new Book();
  myBook.addBook('angels and demons','sci-fi','Dan Brown');
  it('returns true',()=>{
  expect(myBook.search('angels and demons','Dan Brown')).toBeTruthy();
  });
  it('returns false',()=>{
    expect(myBook.search('the subtle art of not giving a fuck','Mark Mason')).toBeFalsy();
  });
});