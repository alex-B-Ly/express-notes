var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var PORT = 8080;

function myLoggingMiddleware(req, res, next){
  var url = req.url;
  var method = req.method;

  console.log('%s request at %s',  method, url);
  next();
}

// This is the bodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));

app.use(myLoggingMiddleware);

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
})

app.get('/login', function(req, res) {
  res.sendFile(process.cwd() + '/views/login.html');
});

app.get('/account', function(req, res) {
  res.sendFile(process.cwd() + '/views/account.html');
});

app.post('/login', function(req, res) {
    // Check to make sure they are an authenticate user
    var emailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    console.log(req.body);
    if (req.body.email.match(emailRegex)){
            res.redirect("/account");
    } else {
            res.redirect("/login");
    }

});

app.listen(PORT, function() {
  console.log('App listening on port %s', PORT);
});
