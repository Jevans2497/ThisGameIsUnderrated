//MARK: BUTTON CLICK LISTENERS

const addButtonListeners = () => {
	['underrated', 'properlyrated', 'overrated'].forEach((id) => {
		const button = document.getElementById(id);
		button.addEventListener('click', () => {
			socket.emit('buttonClicked', id);
		});
	});
}

const addToQueueButtonListener = () => {
	const addToQueueButton = document.getElementById("queue-button");
	addToQueueButton.addEventListener('click', () => {
		var queueTextNode = document.getElementById("queue-text");
		socket.emit('addToQueue', queueTextNode.value);	
		queueTextNode.value = "";
		addToQueueButton.style.backgroundColor = "#e7e7e7";
		addToQueueButton.disabled = true;
	});
}



//–––––––––––––––––––––––––––––––––––––
//MARK: DISPLAYING MAJORITY/MINORITY/NULL ON RATED BUTTONS

//Based on the results array passed in from tgiugame, set the color to either majority/minority/grey
const displayResults = (resultsArr) => {
	var ids = ['underrated', 'properlyrated', 'overrated'];
	var i;
	for (i = 0; i < ids.length; i += 1) {
		const button = document.getElementById(ids[i]);
		if (resultsArr[i] == -1) {
			button.style.background = '#e6e6e6';
			button.style.color = '#bfbfbf';
		} else if (resultsArr[i] == 0) {
			button.style.background = '#ffb3b3';
			button.style.color = '#000000';
		} else {
			button.style.background = '#99ff99';
			button.style.color = '#000000';
		}
		button.disabled = true;
	}
}



//–––––––––––––––––––––––––––––––––––––
//MARK: NEW WORD BUTTON

// If we add multiple click listeners to the new word button, it'll fire for each listener.
// What ends up happening is that it skips a ton of words cause it calls new word way more than it should. 
// By only adding the listener only once, we guarantee that it won't do that. 
var newWordHasEventListener = false;

const showNewWordButton = () => {
	const newWordButton = document.getElementById("new-word-button");
	newWordButton.style.backgroundColor = "#cef3ff";
	newWordButton.style.color = "#000000";
	newWordButton.disabled = false;
	if (!newWordHasEventListener) {
		newWordButton.addEventListener('click', () => {
			socket.emit('newRound');
		});
		newWordHasEventListener = true;
	}
}



//–––––––––––––––––––––––––––––––––––––
//MARK: DISPLAYING NAMES UNDER RATED BUTTONS 

//This method gets the elementID of the list under each rated button and then adds that name to correct list
//The playersChoicesDict looks something like { ["underrated": "J.D.", "Turk", "Carla"], ... ["overrated": "Elliot", "etc..."] }
const displayNames = (playersChoicesDict) => {
	resetNames(); // Oh boy this one. If all players chose and then a new player joined and the new player selected an option, it would duplicate all the names. I couldn't decide whether to disable selection after results or to just add this one simple line. So here we are
	for (let buttonId in playersChoicesDict) {
		let listId = getListIdFromButtonId(buttonId);
		for (var playerName of playersChoicesDict[buttonId]) {
			addNameToList(listId, playerName);
		}
	}
}

//The listIDs are the element ids for the list of names that appear under the rated buttons showing who selected each button. 
const getListIdFromButtonId = (buttonId) => {
	switch (buttonId) {
		case "underrated":
			return "underList";
		case "properlyrated":
			return "properlyList";
		case "overrated":
			return "overList";
		default:
			return "ERROR";
		}
}

const addNameToList = (listId, name) => {
	parent = document.getElementById(listId);
	const li = document.createElement("li");
	li.classList.add("button-list")
	li.innerHTML = name;
	parent.appendChild(li);
}



//–––––––––––––––––––––––––––––––––––––
//MARK: SETTING NEW WORD

const setNewWord = (text) => {
	const parent = document.querySelector('#wordEvent');
	parent.innerHTML = '';
	const el = document.createElement('h1');
	el.innerHTML = text;
	parent.appendChild(el);
}



//–––––––––––––––––––––––––––––––––––––
//MARK: SIDEBAR NAMES

const updateSidebarNamesList = (playerNames) => {
	//It's easier to just entirely clear the list and add in all the currently active players than to figure out joining/leaving 
	resetSidebarNameList();

	//The player should always see their own name at the top
	var thisPlayersName = sessionStorage.name
	playerNames.sort(function(x,y) { return x == thisPlayersName ? -1 : y == thisPlayersName ? 1 : 0; });

	//Then it's as simple as adding all the names to the name-list element
	const parent = document.getElementById("name-list");
	playerNames.forEach((name) => {
		const li = document.createElement("li");
		li.innerHTML = name;
		li.classList.add("opponent-name");
		parent.appendChild(li);
	});
}

const resetSidebarNameList = () => {
	var sideBarList = document.getElementById("name-list");
	sideBarList.innerHTML = "";
}

//When a player has made a decision, their name should go from grey to black
const showDecidedPlayers = (decidedPlayers) => {
	let sideBarList = document.getElementById("name-list");
	sideBarList.childNodes.forEach((child) => {
		if (decidedPlayers.includes(child.innerHTML)) {
			child.style.color = "#000000";
		}
	});
}



//–––––––––––––––––––––––––––––––––––––
//MARK: RESETTING THE GAME

//This should be the only function called by tgiugame to reset. Everything to reset a game should be handled here
const resetGame = () => {
	resetResults();
	resetNewWordButton();
	resetNames();
	resetDecidedPlayers();
}

//Reset all the rated buttons to the base color
const resetResults = () => {
	var ids = ['underrated', 'properlyrated', 'overrated'];
	var i;
	for (i = 0; i < ids.length; i += 1) {
		const button = document.getElementById(ids[i]);
		button.style.background = '#e7e7e7';
		button.style.color = '#000000';
		button.style.boxShadow = "none";
		button.disabled = false;
	}
}

const resetNewWordButton = () => {
	const newWordButton = document.getElementById("new-word-button");
	newWordButton.style.backgroundColor = "transparent";
	newWordButton.style.color = "transparent";
	newWordButton.disabled = true;
}

const resetNames = () => {
	var ids = ["underList", "properlyList", "overList"];
	ids.forEach((id) => {
		const list = document.getElementById(id);
		list.innerHTML = "";
	});
}

const resetDecidedPlayers = () => {
	let sideBarList = document.getElementById("name-list");
	sideBarList.childNodes.forEach((child) => {
		child.style.color = "#a3a3a3";
	});
}



//–––––––––––––––––––––––––––––––––––––
//MARK: THE MEAT - INTERACTION WITH THE SERVER AND TGIUGAME

const socket = io.connect();

//Whenever tgiugame calls socket.emit(__one of the following__) it triggers the method name after the comma
socket.on('newWord', setNewWord);
socket.on('results', displayResults);
socket.on('nameAndShame', displayNames);
socket.on('showNewWordButton', showNewWordButton);
socket.on('reset', resetGame);
socket.on('updateNamesList', updateSidebarNamesList)
socket.on('playerDecided', showDecidedPlayers)

//If the client is available, that means we already got past the name/roomname first screen
//The player then should join a room and tell the server to join the room and add their name
let roomName = sessionStorage.roomName.toUpperCase()
let playerName = sessionStorage.name
socket.emit('joinRoom', roomName, playerName);
socket.emit('name', playerName, roomName);

addButtonListeners();
addToQueueButtonListener();