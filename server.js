const MongoClient = require('mongodb').MongoClient;
const link = "mongodb://localhost:27017/CultureWebApp"
const express = require('express');
const url = require('url');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
var ObjectId = require('mongodb').ObjectID;
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser());
var db;
MongoClient.connect(link, function(err, database){
 if(err) throw err;
 db = database;
 app.listen(8080);
});
app.set('view engine', 'ejs');
app.get('/', function(req, res) {
 res.render('pages/Index');
});

/* -----NAVIGATION-----*/
app.get('/Suggest', function(req, res) {
 res.render('pages/Suggest');
});
app.get('/Login', function(req, res) {
 res.render('pages/Login');
});
app.get('/Register', function(req, res) {
 res.render('pages/Register');
});
app.get('/Contact', function(req, res) {
 res.render('pages/Contact');
});
app.get('/Admin', function(req, res) {
 res.render('pages/Admin');
});
app.get('/Mobile-index', function(req, res) {
 res.render('pages/Mobile-index');
});
/*-----AJAX-REQUEST-HANDLING-BY-PAGE-----*/
/*-----INDEX-----*/
/*-----LOGIN-----*/
/*-----REGISTER-----*/
/*-----ADMIN-----*/
/*-----SUGGEST-----*/
app.get('/Countries', function(req, res) {
 db.collection('suggest').distinct('Country', function(err, result) {
 if (err) throw err;
res.jsonp(result);
 });
});
app.post('/country', function(req, res) {
  console.log(JSON.stringify(req.body));
 db.collection('Country_Info').find(req.body).toArray(function(err, result) {
 if (err) throw err;
console.log(result);
res.jsonp(result);
 });
});
app.get('/all', function(req, res) {
 db.collection('suggest').find().toArray(function(err, result) {
 if (err) throw err;
res.jsonp(result);
 });
});

app.post('/Suggestion', function(req, res) {
  console.log(JSON.stringify(req.body));
 db.collection('suggest').find(req.body).toArray(function(err, result) {
 if (err) throw err;
console.log(result);
res.jsonp(result);
 });
});
app.post('/delete', function(req, res) {
  console.log(req.body._id);
//  console.log(query);
 db.collection('suggest').deleteOne({_id: ObjectId(req.body._id)}, function(err, result) {
 if (err) throw err;
 console.log("delete stuff");
 res.jsonp("deleted");
 });
});

app.post('/verified', function(req, res) {
  console.log(req.body);
  db.collection('Country_Info').find(req.body.name).toArray(function(err, result){
  if (err) throw err;
  console.log(result);
  var test = jsonp(result);
  if(result.laws == null){


    console.log("laws is null");
  }


});
/*
var query = { _id: ObjectId(req.body._id) };
var newvalues = { $set: {name: result.name, quote: req.body.newquote } };
db.collection('Country_Info').updateOne(query,newvalues, function(err, result){




});
*/

  db.collection('Country_Info').save(req.body, function(err, result){
    if (err) throw err;
    console.log('saved to database')
    db.collection('suggest').deleteOne({_id: ObjectId(req.body._id)}, function(err, result) {
    if (err) throw err;
    console.log("delete ffs");
    });
  });

});



app.post('/suggest', function(req, res){
	console.log('body: ' + JSON.stringify(req.body));
	//res.send(req.body);
  db.collection('suggest').save(req.body, function(err, result) {
  if (err) throw err;
  console.log('saved to database')
  res.redirect('/')
  })
});
app.post('/savefile', function(req, res){
	console.log(JSON.stringify(req.body));
  db.collection('MapInfo').save(req.body, function(err, result) {
  if (err) throw err;
  console.log('saved to database')
  res.redirect('/')
});

        console.log("wot");
    });
  app.get('/mapinfo', function (req, res) {
  db.collection('MapInfo').find().toArray(function(err,result){
     if(result)
     {
        res.jsonp(result);
        console.log(result);
     }
  });
});
app.get('/Country_Map', function(req, res) {
 db.collection('MapInfo').distinct('properties', function(err, result) {
 if (err) throw err;
res.jsonp(result);
 });
});



app.post('/register', function(req, res){
console.log(req.body);
//db.inventory.find( { $or: [ { quantity: { $lt: 20 } }, { price: 10 } ] } )
  db.collection("userdetails").find( { $or: [ {"username": req.body.username},{"email": req.body.email}]}).toArray(function(err, result) {
    if (err) throw err;
      res.jsonp(result);
      console.log(result);

      if (result.length > 0){
        console.log("username taken gadjee");
      }
      else{
        db.collection('userdetails').save(req.body, function(err, result) {
        if (err) throw err;
        console.log('saved to database');
        })
      }

  });
});

  app.post("/login", function(req, res){
    console.log(req.body);
    db.collection("userdetails").find( { $and: [ {"username": req.body.username},{"password": req.body.password}]}).toArray(function(err, result) {
      if (err) throw err;
        res.jsonp(result);
        console.log(result);

        if (result.length > 0){
          console.log("logged in");
        }
        else{
          console.log("log in unsuccesfull");
        }
        //squiggly boi
  });
});
