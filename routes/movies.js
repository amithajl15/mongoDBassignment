var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var request = require('request');
var fdata = {};
var udata = {};
var movie = require("./movieschema");
// mongoose.connect('mongodb://localhost/users');
//
// var db = mongoose.connection;
// var collection = db.collection('users');
// db.on("error", console.error.bind(console, "Connection Error:"));
// db.open('open', function(){

router.get('/', function (req, res) {


     movie.find(function(err, data){

   fdata = data;
 //  console.log(db);
 console.log(fdata.Title);
    res.send(fdata);
 });

// db.close();
});


router.post('/', function(req, res, next) {

    var mname=req.body.mname;
    var murl="http://www.omdbapi.com/?t="+mname+"&y=&plot=short&r=json";
      console.log(murl);
    request(murl, function(err, resp, body) {

     body = JSON.parse(body);

     var obj=new movie(body);
     console.log("obj"+obj);
  //movie.save(body, function(err, result) {
  obj.save( function(err){
       if (err)
         console.log(err);

       //res.send(res1.Title+" movie  record Inserted");
      // res.end();
     });
  res.send(obj.Title+" Inserted");
//  });


  });
  });

  router.post('/series', function(req, res, next) {

      var mname=req.body.mname;
      var murl="http://www.omdbapi.com/?s="+mname+"&y=&plot=short&r=json";
        console.log(murl);
      request(murl, function(err, resp, body) {
if(err)res.send(err);
      body = JSON.parse(body);

      // var obj=new movie(body);
       console.log(body);

  res.send(body);
       });

  });




  router.post('/add/:title', function(req, res, next) {
    var queryString = new String(req.url);
      var arr = queryString.split("/");

     var stitle = new String(arr[2].split("=")[1] || "0");
     var murl="http://www.omdbapi.com/?t="+stitle+"&y=&plot=short&r=json";
       console.log(murl);
     request(murl, function(err, resp, body) {

      body = JSON.parse(body);

      var obj=new movie(body);
      console.log("obj"+obj);
   //movie.save(body, function(err, result) {
   obj.save( function(err){
        if (err)
          console.log(err);

      });
   res.send(obj.Title+" Inserted");
 //  });


   });

  });

  router.delete('/', function(req, res, next) {

      var mname=req.body.mname;
      movie.remove( { Title : mname },function(err, result) {
      res.send("Deleted");

});
});
router.put('/', function(req, res, next) {
  var mname1=req.body.mname1;
    var mname2=req.body.mname2;

  //        movie.find({Title:"Avatar"},function(err, data){
  //      udata = data.Title;
  //  console.log(udata);
  // //console.log(fdata[Year]);
  // //res.send(fdata[Year]);
  //    });movie.findOneAndUpdate(query, { $set: { Title: 'akasmika'  }});

  // movie.findById("57831d0c56c3cfd504bc55d5", function (err, doc) {
  //   if (err) console(err);
  //   doc.Title = 'ABCD';
  //   doc.save(callback);
  // });



    movie.update(
   { Title: mname1 },
   {
      $set:{Title: mname2,Year:"1994" }

   },function(err,result){
     console.log("updated");
   }

)
res.send("Updated");
     });

module.exports = router;
