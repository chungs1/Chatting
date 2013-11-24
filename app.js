var http = require('http');
var fs = require('fs');
var path = require('path');
var io = require('socket.io');

var httpServer = http.createServer(function(request, response) {
	var filePath = '.' + request.url;
	if(filePath == "./") {
		filePath = "./index.html";
	}
	var extension = path.extname(filePath);
	var contentType = 'text/html';

	switch(extension) {
		case '.js':
			contentType = 'text/javascript';
			break;
		case ".css":
			contentType = 'text/css';
			break;
	}

	fs.exists(filePath, function(existing) {
		if(existing) {
			fs.readFile(filePath, function(error, content) {
				if(error) {
					response.writeHead(500);
					response.end();
				} else {
					response.writeHead(200, {'Content-Type': contentType});
					response.end(content, 'utf-8');
				}
			});
		} else {
			response.writeHead(404);
			response.end();
		}
	});
}).listen(8000);

io = io.listen(httpServer);
//io.set('log level', 1);


var people = new Array();

io.sockets.on('connection', function(socket) {
	console.log("connected");
	socket.on('chat_message', function(data) {
		console.log("Message Received " + data);
		socket.broadcast.emit('chat_callback', data);
	});
})


/*var ws = require('ws');
var server = new ws.Server({port: 8000});

var rooms = {}

server.on('connection', function(connect) {
	console.log("connected");
	connect.id = makeId();
	connect.on("message", function(message) {
		var strMsg = message;
		message = JSON.parse(message);
		console.log(message.type);

		if(message.type == 'join') {
			joinRoom(message, connect);
		} else if (message.type == 'leave') {
			leaveRoom(message, connect);
		} else if (message.type == "sendChat") {
			sendMessage(message, connect);
		} else {
			connect.sent(JSON.stringify("LOL nub"));
		}
	});
});

function sendMessage(message, connect) {
	//appends the message you send to the chatbox

	for(var i = 0; i < connect.room.length; i++) {
		connect.room[i].send(message)
	}
}


function makeId() {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUBWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (var i = 0; i < 6; i++) {
		text += possble.charAt(Math.floor(Math.random() * possible.length));
	}

	return text;

}

function joinRoom(message, connect) {
	if (rooms[message.roomId] == undefined) {
		rooms[message.roomId] = [];
		var secondPerson;
		var set = false;
	}

	rooms[message.roomId].push(connect);
	connect.room = rooms[message.roomId];
	connect.isHost = message.isHost;

	if(!connect.isHost && !set) {
		set = true;
		secondPerson = connect.id;
		console.log("second person: " + secondPerson);
		emitNext(secondPerson, connect);
	}
	console.log(connect.id + " joined " + connect.room);
	connect.send(JSON.stringify({type:'id', id: connect.id, second:secondPerson,}));
	console.log("Host? " + connect.isHost);
}


function leaveRoom(message, connect) {
	message.who = connect.id;
	if (message.who == secondPerson) {
		secondPerson = undefined;
	}
	broadcast(message, connect);
	connect = undefined;
}

function broadcast(message, connect) {
	for (var i = 0; i < connect.room.length; i++) {
		connect.room[i].send(JSON.stringify(message));
	};
}

function emitNext(second, connect) {
	broadcast({type: 'second', other: second}, connect);
}

process.on('uncaughtException', function(exception) {
	//handle/ignore
})*/