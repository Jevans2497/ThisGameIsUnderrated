class tgiuGame {

	constructor() {
		this.players = [];
		this.currentWord = "";
		this.words = [];
		this.queueWords = [];
		this.currentWordCounter = 0;
	}



	//–––––––––––––––––––––––––––––––––––––
	//MARK: PLAYER CONNECTED / DISCONNECTED

	addPlayer(socket) {
		socket.on('name', (name) => {
			this.name = name;
			let player = new Player(socket, name);
			console.log(`New player added: ${player.name}`);
			this.setupSocketEvents(player);
			this.players.push(player);
			this.loadWord();
			this.updatePlayerNameSidebarList();
		});
	}

	playerDisconnected(socket) {
		var sockets = this.players.map((p) => p.socket.id);
		var indexOfSocket = sockets.indexOf(socket.id);
		if (indexOfSocket > -1) {
			console.log(`${this.players[indexOfSocket].name} disconnected`);
  			this.players.splice(indexOfSocket, 1);
		}
		this.updatePlayerNameSidebarList();
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

	updatePlayerNameSidebarList() {
		var playerNames = this.players.map((player) => player.name);
		this.players.forEach((player) => {
			player.socket.emit('updateNamesList', playerNames);
		})
		this.updateDecidedPlayers(); // In case a player joins or disconnects in the middle of a game
	}



	//–––––––––––––––––––––––––––––––––––––
	//MARK: RATED BUTTON CLICKED

	buttonClicked(button) {
		this.updateDecidedPlayers();
		if (this.allPlayersHaveChosen()) {
			this.showResults();
		}
	}

	//Tells the client to update the color of the names on the sidebar from grey to black based on which players have decided. 
	updateDecidedPlayers() {
		var decidedPlayers = this.players.filter(player => player.buttonSelected != null).map((player) => player.name);
		this.players.forEach((player) => {
			player.socket.emit("playerDecided", decidedPlayers);
		});
	}

	allPlayersHaveChosen() {
		return this.players.filter(player => player.buttonSelected == null).length <= 0
	}

	//MARK: RATED BUTTON CLICKED - Showing Results
	showResults() {
		var countArr = this.countPlayerChoices(); // A 3 element array tallying how many times each rated button was clicked
		var resultsArr = this.convertCountsToResults(countArr); // A 3 element array that takes the countArr and finds the majority/minority/unclicked and sets them to 1, 0, and -1 respectively
		var playersChoicesDict = this.makePlayersChoicesDict(); // A dictionary, keys are rated button names, values are the names of players who selected each button
		this.players.forEach((player) => {
			player.socket.emit('results', resultsArr);
			player.socket.emit('nameAndShame', playersChoicesDict);
			player.socket.emit('showNewWordButton');
		});
	}

	countPlayerChoices() {
		var underratedCount = this.players.filter((p) => p.buttonSelected == "underrated").length;
		var properlyCount = this.players.filter((p) => p.buttonSelected == "properlyrated").length;
		var overratedCount = this.players.filter((p) => p.buttonSelected == "overrated").length;
		return [underratedCount, properlyCount, overratedCount];
	}

	convertCountsToResults(countArr) {
		if (this.players.length == 2 && countArr.includes(2)) {
			return countArr.map((e) => e - 1) // This is confusing I know but it makes sense. This was added later to make a better 2 player mode. If there are only 2 players and they agree (the if condition), it should be green. Since the countArr will look something like [0, 2, 0], we can just subtract 1 so that it would show [no response, majority, no response]. Hope that makes sense
		} else {
			var min = Math.min(...countArr.filter((e) => e != 0)); //Min excluding 0
			return countArr.map((e) => Math.sign(e - min)); //1 = majority, 0 = minority, -1 = no response
		}
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



	//–––––––––––––––––––––––––––––––––––––
	//MARK: STARTING A NEW ROUND

	startNextRound() {
		this.players.forEach((player) => {
			player.buttonSelected = null;
			player.socket.emit('reset');
		});
		this.getNewWord();
		this.loadWord();
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

	loadWord() {
		if (this.currentWord == "") {
			this.getNewWord();
		}
		this.players.forEach((player) => {
			player.socket.emit('newWord', this.currentWord);
		});
	}



	//–––––––––––––––––––––––––––––––––––––
	//MARK: WORDS ARRAY

	makeWords() {
		this.words = ['Pirates', 'Iced Tea', 'The Office', 'First Few Minutes of Waking Up', 'Whisky', 'Mohawks', 'Kanye', 'Quarantine', 'Spanish', 'Winter', 'Mint ice cream', 'Six Pack Abs', 'The Moon', 'Books you Read in Highschool', 'The Number 13', 'Smoothies', 'Finding Nemo', 'Disney World', 'Movie Theatres', 'Subway', 'Tom Hanks', 'New York', 'Ghost stories', 'Campfires', 'Foosball', 'Sunrise', 'Facebook', 'The 7 Deadly Sins', 'The Olympics', 'Scavenger Hunts', 'John Mulaney', 'Italy', 'Thanksgiving', 'Dinosaurs', 'Youtube', 'Friends (TV show)', 'Purple', 'Cupcakes', 'Plastic Surgery', 'Harry Potter', 'Air Travel', 'Road Trips', 'Chex Mix', 'Punk Music', 'Yoga', 'Star Wars', 'Harvard', 'Horseback Riding', 'Turtlenecks', 'Apple (company)', 'Hot Dogs', 'Mirrors', 'Trail Mix', 'Pigeons', 'Pokemon', 'Marvel Movies', 'Gatorade', 'Frozen pizza', 'The Beatles', 'The name Katie', 'IKEA', 'Lighthouses', 'Live Music', 'Love', 'The Beach', 'Top Hats', 'Gravy', 'Johnny Appleseed', 'Going as a Cat for Halloween', 'Times New Roman', 'Bears', 'Beets', 'SNL', 'Optical Illusions', 'Kaleidescopes', 'Baseball', 'Mayonnaise', 'Monopoly', 'Mosquitos', 'Silver', 'Jeopardy', 'August', 'The Macarena', 'Cruises', 'The Search for Big Foot', 'The Bachelor', 'Cards Against Humanity', 'Costco', 'Taco Bell', 'Blue Eyes', 'Haircuts', 'Trampolines', 'Skiing / Snowboarding', 'Jupiter', 'Emojis', 'The 1990s', 'Britney Spears', 'Exploring Space', 'Elon Musk', 'Overalls', 'Jean Shorts', 'Constellations', 'Canada', 'Ballet', 'Oatmeal Raisin Cookies', 'Peanut Butter', 'Julius Caesar', 'Owning a Home', 'Feudalism', 'Proper Grammar.', 'Time Travel', 'Mullets', 'Werewolves', 'Highschool', 'College', 'Balconies', 'Pharmaceutical Drug Commercials', 'Indian Curry', 'Ketchup', 'Classical Music', 'Hawaii', 'Crying', 'Axe Body Spray', 'Sleeping on a Couch', 'Rain', 'Marriage', 'Mouthwash', 'Camp Songs', 'Trap Music', 'Lebron James', 'The Word Bro', 'Soccer', 'Calling Soccer Futbol', 'Snoop Dogg', 'Hard Seltzer', 'Roundabouts (Driving)', 'Minecraft', 'Participation Trophies', 'Polaroid Cameras', 'Microwave Meals', 'Asparagus', 'Breaking Bad', 'Dating Apps', 'Borat', 'Karate', 'The Japanese Flag', 'Meaningless Tattoos', 'Staring Contests', 'Shark Tooth Necklaces', 'Rock Paper Scissors', 'Sparknotes', 'Bumper Stickers', 'Truck Stops', 'Watches', 'Flip Flops', 'Slinkys', 'Wildlife', 'Electric Cars', 'Podcasts', 'Kayaking', 'Spoons', 'Inspirational Quotes', 'Coasters', 'Roller Coasters', 'Volcanoes', 'Art Museums', 'Fairy Tales', 'Pepsi', 'Vinyl', 'Candles', 'Hamilton', 'Hummus', 'Ping Pong', 'Billiards', 'Chess', 'Cheese', 'Guitar Hero', 'Snapchat Filters', 'Music Festivals', 'Thrift Stores', 'Waffles', 'Pancakes', 'Running a Marathon', 'Coffee', 'The American Midwest', 'Gardening', 'Archery', 'Swimming in a Lake', 'Hard-Cover Books', 'Llamas', 'Lord of the Rings', 'Improv Comedy', 'American Idol', 'Bowling', 'Taking a Bath', 'Twitter', 'Babies', 'Graduation Ceremonies', 'Car Commercials', 'AC/DC', 'Reading', 'Jogging', 'Social Media', 'Cats', 'Dogs', 'Pet Fish', 'Zoos', 'Aquariums', 'Amusement parks', 'Toast', 'Rye Bread', 'Breakfast Cereal', 'Bottled Water', 'Pulling an All-Nighter', 'Vegetables', 'Fruits', 'Carrots', 'Onions', 'Tomatoes', 'Bananas', 'Pineapples', 'Apples', 'Pears', 'Cucumbers', 'Hotels', 'Birthdays', 'Colored Pencils', 'Watching TV', 'Alcohol', 'Sleeping', 'Refrigerators', 'Water Parks', 'Computers', 'Headphones', 'Swimming Pools', 'Hiking', 'Saran Wrap', 'Forks', 'The Sun', 'The Moon', 'Trick or Treating', 'Febreeze', 'Motorcycles', 'Tacos', 'Vitamins', 'Starbucks', 'Jazz', 'Single-use Plastics', 'Crossing the Country in an RV', 'Greek Mythology', 'Nascar', 'Roses', 'Shakespeare', 'Hide and Seek', 'Popcorn', 'Craft Beer', 'Fishing', 'Love Seat', 'Donuts', 'The Grateful Dead', 'Corn', 'Deep Dish Pizza', 'Sequels', 'The Internet', 'Tennis', 'The Eiffel Tower', 'The Statue of Liberty', 'Fraternities and Sororities', 'Nickelback', 'Dreams', 'Jewelry', 'Pumpkin Spice', 'Antique Shops', 'Fanny Packs', 'Summer', 'Autumn', 'Spring', 'Yellow Gatorade', 'Red Gatorade', 'Tylenol', 'Salmon', 'The Grand Canyon', 'Hot Tubs', 'The Only Thing We Have to Fear is Fear Itself', 'George Washington', 'Spiders', 'Umbrellas', 'Carving Pumpkins', 'Perseverance', 'Giraffes', 'Courage', 'Brunch', 'Breakfast', 'Memes', 'Uber/Lyft', 'Shrek', 'Aviator Sunglasses', 'Sailing', 'Magic Tricks', 'Roller Blading', 'Ice Skating', 'Coconut Water', 'Dr. Suess Books', 'Vampire Weekend', 'Mini Golf', 'Getting a Drivers License', 'Southern Accents', 'Mr. Brightside', 'Shel Silverstein', 'Poetry', 'Curse Words', 'Pig Latin', 'British Accents', 'Glow in the Dark Star Stickers', 'Moving to a New City', 'Christmas Music', 'Reality TV', 'Garage Sales', 'Ripped Jeans', 'Ventriloquism', 'Mustaches', 'Pretzel Buns', 'Craigslist', 'Moon Bounces', 'Birthday Cake', 'Veggie Burgers', 'Indian Food', 'Money', 'Ice Cream', 'Dippin Dots', 'Will Ferrell Movies', 'Groundhogs Day', 'Making Your Bed', 'Bug Spray', 'Sumo Wrestling', 'James Bond', 'Penguins', 'Dolphins', 'Quentin Tarantino Films', 'Wes Anderson Films', 'Bumble Bees', 'The Simpsons', 'Succulents', 'The Lion King', 'LEGO', 'Vanity Plates', 'The Sky', 'Cotton Eye Joe', 'Ghosts', 'Vampires', 'Vanilla', 'Chocolate', 'Smores', 'Getting Dressed Up', 'July 4th', 'Survivor', 'Flannels', 'Cowboys', 'Corgis', 'The Wild West', 'Beards', 'Chipotle', 'Lime', 'Violins', 'Islands', 'World Peace', 'Guinness Book of Records', 'Taco Tuesday', 'Thursdays', 'Cheerleading', 'Theatre', 'Musical Theatre', 'Brownies', 'Philosophy', 'Rings', 'Pedicures', 'Competition', 'Toy Story', 'Rubiks Cube', 'Dr. Pepper', 'Australian Accents', 'First Dates', 'Calendars', 'Airplane Food', 'Going to Mars', 'Pluto', 'Texting', 'Treadmills', 'Making Plans', 'Fire', 'Creativity', 'The Dictionary', 'GIFs', 'Dessert', 'Corndogs'];
		this.shuffle(this.words);
	}

	//Got this from the internet, seems to work and if it ain't broke
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



//–––––––––––––––––––––––––––––––––––––
//Player Class

class Player {
	constructor(socket, name) {
		this.socket = socket
		this.name = name;
		this.buttonSelected = null;
	}
}



//–––––––––––––––––––––––––––––––––––––
module.exports = tgiuGame;