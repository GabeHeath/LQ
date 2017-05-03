var express = require('express');
var app     = express();
var http    = require('http').Server(app);
var io      = require('socket.io')(http);

io.on('connection', function(socket) {
	console.log("We have a socket connection!");
	socket.on('room', function(room) {
		socket.join(room);
	});
});

http.listen('3000', function() {
	console.log("We are connected!")
});

app.use('/app', express.static(__dirname + '/app'));
app.get('/', function(req, res){
  res.sendFile(__dirname + "/index.html");
});