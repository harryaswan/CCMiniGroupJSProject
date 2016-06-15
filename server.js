var express = require('express');
var app = express();
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var url = "mongodb://localhost:27017/countries";

app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.post('/list', function(req, res) {
    var user = req.body.user;
    MongoClient.connect(url, function(err, db) {
        var collection = db.collection('bucket_list');
        collection.find({user: user}).toArray(function(err, docs) {
            res.json(docs);
            db.close();
        });
    });
});

app.post('/save', function(req, res) {
    var user = req.body.user;
    var country = req.body.country;
    MongoClient.connect(url, function(err, db) {
        var collection = db.collection('bucket_list');
        collection.update({user:user}, {$push:{list: element.trim()}}, {upsert:true});
        db.close();
    });
});

// app.get('/accounts', function (req, res) {
//     MongoClient.connect(url, function(err, db) {
//         var collection = db.collection('accounts');
//         collection.find({}).toArray(function(err, docs) {
//             res.json(docs);
//             db.close();
//         });
//     });
// });

app.use(express.static('client/build'));


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
