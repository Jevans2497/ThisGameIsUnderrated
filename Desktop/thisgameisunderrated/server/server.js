const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const tgiuGame = require('./tgiu-game');

const app = express()

const clientPath = `${__dirname}/../client`;
console.log(`Serving static from ${clientPath}`);

app.use(express.static(clientPath));

const server = http.createServer(app);

const io = socketio(server);

server.on('error', (err) => {
	consoler.error('Server error: ', err);
});

server.listen(8080, () => {
	console.log('RPS started on 8080');
});

let game = new tgiuGame();

io.on('connection', (socket) => {
	game.addPlayer(socket);
});