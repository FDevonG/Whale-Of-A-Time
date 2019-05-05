/* jshint esversion: 6 */

//IMAGE GALLERY VARS
const imageGalleryImage = document.querySelector('#image-gallery-image');//this is the img tag displaying the image for the gallery
let imageGalleryIndex = 0;//this is used to track the index of the image currently displaying
const imageChangeTime = 10000;
let imageChangeTimer = setInterval(() => nextImage(), imageChangeTime);//set a time internval to change the image after 10 seconds

//MODAL VARS
const modal = document.querySelector('#modal-container');//the modal container
const modalImage = document.querySelector('#modal-image');//the modal image
const modalText = document.querySelector('#modal-text');//the modal image description

const imageFilePaths = [//an array of file path strings for the images
	'images/campground-gallery-pic-01.jpg',
	'images/campground-gallery-pic-02.jpg',
	'images/campground-gallery-pic-03.jpg',
	'images/campground-gallery-pic-04.jpg',
	'images/campground-gallery-pic-05.jpg',
	'images/campground-gallery-pic-06.jpg',
	'images/campground-gallery-pic-07.jpg',
	'images/campground-gallery-pic-08.jpg',
];

//fullsize versions of the images
const modalImageFilePaths = [
	'images/campground-pic-01.jpg',
	'images/campground-pic-02.jpg',
	'images/campground-pic-03.jpg',
	'images/campground-pic-04.jpg',
	'images/campground-pic-05.jpg',
	'images/campground-pic-06.jpg',
	'images/campground-pic-07.jpg',
	'images/campground-pic-08.jpg',
];

//descriptions of the images being displayed
const imageDescriptions = [
	'Whale Of a Time Camping and Cottages.',
	'Father and son, taking in the stunning views at Whale Of A Time Camping and Cottages.',
	'Rainbow overlooking the village of Freeport.',
	'Spectacular views and relaxing atmosphere at Whale Of A Time Camping and Cottages.',
	'Spacious and well maintained camp sites at Whale Of A Time Camping and Cottages.',
	'Rainbow over top of Bay of Fundy.',
	'Father and son, enjoying a hike through one of the many trails on Long Island Nova Scotia.',
	'We are pet friendly here at Whale Of A Time.',
];

buildControls();//call the function to build out the image gallery controls

//this function builds out the controls beneath the image gallery
function buildControls() {
	'use strict';
	
	//the arrow control strings
	const nextArrowString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 451.846 451.847"><path d="M345.441 248.292L151.154 442.573c-12.359 12.365-32.397 12.365-44.75 0-12.354-12.354-12.354-32.391 0-44.744L278.318 225.92 106.409 54.017c-12.354-12.359-12.354-32.394 0-44.748 12.354-12.359 32.391-12.359 44.75 0l194.287 194.284c6.177 6.18 9.262 14.271 9.262 22.366 0 8.099-3.091 16.196-9.267 22.373z"/></svg>`;//the string that holds the graphic for the next arrow control
	const backArrowString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 451.846 451.847"><path d="M106.405 248.292l194.287 194.281c12.359 12.365 32.397 12.365 44.75 0 12.354-12.354 12.354-32.391 0-44.744L173.528 225.92 345.437 54.017c12.354-12.359 12.354-32.394 0-44.748-12.354-12.359-32.391-12.359-44.75 0L106.4 203.553c-6.177 6.18-9.262 14.271-9.262 22.366 0 8.099 3.091 16.196 9.267 22.373z" data-original="#000000" class="active-path"/></svg>`;//the string that holds the graphic for the back arrow control
	
	const div = document.createElement('DIV');//create a div element to hold the image gallery controls
	div.classList.add('imageGalleryImageSelectorContainer');//add the css class to the div to style it
	let html = `<div class="arrow back-arrow">${backArrowString}</div>`;//build a string literal of the html to insert into the photo gallery while adding the back arrow it it
	//loop through the array of file paths and add a div element for each one that can be used to select the corresponding image
	for (let i = 0; i < imageFilePaths.length; i++) {//loop through the file path array adding a image selector to the html var to be inserted into the parent container
		if (i === 0) {
			html += `<div class="imageGalleryImageSelector currentGalleryImage"></div>`;
		} else {
			html += `<div class="imageGalleryImageSelector"></div>`;
		}
	}
	html += `<div class="arrow next-arrow">${nextArrowString}</div>`;//close the html literl by addinging the final arrow control
	div.innerHTML = html;//insert the newly generated html into the div
	document.querySelector('#image-gallery').parentElement.append(div);//find the image gallery container and append the controls to them
		
}

//wire up the circular nav buttons for the image gallery
document.querySelector('.imageGalleryImageSelectorContainer').addEventListener('click', event => {
	'use strict';
	if (event.target.classList.contains('imageGalleryImageSelector')) {
		changeCircularNav(event);
	}
});

//changes the classes on the circluar nav to show changes in the image seclection
function changeCircularNav(event) {
	'use strict';
	const circularNavItems = document.querySelectorAll('.imageGalleryImageSelector');//gather all the items into an array
	for (let i = 0; i < circularNavItems.length; i++) {
		if (event.target === circularNavItems[i]) {
			imageGalleryIndex = i;
			changeImage();
		}
	}
}

//wire up the next button
document.querySelector('.back-arrow').addEventListener('click', () => previousImage());

//runs the code to get set up to go to previous image
function nextImage () {
	'use strict';
	imageGalleryIndex++;//increment the gallery index tracker
	if (imageGalleryIndex >= imageFilePaths.length) {//check to make sure the index tracker has not outgrown the array length
		imageGalleryIndex = 0;//reset the index tracker if we reached the end of the array
	}
	changeImage();//call the function to change the image
}

//wire up the back button
document.querySelector('.next-arrow').addEventListener('click', () => nextImage());

//runs the code to get set up to go to next image
function previousImage () {
	'use strict';
	imageGalleryIndex--;//decrement the index tracker
	if (imageGalleryIndex < 0) {//check to make sure the index tracker has not gone past 0
		imageGalleryIndex = imageFilePaths.length - 1;//reset the index tracker to the end of the array if it has gone past 0
	}
	changeImage();//call the function to change the image
}

//changes the image being displayed in the gallery
function changeImage () {
	'use strict';
	imageGalleryImage.style.opacity = 0;//turns the opacity to 0 so with a combinaion of javascript and css the image fades out
	setTimeout(() => imageGalleryImage.setAttribute('src', imageFilePaths[imageGalleryIndex]), 500);//changes the image src to the appropriate one
	setTimeout(() => imageGalleryImage.style.opacity = 100, 500);//sets a timeout and fades back in
	//adjust the circular nav items to reflect the changed image
	const circularNavItems = document.querySelectorAll('.imageGalleryImageSelector');//gather all the items into an array
	for (let i = 0; i < circularNavItems.length; i++) {//loop through the array and make the needed changes
		if (circularNavItems[i].classList.contains('currentGalleryImage') && i !== imageGalleryIndex) {//check to see if the nav item has the current and also to see if it is not the correct one to have it
			circularNavItems[i].classList.remove('currentGalleryImage');//if the currentClass is not supposed to be on this item then remove it
		}
		if (i === imageGalleryIndex) {
			circularNavItems[i].classList.add('currentGalleryImage');
		}
	}
	clearInterval(imageChangeTimer);//clear the time interval set to change the image
	imageChangeTimer = setInterval(() => nextImage(), imageChangeTime);//reset the timer to change to the image
}

/*************
MODAL
*************/

//add an event listener to the image to activate the modal when it is clicked
imageGalleryImage.addEventListener('click', () => {
	'use strict';
	openModal();
});

//adds the function to close the modal to the modal closer button
document.querySelector('.modal-close').addEventListener('click', () => {
	'use strict';
	closeModal();
});

//wire up the modals previous image button
document.querySelector('.modal-back-arrow').addEventListener('click', () => {
	'use strict';
	imageGalleryIndex--;//decrement the index tracker
	if (imageGalleryIndex < 0) {//check to make sure the index tracker has not gone past 0
		imageGalleryIndex = modalImageFilePaths.length - 1;//reset the index tracker to the end of the array if it has gone past 0
	}
	changeModalImage();//change the modal info
});

//wire up the modals next button
document.querySelector('.modal-next-arrow').addEventListener('click', () => {
	'use strict';
	imageGalleryIndex++;//increment the gallery index tracker
	if (imageGalleryIndex >= modalImageFilePaths.length) {//check to make sure the index tracker has not outgrown the array length
		imageGalleryIndex = 0;//reset the index tracker if we reached the end of the array
	}
	changeModalImage();//change the info
});

//opens the modal and sets stuff up
function openModal () {
	'use strict';
	clearInterval(imageChangeTimer);//clear the time interval set to change the image
	modal.style.display = 'block';//change the display of the modal to block to bring it out of hiding
	document.querySelector('body').classList.add('no-scroll');
	changeModalImage();//set the info up
}

//closes the modal
function closeModal () {
	'use strict';	
	for (let i = 0; i < modalImageFilePaths.length; i++) {
		if (modalImageFilePaths[i] === modalImage.getAttribute('src')) {
			imageGalleryIndex = i;
			break;
		}
	}
	imageChangeTimer = setInterval(() => nextImage(), imageChangeTime);//reset the timer to change to the image
	modal.style.display = 'none';//hide the modal again
	document.querySelector('body').classList.remove('no-scroll');
	changeImage();
}

//add a window click event
window.onclick = event => {
	'use strict';
	if (event.target === modal.firstElementChild) {//if the clicked event is outside the modal-conent then close the modal
		closeModal();
	}
};

function changeModalImage () {
	'use strict';
	modalImage.setAttribute('src', modalImageFilePaths[imageGalleryIndex]);//set the photo to the full size image
	modalText.textContent = imageDescriptions[imageGalleryIndex];
}




