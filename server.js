const MongoClient = require('mongodb').MongoClient;
const link = "mongodb://localhost:27017/CultureWebApp"
const express = require('express');
const url = require('url');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
//Need this variable so that you can delete and find by Object _id
var ObjectId = require('mongodb').ObjectID;
//This is required if you want to use the files within the public folder
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser());
var db;
MongoClient.connect(link, function(err, database){
 if(err) throw err;
 db = database;
 app.listen(8080);
});
//Set the Engine to use the ejs format which is installed on the server
app.set('view engine', 'ejs');
//when the Default codio url for the server is used then render to index page
app.get('/', function(req, res) {
 res.render('pages/Index');
});
/* -----NAVIGATION-----*/
//When /Suggest is used then render the suggest page
app.get('/Suggest', function(req, res) {
 res.render('pages/Suggest');
});
//When /Login is used then render the Login page
app.get('/Login', function(req, res) {
 res.render('pages/Login');
});
//When /Register is used then render the Register page
app.get('/Register', function(req, res) {
 res.render('pages/Register');
});
//When /Contact is used then render the Contact page
app.get('/Contact', function(req, res) {
 res.render('pages/Contact');
});
//When /Admin is used then render the Admin page
app.get('/Admin', function(req, res) {
 res.render('pages/Admin');
});
//When /Mobile-index is used then render the Mobile page
app.get('/Mobile-index', function(req, res) {
 res.render('pages/Mobile-index');
});
/*-----AJAX-REQUEST-HANDLING-BY-PAGE-----*/
/*-----INDEX-----*/
//This request is a get , which is used by the map.js file to get the geojson information
//that is stored in here when a suggestion is apporved to add a new country to the map if
//applicable.
app.get('/mapinfo', function (req, res) {
db.collection('MapInfo').find().toArray(function(err,result){
   if(result)
   {
      res.jsonp(result);
      console.log(result);
   }
});
});
//Not used i think
app.get('/Country_Map', function(req, res) {
db.collection('MapInfo').distinct('properties', function(err, result) {
if (err) throw err;
res.jsonp(result);
});
});
//This request is used when the user clicks a marker to load the modal the country
//is fed into the request to get the relevent country information that is stored
//within the mongo db
app.post('/country', function(req, res) {
  console.log(JSON.stringify(req.body));
 db.collection('Country_Info').find(req.body).toArray(function(err, result) {
 if (err) throw err;
console.log(result);
res.jsonp(result);
 });
});
/*-----LOGIN-----*/
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
/*-----REGISTER-----*/
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
/*-----ADMIN-----*/
app.get('/Countries', function(req, res) {
 db.collection('suggest').distinct('Country', function(err, result) {
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
  var query = {"name":req.body.name};
  db.collection('Country_Info').find(query).toArray(function(err, result){
  if (err) throw err;
  console.log(result);
  var test = res.jsonp(result);
  console.log("im test",test.body);

//console.log("im result customs", result[0].customs);
if(result.length != 0){
  if(req.body.customs != null){
    if(result[0].customs == null){
      //var query = { _id: ObjectId(req.body._id) };
      var newvalues = { $set: {name: req.body.name, customs: req.body.customs, gestures: result[0].gestures, laws: result[0].laws, cultures: result[0].cultures} };
      db.collection('Country_Info').updateOne(query,newvalues, function(err, result){
      });

    }else {
      var cust_1 = req.body.customs;
      var cust_2 = result[0].customs;
      var cust = cust_2 + "New Custom:" + cust_1;
      //var cust = cust_1.concat(cust_2);
      var newvalues = { $set: {name: req.body.name, customs: cust, gestures: result[0].gestures, laws: result[0].laws, cultures: result[0].cultures} };
      db.collection('Country_Info').updateOne(query,newvalues, function(err, result){
      });

    }

  }else if(req.body.gestures != null){
    if(result[0].gestures == null){
      var newvalues = { $set: {name: req.body.name, customs: result[0].customs, gestures: req.body.gestures, laws: result[0].laws, cultures: result[0].cultures} };
      db.collection('Country_Info').updateOne(query,newvalues, function(err, result){
      });

    }else {

      var gest_1 = req.body.gestures;
      var gest_2 = result[0].gestures;
      var gest = gest_2 + "New Gesture:" + gest_1;
      //var cust = cust_1.concat(cust_2);
      var newvalues = { $set: {name: req.body.name, customs: result[0].customs, gestures: gest, laws: result[0].laws, cultures: result[0].cultures} };
      db.collection('Country_Info').updateOne(query,newvalues, function(err, result){
      });
    }

  }else if(req.body.laws != null){
    if(result[0].laws == null){
      var newvalues = { $set: {name: req.body.name, customs: result[0].customs, gestures: result[0].gestures, laws: req.body.laws, cultures: result[0].cultures} };
      db.collection('Country_Info').updateOne(query,newvalues, function(err, result){
      });
    }else {
      var laws_1 = req.body.laws;
      var laws_2 = result[0].laws;
      var laws = laws_2 + "New Laws:" + laws_1;
      //var cust = cust_1.concat(cust_2);
      var newvalues = { $set: {name: req.body.name, customs: result[0].customs, gestures: result[0].gestures, laws: laws, cultures: result[0].cultures} };
      db.collection('Country_Info').updateOne(query,newvalues, function(err, result){
      });

    }

  }else if(req.body.cultures != null)
  if(result[0].cultures == null){
    var newvalues = { $set: {name: req.body.name, customs: result[0].customs , gestures: result[0].gestures, laws: result[0].laws, cultures: req.body.cultures} };
    db.collection('Country_Info').updateOne(query,newvalues, function(err, result){
    });
  }else {
    var trad_1 = req.body.cultures;
    var trad_2 = result[0].cultures;
    var trad = trad_2 + "New Traditons:" + trad_1;
    //var cust = cust_1.concat(cust_2);
    var newvalues = { $set: {name: req.body.name, customs: result[0].customs, gestures: result[0].gestures, laws: result[0].laws, cultures: trad} };
    db.collection('Country_Info').updateOne(query,newvalues, function(err, result){
    });
  }
}else if(result.length == 0){
  console.log("im the data from the admin page", req.body);
  db.collection('Country_Info').save(req.body, function(err, result){
    if (err) throw err;
    console.log('cyka i work');
  });
}
});
/*
var query = { _id: ObjectId(req.body._id) };
var newvalues = { $set: {name: result.name, quote: req.body.newquote } };
db.collection('Country_Info').updateOne(query,newvalues, function(err, result){
});
*/
  /*db.collection('Country_Info').save(req.body, function(err, result){
    if (err) throw err;
    console.log('saved to database')*/
    db.collection('suggest').deleteOne({_id: ObjectId(req.body._id)}, function(err, result) {
    if (err) throw err;
    console.log("delete ffs");
    });
//  });
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
/*-----SUGGEST-----*/
app.post('/suggest', function(req, res){
	console.log('body: ' + JSON.stringify(req.body));
	//res.send(req.body);
  db.collection('suggest').save(req.body, function(err, result) {
  if (err) throw err;
  console.log('saved to database')
  res.redirect('/')
  })
});
