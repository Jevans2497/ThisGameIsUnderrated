class tgiuGame {

	constructor() {
		this.players = [];
		this.currentWord = "";
		this.words = [];
		this.queueWords = [];
		this.currentWordCounter = 0;
	}

	addPlayer(socket) {
		socket.on('name', (name) => {
			this.name = name;
			let player = new Player(socket, name);
			console.log(`New player added: ${player.name}`);
			this.setupSocketEvents(player);
			this.players.push(player);
			this.loadWord();
			this.updatePlayerList()
		});
	}

	playerDisconnected(socket) {
		var sockets = this.players.map((p) => p.socket.id);
		var indexOfSocket = sockets.indexOf(socket.id);
		if (indexOfSocket > -1) {
			console.log(`${this.players[indexOfSocket].name} disconnected`);
  			this.players.splice(indexOfSocket, 1);
		}
		this.updatePlayerList();
		this.updateDecidedPlayers();
	}

	setupSocketEvents(player) {
		player.socket.on('buttonClicked', (button) => {
			player.buttonSelected = button;
			this.buttonClicked(button);
		});
		player.socket.on('newRound', () => {
			this.startNextRound();
		});
		player.socket.on("addToQueue", (wordToAdd) => {
			this.queueWords.push(wordToAdd);
		})
	}

	updatePlayerList() {
		var playerNames = this.players.map((player) => player.name)
		this.players.forEach((player) => {
			player.socket.emit('updateNamesList', playerNames)
		})
	}

	updateDecidedPlayers() {
		var decidedPlayers = this.players.filter(player => player.buttonSelected != null).map((player) => player.name);
		this.players.forEach((player) => {
			player.socket.emit("playerDecided", decidedPlayers);
		});
	}

	buttonClicked(button) {
		this.updateDecidedPlayers();
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
		var countArr = this.countPlayerChoices();
		var resultsArr = this.convertCountsToResults(countArr);
		var playersChoicesDict = this.makePlayersChoicesDict();
		this.players.forEach((player) => {
			player.socket.emit('results', resultsArr);
			player.socket.emit('nameAndShame', playersChoicesDict);
			player.socket.emit('showNewWordButton');
		});
	}

	makePlayersChoicesDict() {
		//A dictionary mapping each button to who chose it. Allows displaying it to all users 
		var playerChoices = {};
		this.players.forEach((player) => {
			if (playerChoices[player.buttonSelected]) {
				playerChoices[player.buttonSelected].push(player.name);
			} else {
				playerChoices[player.buttonSelected] = [player.name];
			}
		});
		return playerChoices;
	}

	countPlayerChoices() {
		var underratedCount = this.players.filter((p) => p.buttonSelected == "underrated").length;
		var properlyCount = this.players.filter((p) => p.buttonSelected == "properlyrated").length;
		var overratedCount = this.players.filter((p) => p.buttonSelected == "overrated").length;
		return [underratedCount, properlyCount, overratedCount];
	}

	convertCountsToResults(countArr) {
		var min = Math.min(...countArr.filter((e) => e != 0)); //Min excluding 0
		//1 = majority, 0 = minority, -1 = no response
		return countArr.map((e) => Math.sign(e - min));
	}

	startNextRound() {
		this.players.forEach((player) => {
			player.buttonSelected = null;
			player.socket.emit('reset');
		});
		this.getNewWord();
		this.loadWord();
	}

	loadWord() {
		if (this.currentWord == "") {
			this.getNewWord();
		}
		this.players.forEach((player) => {
			player.socket.emit('newWord', this.currentWord);
		});
	}

	getNewWord() {
		if (this.words.length <= 0) {
			this.makeWords();
			this.currentWordCounter = -1;
		}
		if (this.queueWords.length > 0) {
			this.currentWord = this.queueWords[0];
			this.queueWords.shift();
		} else {
			this.currentWordCounter += 1;
			this.currentWord = this.words[this.currentWordCounter]
		}
	}

	makeWords() {
		this.words = ['Pirates', 'Iced tea', 'The office', 'First few minutes of waking up', 'Whisky', 'Mohawks', 'Kanye', 'Quarantine', 'Spanish', 'Winter', 'Mint ice cream', 'Six pack abs', 'The moon', 'Books you read in highschool', 'The Number 13', 'Smoothies', 'Finding Nemo', 'Disney World', 'Movie Theatres', 'Subway', 'Tom Hanks', 'New York', 'Ghost Stories', 'Campfires', 'Foosball', 'Sunrise', 'Facebook', 'The 7 Deadly Sins', 'The Olympics', 'Scavenger hunts', 'John Mulaney', 'Italy', 'Thanksgiving', 'Dinosaurs', 'Youtube', 'French kissing', 'Friends (TV show)', 'Purple', 'Cupcakes', 'Plastic surgery', 'Harry Potter', 'Air travel', 'Road trips', 'Chex mix', 'Punk music', 'Yoga', 'Star wars', 'Harvard', 'Horseback riding', 'Turtlenecks', 'Apple (company)', 'Hot dogs', 'Mirrors', 'Trail mix', 'Pigeons', 'Pokemon', 'Marvel movies', 'Gatorade', 'Frozen pizza'];
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
	constructor(socket, name) {
		this.socket = socket
		this.name = name;
		this.buttonSelected = null;
	}
}

module.exports = tgiuGame;