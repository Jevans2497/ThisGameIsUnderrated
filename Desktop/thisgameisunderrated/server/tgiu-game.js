class tgiuGame {

	constructor() {
		this.players = [];
		this.currentWord = "";
		this.words = [];
		this.currentWordCounter = 0;
	}

	addPlayer(socket) {
		let player = new Player(socket)
		console.log(`New player added ${this.players.length + 1}`);
		player.socket.on('buttonClicked', (button) => {
			player.buttonSelected = button;
			this.buttonClicked(button);
		});
		this.players.push(player);
		this.loadWord();
	}

	buttonClicked(button) {
		//Tell client to disable buttons
		if (this.allPlayersHaveChosen()) {
			this.showResults();
		}
	}

	allPlayersHaveChosen() {
		var somePlayerUndecided = false;
		this.players.forEach((player) => {
			if (player.buttonSelected == null) {
				somePlayerUndecided = true;
			}
		});
		return !somePlayerUndecided;
	}

	showResults() {
		this.getNewWord();
		this.loadWord();
	}

	loadWord() {
		if (this.currentWord == "") {
			this.getNewWord();
		}
		this.players.forEach((player) => {
			player.socket.emit('message', this.currentWord);
		});
	}

	getNewWord() {
		if (this.words.length <= 0) {
			this.makeWords();
			this.currentWordCounter = -1;
		}
		this.currentWordCounter += 1;
		this.currentWord = this.words[this.currentWordCounter]
	}

	makeWords() {
		this.words = ['random1', 'list2', 'of3', 'words4', 'boop5'];
		this.shuffle(this.words);
	}

	shuffle(array) {
	  var currentIndex = array.length, temporaryValue, randomIndex;

	  while (0 !== currentIndex) {

	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;

	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	  }

	  return array;
	}
}

class Player {
	constructor(socket) {
		this.socket = socket
		this.buttonSelected = null;
	}
}

module.exports = tgiuGame;