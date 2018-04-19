const MongoClient = require('mongodb').MongoClient;
const link = "mongodb://localhost:27017/CultureWebApp"
const express = require('express');
const url = require('url');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser());
var db;
MongoClient.connect(link, function(err, database){
 if(err) throw err;
 db = database;
 app.listen(8080);
});

app.get('/all', function(req, res) {
 db.collection('suggest').find().toArray(function(err, result) {
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

/*app.post('/quotes', function (req, res) {
  console.log(req.body);
 db.collection('quotes').save(req.body, function(err, result) {
 if (err) throw err;
 console.log('saved to database')
 res.redirect('/')
 })
})*/

app.post('/delete', function(req, res) {
 db.collection('suggest').deleteOne(req.body, function(err, result) {
 if (err) throw err;
 res.redirect('/');
 });
});

app.post('/verified', function(req, res) {
  db.collection('suggest').find(req.body).toArray(function(err, result) {
  if (err) throw err;
 console.log(result);
  db.collection('Country_Info').save(result, function(err, result){
    if (err) throw err;
    console.log('saved to database')
    res.redirect('/')
  });
  });
 db.collection('suggest').deleteOne(req.body, function(err, result) {
 if (err) throw err;
 res.redirect('/');
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

/*app.post('/savefile', function(req, res){
	console.log(req.body);
  var body ="";
	//res.send(req.body);
  filePath = 'public/map.geojson';
    //req.on('newData', function(newData) {
        //body += req.body;
        console.log("wot");
    //});

   //req.on('end', function (){
  console.log(req.body.newData);


        fs.writeFile(filePath, req.body.newData,  {'flag':'a'},  function(err) {
    if (err) {
        return console.error(err);
    }
});
//    });

  });
*/

  app.get('/mapinfo', function (req, res) {
  db.collection('MapInfo').find().toArray(function(err,result){
     if(result)
     {
        res.jsonp(result);
        console.log(result);
     }
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
