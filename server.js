// To start the server, cd into the terminal directory for the project then type 'npm run dev'
const http = require('http');
const express = require('express');
const tgiuGame = require('./tgiu-game');
const RoomLogger = require('./room-logger.js')

const app = express();

const clientPath = `${__dirname}`;
console.log(`Serving static from ${clientPath}`);

const server = http.createServer(app);

app.use(express.static(clientPath));

const io = require('socket.io').listen(server);

server.on('error', (err) => {
	console.error('Server error: ', err);
});

let port = 80
server.listen(port, () => {
	console.log(`thisgame started on port ${port}`);
});

var gameRooms = [];

io.on('connection', (socket) => {

	//JOIN ROOM 
	socket.on("joinRoom", (room, player) => {
		let roomNames = gameRooms.map((gr) => gr.room)
		let grIndex = roomNames.indexOf(room); // Find index of room (by name) if it exists, else -1
		if (grIndex > -1) {
			//If the room already exists, join the room and add the player to the game
			let gameRoomToJoin = gameRooms[grIndex];
			socket.join(gameRoomToJoin.room); 
			gameRoomToJoin.game.addPlayer(socket);
		} else {
			//If the room does not exist, Create a new room and add it to the gamerooms array then join the room and add player
			let timestamp = Date.now()
			let newGR = new GameRoom(room);
			gameRooms.push(newGR);
			socket.join(newGR.room);
			newGR.game.addPlayer(socket);
			new RoomLogger().logRoomOnCreate(timestamp, room, player)
		}
	});

	//DISCONNECT
	socket.on('disconnect', () => {
		var indexOfGRToDelete;
		//Remove the player from their respective game
		gameRooms.forEach((gr) => {
			if (gr.game.players.map((p) => p.socket.id).includes(socket.id)) {
				gr.game.playerDisconnected(socket, gr.room);
				//If the room/game is empty now, close it and remove it from the gameRooms list
				if (gr.game.players.length <= 0) {
					indexOfGRToDelete = gameRooms.indexOf(gr.room);
				}
			}
		});
		//Avoid deleting the room while iterating cause that causes issues
		if (indexOfGRToDelete) {
			let timestamp = Date.now()
			let roomToDelete = gameRooms.pop(indexOfGRToDelete);
			new RoomLogger().logRoomOnClose(	
				timestamp,
				roomToDelete.room, 
				roomToDelete.roomOpenTime, 
				roomToDelete.game.currentWordCounter,
				roomToDelete.game.maxNumberOfPlayers);
		}
	});
});

class GameRoom {
	constructor(room) {
		this.room = room; // A string representing the name of the room
		this.game = new tgiuGame();
		this.roomOpenTime = Date.now();
		this.currentNumberOfPlayers = 1;
		this.maxNumberOfPlayers = 1;
	}
}