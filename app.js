var express = require('express');
var app = express();

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
// app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
//   extended: true
// })); 

// app.use(express.json()); 

var pg = require('pg');
var connectionString = 'postgres://dbAdmin:asdfasdf@mhdbinstance.cyvr2owy5pvv.eu-west-1.rds.amazonaws.com:5432/lfs';

app.get('/test', function (req, res) {
  res.send('Hello World!');
});

// app.use(express.static('/app'));
app.use('/lfs', express.static(__dirname + '/app'));


app.get('/requestList', function(req, res) {
    var results = [];
    console.log('Get a Postgres client from the connection pool');
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT request_id, request_user, model FROM lfs_request");

        // Stream results back one row at a time
        query.on('row', function(row) {
            console.log('id: "%d" user:"%s" model:"%s"', row.request_id, row.request_user, row.model);
            results.push(row);
        });
        

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

    });

});

app.post('/requestList', function(req, res) {
    var results = [];
    console.log('Get a Postgres client from the connection pool');
    // console.log(req);
    console.log(req.body);
    var data = req.body;
    // var data = {"text": req.body.text, "complete": false};

    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("INSERT INTO lfs_request(model, request_user) VALUES ($1, $2)", [data.model, data.request_user]);

      // SQL Query > Select Data
        var query = client.query("SELECT request_id, request_user, model FROM lfs_request");

        // Stream results back one row at a time
        query.on('row', function(row) {
            console.log('id: "%d" user:"%s" model:"%s"', row.request_id, row.request_user, row.model);
            results.push(row);
        });
        

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

    });

});

app.listen(8080, function () {
  console.log('Example app listening on port 3000!');
});