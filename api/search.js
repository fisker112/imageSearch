var express = require('express');
const searchApi = express.Router();
const search = require('node-bing-api')({accKey:process.env.KEY});
const model = require('../models/search.js');

searchApi.get('/:query',(req,res)=>{
  let query = req.params.query,
      offset = req.query.offset,
      timestamp = Date.now();
      
  //search user query
  search.images(query,{count:10,offset:offset | 0},(err,response,results)=>{
    if(err){res.status(500).json(err)}
    else {
      let n = results.value.length;
      let bdy = results.value
      let obj = [];
      for (let i = 0;i<n;i++){
        obj[i]={
          url:bdy[i].contentUrl,
          name:bdy[i].name,
          thumbnail:bdy[i].thumbnailUrl,
          context:bdy[i].hostPageUrl
        }
      };
      
      model.save({query:query,timestamp:timestamp});      
      res.status(200).json(obj)
    }
  })
  
});
searchApi.get('/imgsearch/latest',(req,res)=>{
  
  model.recent(10,(err,docs)=>{
    console.log(docs)
    if(err) throw err;
    else res.json(docs.map(parse));
  })
});

function parse(item){
  let date = new Date(item.timestamp);
  return {
    query:item.query,
    time:date.toISOString()
  }
}

module.exports = searchApi;