

const writeEvent = (text) => {
	// <ul> element
	const parent = document.querySelector('#events');

	// <li element
	const el = document.createElement('li');
	el.innerHTML = text;

	parent.appendChild(el);
};

const setNewWord = (text) => {
	const parent = document.querySelector('#wordEvent');
	parent.innerHTML = '';
	const el = document.createElement('h1');
	el.innerHTML = text;
	parent.appendChild(el);
}

const onFormSubmitted = (e) => {
	e.preventDefault();
	const input = document.querySelector('#chat');
	const text = input.value;
	input.value = '';

	socket.emit('message', text);
};

const addButtonListeners = () => {
	['underrated', 'properlyrated', 'overrated'].forEach((id) => {
		const button = document.getElementById(id);
		button.addEventListener('click', () => {
			socket.emit('buttonClicked', id);
		});
	});
};

const socket = io();
socket.on('message', setNewWord);

addButtonListeners();