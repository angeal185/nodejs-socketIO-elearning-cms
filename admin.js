const express = require('express'),
SocketIOFileUpload = require('socketio-file-upload'),
path = require('path'),
bodyParser = require('body-parser'),
config = require('./admin/app/config/config'),
minifyOutput = require('./admin/app/modules/minifyOutput'),
nunjucks = require('nunjucks'),
index = require('./admin/app/routes/index');

// view engine setup
app.set('view engine', 'njk');

//init nunjucks
nunjucks.configure('admin/views', {
  autoescape: false,
  trimBlocks: true,
  lstripBlocks: true,
  express: app
});

nunjucks.installJinjaCompat();

if (config.app.minifyOutput === true) {
	app.use(minifyOutput);
}
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'admin/public')));

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
