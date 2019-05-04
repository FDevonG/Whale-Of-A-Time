/* jshint esversion: 6 */

const nameInput = document.querySelector('#name-input');//the input they put there name in
const emailInput = document.querySelector('#email-input');//the input the sender types their email into
const subjectInput = document.querySelector('#subject-input');//the input the subject of the email is entered into
const messageInput = document.querySelector('#message-input');//the input the message is typed in

document.querySelector('#email-submit').addEventListener('click', event => {//adds an event listener to the submit button
	'use strict';
	event.preventDefault();
	removeResponseText();
	if (textValid(nameInput.value)) {//tests the name text to see if its valid
		clearError('#name-input');//if the name is valid clear any errors that may have been produced
	} else {
		formError('#name-input', 'Please enter your name');//if the name fails then call the error function to display an error
	}
	if (emailValid(emailInput.value)) {//test the email to see if it is valid
		clearError('#email-input');//clear any errors if the email is valid
	} else {
		formError('#email-input', 'Please enter a valid email');//display an error to put in proper email
	}
	if (textValid(subjectInput.value)) {//test the subject text to make sure it is valid 
		clearError('#subject-input');//clears any errors that make have been displayed
	} else {
		formError('#subject-input', 'Please enter the subject');
	}
	if (messageValid(messageInput.value)) {
		clearError('#message-input');
	} else {
		formError('#message-input', 'Please enter a message');
	}
	
	if (textValid(nameInput.value) && emailValid(emailInput.value) && textValid(subjectInput.value) && messageValid(messageInput.value)) {//checks to see all fields are valid
		sendEmail();//if everything is valid send the email
	}
	
});

function sendEmail () {
	'use strict';
	
	const name = nameInput.value;
	const email = emailInput.value;
	const subject = subjectInput.value;
	const message = messageInput.value;
	
	const emailRequest = new XMLHttpRequest();
	emailRequest.onreadystatechange = () => {
		if (emailRequest.readyState === 4) {
			displayResponseMessage(emailRequest);
		}
		if (emailRequest.readyState === 4 && emailRequest.status === 200) {
			clearForm();
		}
	};
	emailRequest.open('POST', '../php/mailer.php', true);
	emailRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	const emailData = 'name='+name+'&email='+email+'&subject='+subject+'&message='+message;
	emailRequest.send(emailData);
}

//displays the message response from the server 
function displayResponseMessage (emailRequest) {
	'use strict';
	removeResponseText();
	const responseDiv = document.createElement('DIV');//create a new div//create a new div
	responseDiv.innerHTML = emailRequest.responseText;//add the message to the div html
	responseDiv.classList.add('email-response-div');//add a class to the div so we can locate it
	if (emailRequest.status === 200) {
		responseDiv.style.color = 'green';
	} else {
		responseDiv.style.color = 'red';
	}
	responseDiv.addEventListener('click', () => {
		responseDiv.remove();
	});
	document.querySelector('.email-form').insertBefore(responseDiv, document.querySelector('#email-form'));//insert the parent div into the page before the form
}

function removeResponseText () {
	'use strict';
	if (document.querySelector('.email-response-div')) {//see if a pop up already exists
		document.querySelector('.email-response-div').remove();//if one does exist kill it
	}
}

//clears the form after it has been sent
function clearForm() {
	'use strict';
	nameInput.value = '';
	emailInput.value = '';
	subjectInput.value = '';
	messageInput.value = '';
}

function textValid(text) {//tests the values typed into text feilds
	'use strict';
	const textRegex = new RegExp(/[a-zA-Z]/);//the regex to be used to test if they are valid
	return textRegex.test(text);//return the results of the test
}

//checks to see if the email is valid
function emailValid(email) {
	'use strict';
	const emailRegex = new RegExp(/^[^@]+@[^@]+\.[a-z]+$/i);	
	return emailRegex.test(email);
}

function messageValid (message) {
	'use strict';
	const messageRex = new RegExp(/\w[a-zA-Z]/);
	return messageRex.test(message);
}

//displays the form error messages
function formError (id, message) {
	'use strict';
	document.querySelector(id).style.borderBottom = '1px solid red';//change the borderbottom of the div element to red
	if (!document.querySelector('.' + id.substring(1) + 'Error')) {//only do this code if it cant find an element matching the one its about to create
		const div = document.createElement('div');//create an empty div
		div.classList.add(id.substring(1) + 'Error');//trim off the first character in the string to remove the . or # and add the id + error to it as a class name
		const html = `<span style="color:red; font-size:0.8em;">${message}</span>`;//create a new string of text containing html markup to display the error
		div.innerHTML = html;//add the newly created html text to the newly created div
		document.querySelector(id).parentElement.insertBefore(div, document.querySelector(id));
	}
}

//wire up the reset button to clear errors or server response
document.querySelector('#email-reset').addEventListener('click', () => {
	'use strict';
	removeResponseText();
	clearError('#name-input');
	clearError('#email-input');
	clearError('#subject-input');
	clearError('#message-input');
});

//clears the error messages as they are corrected
function clearError (id) {
	'use strict';
	if (document.querySelector('.' + id.substring(1) + 'Error') !== null) {
		document.querySelector('.' + id.substring(1) + 'Error').remove();
		document.querySelector(id).style.borderBottom = 'none';
	}
}