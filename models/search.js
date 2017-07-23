var db = require('../db');
exports.save = function(doc){
  var collection = db.get().collection('history');
  collection.insertOne(doc,{w:1},(err,r)=>{
    if(err) throw err;
    console.log(r)
  })
}
exports.recent = function(n,cb){
  var collection = db.get().collection('history');
 collection.find().sort({'timestamp':-1}).limit(n).toArray((err,docs)=>{
   cb(err,docs)
 })
}