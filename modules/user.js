var userDatabase=require('./../database/database.js').userDatabase;
generateUserID = require('../helper-functions/helper-functions.js').generateID;
var user=function(name,priority){
  
 this.name=name;
 this.priority=priority;
 this.userID=generateUserID();
 userDatabase.push({
name:this.name,
priority:this.priority,
userID:this.userID
 });

}