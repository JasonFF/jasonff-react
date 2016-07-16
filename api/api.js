var path = require('path');

var express = require('express');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var routes = require('./routes/index');
var settings = require('./settings.js');

var fs = require('fs');
var accessLog = fs.createWriteStream('access.log', {
  flags: 'a'
});
var errorLog = fs.createWriteStream('error.log', {
  flags: 'a'
});

var app = express();

app.set('port', process.env.PORT || 3030);
app.use(morgan('combined',{
  stream: accessLog
}));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(session({
  secret: settings.cookieSecret,
  key: settings.db, //cookie name
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 30
  }, //30 days
  store: new MongoStore({
    url: 'mongodb://localhost/myblog'
  })
}));

routes(app);

app.use(function(err, req, res, next) {
  var meta = '[' + new Date() + '] ' + req.url + '\n';
  errorLog.write(meta + err.stack + '\n');
  next();
});

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
