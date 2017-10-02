var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var i18n=require("i18n-express");

var expressHbs = require('express-handlebars');
var index = require('./routes/index');
var mongoose = require('mongoose');




var app = express();

mongoose.connect('localhost:27017/shop');

// view engine setup
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/js',express.static(__dirname + '/node_modules/popper.js/dist'));
app.engine('.hbs', expressHbs({defaultLayout:'Layout', extname:'.hbs'}));
app.set('view engine', 'hbs');
app.use(i18n({
  translationsPath: path.join(__dirname, 'i18n'), // <--- use here. Specify translations files path.
  siteLangs: ["en","ru"],
  textsVarName: 'translation'
}));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
