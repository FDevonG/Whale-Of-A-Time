/* jshint esversion: 6 */

//vars

const campsiteFeatureImage = document.querySelector('#main-campsite-image');//the main image being displayed in the campsites
const cottageOneFeatureImage = document.querySelector('#feature-cottage-1-image');//the first cottage main image
const cottageTwoFeatureImage = document.querySelector('#feature-cottage-2-image');//the second cottage main image

//an array storing the created campsite images
const campSiteImages = [];

//an array stroing the first cottage images
const cottageOneImages = [];

//an array storing the second cottage images
const cottageTwoImages = [];

buildGalleries();//set the images up
//builds the image gallerys for services page
function buildGalleries () {
	'use strict';
	let i = 0;//a counter var for our loops 
	
	const campImages = document.querySelector('.campsite-images').children;//find the img elements on page
	
	for (i = 0; i < campImages.length; i++) {//loop through the img elements
		campSiteImages.push(addcampsiteEvents(campImages[i]));//add them to an array after adding a event listener
	}
	
	const cottageOneImagesTemp = document.querySelector('.cottage-1-images').children;
	//build the cottage galleries
	for (i = 0; i < cottageOneImagesTemp.length; i++) {
		 cottageOneImages.push(addCottageOneEvent(cottageOneImagesTemp[i]));
	}
	
	const cottageTwoImagesTemp = document.querySelector('.cottage-2-images').children;
	//build the cottage galleries
	for (i = 0; i < cottageTwoImagesTemp.length; i++) {
		 cottageTwoImages.push(addCottageTwoEvent(cottageTwoImagesTemp[i]));
	}
	
}

//add event listners to the images to change the image
function addcampsiteEvents (element) {
	'use strict';
	element.addEventListener('click', event => {
		changeCampSiteImage(event);
	});
	return element;
}

//changes the feature image to thr current image picked
function changeCampSiteImage(event) {
	'use strict';
	campsiteFeatureImage.setAttribute('src', event.target.getAttribute('src'));
}

//adds the event listeners to the cottage one images for first cottage
function addCottageOneEvent(img) {
	'use strict';
	img.addEventListener('click', event => {
		changeCottageOneImage(event);
	});
	return img;
}

//changes the image for the first cottage to the image clicked
function changeCottageOneImage(event) {
	'use strict';
	cottageOneFeatureImage.setAttribute('src', event.target.getAttribute('src'));
}

//adds the event listeners to the cottage one images for second cottage
function addCottageTwoEvent(img) {
	'use strict';
	img.addEventListener('click', event => {
		changeCottageTwoImage(event);
	});
	return img;
}

//changes the image for the first cottage to the image clicked
function changeCottageTwoImage(event) {
	'use strict';
	cottageTwoFeatureImage.setAttribute('src', event.target.getAttribute('src'));
}

//add functions to the feature images to change to the next image when clicked
campsiteFeatureImage.addEventListener('click', event => {
	'use strict';
	for (let i = 0; i < campSiteImages.length; i++) {
		if (campSiteImages[i].getAttribute('src') === event.target.getAttribute('src')) {
			let x = i + 1;
			if (x >= campSiteImages.length) {
				x = 0;
			}
			campsiteFeatureImage.setAttribute('src', campSiteImages[x].getAttribute('src'));
			break;
		}
	}
});

cottageOneFeatureImage.addEventListener('click', event => {
	'use strict';
	for (let i = 0; i < cottageOneImages.length; i++) {
		if (cottageOneImages[i].getAttribute('src') === event.target.getAttribute('src')) {
			let x = i + 1;
			if (x >= cottageOneImages.length) {
				x = 0;
			}
			cottageOneFeatureImage.setAttribute('src', cottageOneImages[x].getAttribute('src'));
			break;
		}
	}
});

cottageTwoFeatureImage.addEventListener('click', () => {
	'use strict';
	for (let i = 0; i < cottageTwoImages.length; i++) {
		if (cottageTwoImages[i].getAttribute('src') === event.target.getAttribute('src')) {
			let x = i + 1;
			if (x >= cottageTwoImages.length) {
				x = 0;
			}
			cottageTwoFeatureImage.setAttribute('src', cottageTwoImages[x].getAttribute('src'));
			break;
		}
	}
});
