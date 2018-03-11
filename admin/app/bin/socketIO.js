#!/usr/bin/env node

/**
 * Module dependencies.
 */

const app = require('../../../admin'),
debug = require('debug')('app:server'),
http = require('http'),
fs = require('fs'),
urls = require('../urls').urls,
config = require('../config/config'),
modJSON = require('../modules/modJSON'),
quizData = require('../data/data'),
quizAudio = require('../data/audio'),
chalk = require('chalk');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || config.app.port);
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);
//var server = require('http').Server(app);
var io = require('socket.io')(server);
var SocketIOFileUpload = require('socketio-file-upload');

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}


//socket.io
io.sockets.on("connection", function(socket){
  console.log(chalk.blueBright('[socketio] '), chalk.greenBright('server listening'));

  socket.on('getData', function(i){
    socket.emit('quiz', {"quizData":quizData,"quizAudio":quizAudio});
  });
  socket.on('quiz', function(i){
    console.log('right: ' + i.right +' wrong: '+i.wrong );
    var score = {"right":i.right,"wrong":i.wrong}
    if ((quizData.user)===("dandan")){
      console.log("dandan");
      modJSON.path('./admin/app/data/data.json')
        .modify("dandanScore[multi]", score);
    } else if ((quizData.user)===("baobao")){
      console.log("baobao");
      modJSON.path('./admin/app/data/data.json')
        .modify("baobaoScore[multi]", score);
    } else{
      console.log("error")
    }

  });

  socket.on('subtract', function(i){
    console.log('right: ' + i.right +' wrong: '+i.wrong );
    var score = {"right":i.right,"wrong":i.wrong}
    if ((quizData.user)===("dandan")){
      console.log("dandan");
      modJSON.path('./admin/app/data/data.json')
        .modify("dandanScore["+i.type+"]", score);
    } else if ((quizData.user)===("baobao")){
      console.log("baobao");
      modJSON.path('./admin/app/data/data.json')
        .modify("baobaoScore["+i.type+"]", score);
    } else{
      console.log("error")
    }

  });

  socket.on('test', function(i){
    console.log('right: ' + i.right +' wrong: '+i.wrong );
    var score = {"right":i.right ,"wrong":i.wrong}
    if ((quizData.user)===("dandan")){
      console.log("dandan");
      modJSON.path('./admin/app/data/data.json')
        .modify("dandanScore[test]", score);
    } else if ((quizData.user)===("baobao")){
      console.log("baobao");
      modJSON.path('./admin/app/data/data.json')
        .modify("baobaoScore[test]", score);
    } else{
      console.log("error")
    }

  });

  socket.on('updateItems', function(i){
    console.log('output: ' + JSON.stringify(i.data));
    modJSON.path('./admin/app/data/data.json')
      .modify(i.mode, i.data);
    //io.emit('appSettings', {"aceTheme":i.aceTheme});
  });

  socket.on('changeMode', function(i){
    console.log('changeMode: ' + i.name);
    modJSON.path('./admin/app/data/data.json')
      .modify('mode', i.name);

  });

});
