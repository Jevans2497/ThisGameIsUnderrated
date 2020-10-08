const setNewWord = (text) => {
	const parent = document.querySelector('#wordEvent');
	parent.innerHTML = '';
	const el = document.createElement('h1');
	el.innerHTML = text;
	parent.appendChild(el);
}

const addButtonListeners = () => {
	['underrated', 'properlyrated', 'overrated'].forEach((id) => {
		const button = document.getElementById(id);
		button.addEventListener('click', () => {
			socket.emit('buttonClicked', id);
		});
	});

}

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

const resetNewWordButton = () => {
	const newWordButton = document.getElementById("new-word-button");
	newWordButton.style.backgroundColor = "transparent";
	newWordButton.style.color = "transparent";
	newWordButton.disabled = true;
}

const displayNames = (playersChoicesDict) => {
	console.log(playersChoicesDict);
	for (let id in playersChoicesDict) {
		let listId = getListIdFromButtonId(id);
		for (var name of playersChoicesDict[id]) {
			addNameToList(listId, name);
		}
	}
}

const resetNames = () => {
	var ids = ["underList", "properlyList", "overList"];
	ids.forEach((id) => {
		const list = document.getElementById(id);
		list.innerHTML = "";
	});
}

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
	li.innerHTML = name;
	parent.appendChild(li);
}

const resetGame = () => {
	resetResults();
	resetNewWordButton();
	resetNames();
}

const socket = io();
socket.on('newWord', setNewWord);
socket.on('results', displayResults);
socket.on('nameAndShame', displayNames);
socket.on('showNewWordButton', showNewWordButton);
socket.on('reset', resetGame);
socket.emit('joinRoom', sessionStorage.roomName);
socket.emit('name', sessionStorage.name);


addButtonListeners();