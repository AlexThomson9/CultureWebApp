const MongoClient = require('mongodb').MongoClient;
const link = "mongodb://localhost:27017/star_wars_quotes";
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

app.get('/all', function(req, res) {
 db.collection('suggest').find().toArray(function(err, result) {
 if (err) throw err;
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
  db.collection('suggest').find(req.body).toArray(function(err, result) {
  if (err) throw err;
 console.log(result);
  db.collection('Country_Info').save(result, function(err, result){
    if (err) throw err;
    console.log('saved to database')
    db.collection('suggest').deleteOne(req.body, function(err, result) {
    if (err) throw err;
    console.log("delete ffs");
    });
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

app.get('/Country_Map', function(req, res) {
 db.collection('MapInfo').distinct('properties', function(err, result) {
 if (err) throw err;
res.jsonp(result);
 });
});
