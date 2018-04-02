const MongoClient = require('mongodb').MongoClient;
const link = "mongodb://localhost:27017/star_wars_quotes";
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
 var output = "<h1>All the quotes</h1>";
 for (var i = 0; i < result.length; i++) {
 output += "<div>"
 output += "<h3>" + result[i].Country + "</h3>"
 output += "<p>" + result[i].Identifier + "</p>"
  output += "<p>" + result[i].Suggestion + "</p>"
 output += "</div>"
 }
 res.send(output);
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
