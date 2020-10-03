class RPSGame {

	constructor(p1, p2) {
		this.players = [p1, p2];
		this.turns = [];
		this.sendToPlayers('RPSGame Start!');
		this.players.forEach((player, index) => {
			player.on('turn', (turn) => {
				this.onTurn(index, turn);
			});
		});
	}

	sendToPlayers(msg) {
		this.players.forEach((player) => {
			player.emit('message', msg);
		});
	}

	sendToPlayer(playerIndex, msg) {
		this.players[playerIndex].emit('message', msg);
	}

	onTurn(playerIndex, turn) {
		this.turns[playerIndex] = turn;
		this.sendToPlayer(playerIndex, `You selected ${turn}`);

		this.checkGameOver()
	}

	checkGameOver() {
		const turns = this.turns;
		if (turns[0] && turns[1]) {
			this.getGameResult();
			this.turns = [null, null];
			this.sendToPlayers('Next Round!!!');
		}
	}

	getGameResult() {
		const p0 = this.decodeTurn(this.turns[0]);
		const p1 = this.decodeTurn(this.turns[1]);

		const distance = (p0 - p1 + 3) % 3;
		switch(distance) {
			case 0:
				this.sendToPlayers("Draw");
				break;
			case 1:
				this.sendWinMessage(this.players[0], this.players[1]);
				break;
			case 2:
				this.sendWinMessage(this.players[1], this.players[0]);
				break;
		}
	}

	sendWinMessage(winner, loser) {
		winner.emit('message', 'You Won!');
		loser.emit('message', "You Lost.");
	}

	decodeTurn(turn) {
		switch(turn) {
			case 'rock': 
				return 0;
			case 'paper': 
				return 1;
			case 'scissors': 
				return 2;
			default:
				throw new Error(`Could not decode turn ${turn}`);
		}
	}
}

module.exports = RPSGame;