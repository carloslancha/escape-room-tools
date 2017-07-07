var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('dist'));

server.listen(8080, function() {
	console.log("Server running in http://localhost:8080");
});