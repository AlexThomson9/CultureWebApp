const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/star_wars_quotes";
const express = require('express');
var fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser());
var db;
MongoClient.connect(url, function(err, database){
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
	console.log(req.body);
  var body ="";
	//res.send(req.body);
  filePath = __dirname + '/public/map.geojson';
    req.on('data', function(data) {
        body += data;
        console.log("wot");
    });

    req.on('end', function (){
        fs.appendFile(filePath, body, function() {
            respond.end();
            console.log("plswork");
        });
    });

  });
