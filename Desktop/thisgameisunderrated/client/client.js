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
};

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
	}
}

const displayNames = (playersChoicesDict) => {
	for (let id in playersChoicesDict) {
		let listId = getListIdFromButtonId(id);
		for (var name of playersChoicesDict[id]) {
			addNameToList(listId, name);
		}
	}
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

const socket = io();
socket.on('message', setNewWord);
socket.on('results', displayResults);
socket.on('nameAndShame', displayNames);
socket.emit('name', sessionStorage.name);

addButtonListeners();