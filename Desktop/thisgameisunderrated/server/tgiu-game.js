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
		console.log(resultsArr);
		//Reset buttons
		// this.getNewWord();
		// this.loadWord();
	}

	countPlayerChoices() {
		var underratedCount = this.players.filter((p) => p.buttonSelected == "underrated").length;
		var properlyCount = this.players.filter((p) => p.buttonSelected == "properlyrated").length;
		var overratedCount = this.players.filter((p) => p.buttonSelected == "overrated").length;
		return [underratedCount, properlyCount, overratedCount];
	}

	convertCountsToResults(countArr) {
		var resultsArr = [];
		var min = Math.min(...countArr.filter((e) => e != 0)); //Min excluding 0
		var index;
		for (index = 0; index < countArr.length; index++) {
			if (countArr[index] == 0) {
				resultsArr.push(0);
			} else if (countArr[index] == min) {
				resultsArr.push(-1);
			} else {
				resultsArr.push(1);
			}
		}
		return resultsArr;
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
		this.words = ['Pirates', 'Iced tea', 'The office', 'First few minutes of waking up', 'Whisky', 'Mohawks', 'Kanye', 'Quarantine', 'Spanish', 'Winter', 'Mint ice cream', 'Six pack abs', 'The moon', 'Books you read in highschool', 'The number 7', 'Smoothies', 'Finding Nemo', 'Disney world', 'Movie theatres', 'Subway', 'Tom Hanks', 'New York', 'Ghost stories', 'Campfires', 'Foosball', 'Sunrise', 'Facebook', 'The seven deadly sins', 'The Olympics', 'Scavenger hunts', 'John Mulaney', 'Italy', 'Thanksgiving', 'Dinosaurs', 'Youtube', 'French kissing', 'Friends (TV show)', 'Purple', 'Cupcakes', 'Plastic surgery', 'Harry Potter', 'Air travel', 'Road trips', 'Chex mix', 'Punk music', 'Yoga', 'Star wars', 'Harvard', 'Horseback riding', 'Turtlenecks', 'Apple (company)', 'Hot dogs', 'Mirrors', 'Trail mix', 'Pigeons', 'Pokemon', 'Marvel movies', 'Gatorade', 'Frozen pizza'];
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