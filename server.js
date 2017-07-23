
"use strict"
var express = require('express');
var Search = require('bing.search');
var searchApi = require('./api/search.js');
var app = express();
var mongodb = require('./db')
var MONGODB_URI = 'mongodb://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+':'+process.env.DB_PORT+'/'+process.env.DB;

app.use(express.static('client'));
app.use('/api',searchApi);

mongodb.connect(MONGODB_URI,(err)=>{
  if(err) {
    console.log(err);
    process.exit(1)
  }
  else { 
  app.listen(process.env.PORT || 3000,process.env.IP || '0.0.0.0',()=>{
    console.log('server listening at '+process.env.PORT)
  })}
});






