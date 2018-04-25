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
//This post request is used to get the username and password fields from the login page,
//then check them against the ones retrieved from the database, if returns null then then
//account doesnt exist.
app.post("/login", function(req, res){
  console.log(req.body);
  //Find entry where username and password = register page login and password
  db.collection("userdetails").find( { $and: [ {"username": req.body.username},{"password": req.body.password}]}).toArray(function(err, result) {
    if (err) throw err;
      res.jsonp(result);
      console.log(result);
      //if something is returned then the account exists
      if (result.length > 0){
        console.log("logged in");
      }
      //if not then the account doesn't exist
      else{
        console.log("log in unsuccesfull");
      }
      //squiggly boi
});
});
/*-----REGISTER-----*/
//This post request gets the email , username and password from the register page
//then checks if the username or email is already taken.
app.post('/register', function(req, res){
console.log(req.body);
//db.inventory.find( { $or: [ { quantity: { $lt: 20 } }, { price: 10 } ] } )
  db.collection("userdetails").find( { $or: [ {"username": req.body.username},{"email": req.body.email}]}).toArray(function(err, result) {
    if (err) throw err;
    //post result back to the user as required for checking if the email is taken
      res.jsonp(result);
      console.log(result);
      //if result is more than 0 then the username or email is already taken
      if (result.length > 0){
        console.log("username taken gadjee");
      }
      else{
        //if the result is 0 then add the user to the database , the validation is
        //done on the register page when they are entering the data
        db.collection('userdetails').save(req.body, function(err, result) {
        if (err) throw err;
        console.log('saved to database');
        })
      }

  });
});
/*-----ADMIN-----*/
//This request gets called when the admin page loads and returns the distinct
//countries that have a suggestion about them
app.get('/Countries', function(req, res) {
  //find distinct country so if theire is two suggestions for greece then only
  //one greece will be returned
 db.collection('suggest').distinct('Country', function(err, result) {
 if (err) throw err;
//parse result back to the admin page to load the dropdown menu properly.
res.jsonp(result);
 });
});
//This request gets called from the admin page after the user picks a country
//from the dropdown, it gets the country name from the page then searches the
//suggest collection to find the suggestion
app.post('/Suggestion', function(req, res) {
  //just check that it is returning a value and what the value is
  console.log(JSON.stringify(req.body));
  //search suggest by the name gotten from the admin page
 db.collection('suggest').find(req.body).toArray(function(err, result) {
 if (err) throw err;
console.log(result);
//parse result back to the page so the sugestions can be approved/rejected
res.jsonp(result);
 });
});
//If the admin picks to reject then this is called, this will get the id
//from the request then delete the suggestion where the object id = the
//id of the suggestion rejected
app.post('/delete', function(req, res) {
  console.log(req.body._id);
//  console.log(query);
//delete the suggestion where the object id = request _id retrieved from the page
 db.collection('suggest').deleteOne({_id: ObjectId(req.body._id)}, function(err, result) {
 if (err) throw err;
 console.log("delete stuff");
 //feedback
 res.jsonp("deleted");
 });
});
//This is probably the most complicated requst , this is responsable for when a suggestion
//is approved , finding if a suggestion for that country already exists then it will add to it
//then if it doesnt exist then it will just create the suggestion, if there are no suggestions for
//that country then it will just create the record in the database,
app.post('/verified', function(req, res) {
  console.log(req.body);
  //set a variable for the request name in the json format for mongo db
  var query = {"name":req.body.name};
  //find if the country already exists
  db.collection('Country_Info').find(query).toArray(function(err, result){
  if (err) throw err;
  //log result
  console.log(result);
  //something stilly i thought would work
  var test = res.jsonp(result);
  console.log("im test",test.body);

//If statement so if the result is null then it won't break, then if else
//it will just create the record. The else is far down the page :P
if(result.length != 0){
  //If the result isn't null then check if the suggestion approved is customs
  //Will only comment this one, this is the exact same for gestures, cultures
  //and laws as it was for everything inside the if below, would be alot of
  //comments
  if(req.body.customs != null){
    //if the suggestion is for customs then it checks if the country already has
    //customs information
    if(result[0].customs == null){
      /*if the country doesn't have customs information , but it has a record for
      something else it will set the variable for the update, which will use
      the name from the request which is the country name, then it will use
      the customs from the request but will for the other fields it will use the
      ones retrieved from the query above*/
      var newvalues = { $set: {name: req.body.name, customs: req.body.customs, gestures: result[0].gestures, laws: result[0].laws, cultures: result[0].cultures} };
      //mongo query for using the suggestion to update the record for the country
      //feed in the country anme then feed in the variable defined above
      //update needs all the information, if you just had the new suggestion it
      //would just have name and customs
      db.collection('Country_Info').updateOne(query,newvalues, function(err, result){
      });
    //if the Customs retrieved from the mongo db isn't null
    }else {
      //set variable 1 to the customs retrieved from the request
      var cust_1 = req.body.customs;
      //set variable 2 to the customs from the database
      var cust_2 = result[0].customs;
      //concatenate them with the original first, then a seperator , then the
      //newly approved customs
      var cust = cust_2 + "New Custom:" + cust_1;
      /*Much like the other variable this one will use the request country name
      then for the customs it will use the concateneated variable from above, then
      for the other values it will use the results from the mongo db query, so the ones
      that already exist*/
      var newvalues = { $set: {name: req.body.name, customs: cust, gestures: result[0].gestures, laws: result[0].laws, cultures: result[0].cultures} };
      //execute the query to update the record for the country with the customs merged together
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
    console.log('i work');
  });
}
});
    //after the suggestion is use to update the existing record for the country
    //or create a new one this will delete it from the suggest collection
    //where the obejct id = request _id, so that there is no clutter
    db.collection('suggest').deleteOne({_id: ObjectId(req.body._id)}, function(err, result) {
    if (err) throw err;
    console.log("deleted");
    });
//  });
});
//This request is used to when the suggestion is approved, the update.js file runs
//if the country does NOT exist then it will create the geojson for the marker for
//that country then add it to the mongo db
app.post('/savefile', function(req, res){
	console.log(JSON.stringify(req.body));
  //save the new marker information to the mongo db
  db.collection('MapInfo').save(req.body, function(err, result) {
  if (err) throw err;
  console.log('saved to database')
  //redirect to home page.
  res.redirect('/')
});
        console.log("wot");
    });
/*-----SUGGEST-----*/
//This handles the request from the suggest page, which for each suggestion
//takes it and inserts it into the mongo db
app.post('/suggest', function(req, res){
	console.log('body: ' + JSON.stringify(req.body));
  //query for taking the suggestion from the request then saving it into the database
  db.collection('suggest').save(req.body, function(err, result) {
  if (err) throw err;
  //log feedback to ensure it work
  console.log('saved to database')
  //redirect
  res.redirect('/')
  })
});
