Admin=require('./../modules/admin.js');
describe("test suite for library admin",()=>{
  it('returns true',()=>{
    bash=new Admin('mark bashir');
    expect(bash.addBook()).toBeDefined();
  });
 });
 describe("test suite for library admin",()=>{
  it('returns true',()=>{
    bash=new Admin('mark bashir');
    expect(bash.getBookID()).toBeDefined();
  });
 });