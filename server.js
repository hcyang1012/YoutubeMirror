var express = require('express');
var videoapp = express();
var remoteapp = express();

var http1 = require('http').Server(videoapp);
var io1 = require('socket.io')(http1);

var videoid = "";

videoapp.get('/',function(req, res){
  res.sendFile(__dirname + '/youtube.html');
});

io1.on('connection', function(socket){
});

http1.listen(3000, function(){
  console.log('server on!');
});

var http2 = require('http').Server(remoteapp);
var io2 = require('socket.io')(http2);

remoteapp.get('/',function(req, res){
  res.sendFile(__dirname + '/client.html');
});

var count=1;
io2.on('connection', function(socket){
  socket.on('send message', function(text){
    videoid = text;
    console.log(videoid);
    io1.emit('receive message', videoid);
  });
});

http2.listen(8080, function(){
  console.log('remote controller on!')
})