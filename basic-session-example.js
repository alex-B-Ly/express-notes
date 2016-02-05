var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();
var PORT = 8080;

function myLoggingMiddleware(req, res, next){
    var url = req.url;
    var method = req.method;

    console.log("%s request to the page %s", method, url);
    next();
}

app.use(bodyParser.urlencoded({ extended: false }));

app.use(myLoggingMiddleware);

app.use(
    session(
        {
            secret: "my super secret",
            cookie: { maxAge: 10000 },
            saveUninitialized: true,
            resave: false
        }
    )
);

app.get('/', function(req, res, next){
    var sess = req.session

    if(sess.views){
        sess.views++;
        res.end("You viewed this page " + sess.views + " times");
    } else {
        sess.views = 1;
        res.end("Your first visit to this page.");
    }
});

app.get('/login', function(req, res) {
  res.sendFile(process.cwd() + '/views/login.html');
});

app.get('/account', function(req, res) {
  res.sendFile(process.cwd() + '/views/account.html');
});

app.get('/login', function(req, res) {
  res.sendFile(process.cwd() + '/views/login.html');
});

app.post('/login', function(req, res) {
    // Check to make sure they are an authenticate user
    // if they are
    console.log(req.body);
    if (req.body.password == "TOPSECRETPASSWORD" ){
            res.redirect("/account");
    } else {
            res.redirect("/login");
    }
});

app.listen(PORT, function() {
  console.log('App listening on port %s', PORT);
});