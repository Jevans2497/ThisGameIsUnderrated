// To start the server, cd into the terminal directory for the project then type 'npm run dev'

const http = require('http');
const express = require('express');
const tgiuGame = require('./tgiu-game');

const app = express();

const clientPath = `${__dirname}`;
console.log(`Serving static from ${clientPath}`);

const server = http.createServer(app);

app.use(express.static(clientPath));

const io = require('socket.io').listen(server);

server.on('error', (err) => {
	console.error('Server error: ', err);
});

server.listen(80, () => {
	console.log('thisgame started on 80');
});

var gameRooms = [];

io.on('connection', (socket) => {

	//JOIN ROOM 
	socket.on("joinRoom", (room) => {
		let roomNames = gameRooms.map((gr) => gr.room)
		let grIndex = roomNames.indexOf(room); // Find index of room (by name) if it exists, else -1
		if (grIndex > -1) {
			//Join the room and add the player to the game
			let gameRoomToJoin = gameRooms[grIndex];
			socket.join(gameRoomToJoin.room); 
			gameRoomToJoin.game.addPlayer(socket);
			console.log(`Joined existing room ${room}`)
		} else {
			//Create a new room and add it to the array then join the room and add player
			let newGR = new GameRoom(room);
			gameRooms.push(newGR);
			socket.join(newGR.room);
			newGR.game.addPlayer(socket);
			console.log(`Joined new room ${room}`)
		}
	});

	//DISCONNECT
	socket.on('disconnect', () => {
		var indexOfGRToDelete;
		//Remove the player from their respective game
		gameRooms.forEach((gr) => {
			if (gr.game.players.map((p) => p.socket.id).includes(socket.id)) {
				gr.game.playerDisconnected(socket);
				//If the room/game is empty now, close it and remove it from the gameRooms list
				if (gr.game.players.length <= 0) {
					console.log(`closing room ${gr.room}`);
					indexOfGRToDelete = gameRooms.indexOf(gr.room);
				}
			}
		});
		//Avoid deleting while iterating
		if (indexOfGRToDelete) {
			gameRooms.pop(indexOfGRToDelete);
		}
	});
});

class GameRoom {
	constructor(room) {
		this.room = room;
		this.game = new tgiuGame();
	}
}