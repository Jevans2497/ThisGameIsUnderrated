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

const displayName = (name, buttonSelected) => {
	var listToAddNameID = "";
	switch (buttonSelected) {
		case "underrated":
			listToAddNameID = "underList";
			break;
		case "properlyrated":
			listToAddNameID = "properlyList";
			break;
		case "overrated":
			listToAddNameID = "overList";
			break;
		default:
			listToAddNameID = "ERROR";
	}
	console.log(buttonSelected);
	parent = document.getElementById(listToAddNameID);
	const li = document.createElement("li");
	li.innerHTML = name;
	parent.appendChild(li);
}

const socket = io();
socket.on('message', setNewWord);
socket.on('results', displayResults);
socket.on('nameAndShame', displayName);

socket.emit('name', sessionStorage.name);

addButtonListeners();
