Admin = require('./../modules/admin.js');
describe("test suite for library admin", () => {
  it('returns true', () => {
    bash = new Admin('mark bashir');
    expect(bash.addBook()).toBeDefined();
  });
});
describe("test suite for library admin", () => {
  it('returns true', () => {
    bash = new Admin('mark bashir');
    expect(bash.getBookID()).toBeDefined();
  });
});
describe("test suite for library admin", () => {
  it('returns true', () => {
    bash = new Admin('mark bashir');
    expect(bash.updateBook()).toBeDefined();
  });
});
describe("test suite for library admin", () => {
  it('returns true', () => {
    bash = new Admin('mark bashir');
    expect(bash.deleteBook()).toBeDefined();
  });
});
describe("test suite for library admin", () => {
  it('returns true', () => {
    bash = new Admin('mark bashir');
    expect(bash.deleteAllBooks()).toBeDefined();
  });
});
describe("test suite for library admin", () => {
  it('returns true', () => {
    bash = new Admin('mark bashir');
    expect(bash.viewAllRequest()).toMatch('no request');
  });

});
describe("test suite for library admin", () => {
  it('returns true', () => {
    let bash = new Admin('mark bashir');
    bash.addBook('The Lost Symbol', 'sci-fi', 'Dan Brown');
    bash.requestBook('The Lost Symbol', 'Dan Brown');
    expect(bash.viewAllRequest()).toHaveLength(1);
  });
});
describe("test suite for library admin", () => {
  it('returns request Handled', () => {
    var bash = new Admin('mark bashir');
    bash.addBook('The Lost Symbol', 'sci-fi', 'Dan Brown');
    bash.requestBook('The Lost Symbol', 'Dan Brown');
    expect(bash.handleRequest()).toMatch('request Handled');
  });
})
describe("test suite for library admin", () => {
  it('returns no request', () => {
    var bash = new Admin('mark bashir');
    bash.addBook('The Lost Symbol', 'sci-fi', 'Dan Brown');
    expect(bash.handleRequest()).toMatch('no request');
  });
})