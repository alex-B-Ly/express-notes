var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var PORT = 8080;

// This is the bodyParser middleware
// app.use(bodyParser.urlencoded({ extended: false }));

app.get('/login', function(req, res) {
  res.sendFile(process.cwd() + '/views/login.html');
});

app.get('/help', function(req, res) {
  res.sendFile(process.cwd() + '/views/help.html');
});

app.post('/login', function(req, res) {
  console.log(req.body);
});

app.listen(PORT, function() {
  console.log('App listening on port %s', PORT);
});
