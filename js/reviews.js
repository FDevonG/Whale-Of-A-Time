/* jshint esversion: 6 */

class Review {
	
	constructor (name, date, review, rating) {
		'use strict';
		this.name = name;
		this.date = date;
		this.review = review;
		this.rating = rating;
	}
	
}

const reviews = [
	new Review('Bailey Anne Kinnear', 'August 5, 2017', '', 5),
	new Review('Gwydion Morris', 'August 6, 2017', '', 5),
	new Review('Carter Thurber', 'August 5, 2017', 'The sign is nice. View is beautiful. Nice and open. Certainly was a time. The management could learn a lesson or two regarding public relations.', 3),
	new Review('Silke Alt', 'August 28, 2017', 'We were the FIRST guests at this beautiful campground. Thank you very much for your help and your hospitality. All the best for you and your children.', 5),
	new Review('Lawna Howard Sullivan', 'August 18, 2017', 'Outstanding spot! Beautiful view and the friendliest hosts you will ever meet!', 5),
	new Review('Debbie Johnston McGinley', 'September 1, 2018', '👍👍 view is unbelievable', null),
	new Review('Chad Dorey', 'August 15, 2018', 'The views and staff are great!!! Look forward to next year!!', 5),
	new Review('Carl Bedard', 'September 21, 2018', 'I realy like this place the people and the view i recommand it', null),
	new Review('Mary Boberry', 'July 17, 2018', 'Beautiful view and lovely hiking. Very friendly staff, welcoming and hospitable. We had a great stay.', 5),
	new Review('Marion Nickerson', 'August 13, 2018', "absolutely amazing in every way imaginable!! the views & the hospitality were above anything I have ever experienced :) Can't wait to visit again.", 5),
	new Review('June Huhn', 'August 30, 2017', "After being on our motorcycles for 1 year, this campground is definitely in our top 5. In many respects, it really is number 1! The hosts are so accommodating, driving us around the campground to check for the perfect site and road conditions. Sure had the perfect site. We didn't see any whales but heard them blowing - they definitely are there. Ask Gail to show you a photo of one breaching - we missed it because we were in a pay whale boat at the time. Can't wait to return. We hope Gail, Reid, Oliver, Seven and Six(?) all the best. I'm sure it will be a smashing success.", 5),
	new Review('Desiree Ella Atwood', 'August 12, 2018', 'Great spot, the view is unbelievable! Owners are extremely friendly and go above and beyond for their guests. Cannot wait to go back next summer!', null),
	new Review('Lisa Turgeon', 'August 29, 2018', 'The campground has a beautiful setting right on the ocean. The hosts are super nice. We stayed one of the cottages and it was just perfect. Good luck in getting your comfort building completed.', 4),
	new Review('Katherine MacGillivray', 'August 1, 2018', 'Beautiful location! We stayed in one of the cottages, it was spotless and had everything you would need. Our only regret was we didn’t have more time to stay! We will definitely return', 5),
	new Review('Lauren Deno', 'September 4, 2017', "Such a good time I really didn't want to leave. The views, on both sides, are absolutely spectacular and you couldn't find a more picturesque experience. Super accommodating, easy to find off the road, close to the ferry and campsites are immaculate. I would give this place 10 stars if I could. Book now!", 5),
	new Review('Sarah Saunders', 'August 19, 2018', 'Gorgeous views, breaching whales from your campsite, super friendly owners? This place is amazing. Looking forward to coming back when they have the rest of their facilities up and running!', null),
	new Review('Angie Sanford Dorey', 'August 12, 2018', 'We had such an amazing time! Pitched our tent in front of the ocean and we were up all night with the whales! What a show! The kids loved the hikes and watching the seals and whales from around our bonfire. One of our top places to camp!', 5),
	new Review('Lynn Sawyer', 'August 24, 2018', 'Magnificent views, lovely helpful hosts.', null),
	new Review('Annette Arnold Wiley', 'September 3, 2018', 'The perfect spot! Beautiful views, great location and everything else you may need they will look after!! Home is beautiful', null),
];

const reviewItems = document.querySelectorAll('.review');

const timer = setInterval(changeReviews, 20000);

function changeReviews () {
	'use strict';
	for (let i = 0; i < reviewItems.length; i++) {//loop through the array of review items on html page
		
		const reviewChildren = reviewItems[i].children;//put all the children of each of the reivew items into an array
		
		const randomIndex = Math.floor(Math.random() * Math.floor(reviews.length));//get a new index at random
		const review = reviews[randomIndex];//store the review class at the index in a var
		
		for (let x = 0; x < reviewChildren.length; x++) {//loop through the new children array
			if (reviewChildren[x].classList.contains('review-name')) {
				reviewChildren[x].innerHTML = review.name;//add the name to proper element
			}
			if (reviewChildren[x].classList.contains('review-date')) {
				reviewChildren[x].innerHTML = review.date;//add the date to the proper element
			}
			//deal with the stars
			if (reviewChildren[x].classList.contains('review-text')) {
				reviewChildren[x].innerHTML = review.review;//add the review to the proper element
			}
			let reviewStars = [];//initilize a empty array
			if (reviewChildren[x].classList.contains('review-stars')) {
				reviewStars = reviewChildren[x].firstElementChild.children;//store the reveiw star list items in an array
				//clear the star classes off the elements in the newly created array
				for(let s = 0; s < reviewStars.length; s++) {
					const star = reviewStars[s].firstElementChild;
					if (star.classList.contains('review-star-good')) {
						star.classList.remove('review-star-good');
					}
					if (star.classList.contains('review-star-bad')) {
						star.classList.remove('review-star-bad');
					}
				}
				
//				add the proper classes to the star elements
				if (review.rating !== null) {
					reviewStars[0].parentElement.style.display = 'grid';//change the list display to grid if the review has a rating
					for (let t = 0; t < review.rating; t++) {//loop through and add the proper number of good stars
						const star = reviewStars[t].firstElementChild;//store each star in a var
						star.classList.add('review-star-good');//add the good class
					}
					if (review.rating !== 5) {//loop through the stars to add the negative stars
						for (let f = 4; f >= review.rating; f--) {//loop through and add the negative stars
							const star = reviewStars[f].firstElementChild;//store each star element in a var
							star.classList.add('review-star-bad');//add the bad class to the star
						}
					}
				} else {
					reviewStars[0].parentElement.style.display = 'none';//if the review doesnt have stars then hide it away
				}
				
			}
			
		}
	}
	if (checkForDoubles()) {
		changeReviews();
	}
}

//we do not want there to be anymore than 1 of the same review showing at any given time
function checkForDoubles () {
	'use strict';
	let doubles = false;//a boolean to be set approparitly and returned
	
	//we will loop through the review items looking for double reviews
	for (let i = 0; i < reviewItems.length; i++) {
		let reviewText = '';
		const reviewItemChildren = reviewItems[i].children;
		
		//loop through the new children array to retrieve and store the review text to be compared
		for (let x = 0; x < reviewItemChildren.length; x++) {
			if (reviewItemChildren[x].classList.contains('review-text')) {
				reviewText = reviewItemChildren[x].textContent;
				break;
			}
		}
		//now that we have the review text we need to loop through and compare it
		for (let t = 0; t < reviewItems.length; t++) {
			//make sure we do not compare the elemenet against itself 
			if (t !== i) {
				const childrenToCompare = reviewItems[t].children;
				//loop through the children comparing the review texts
				for (let s = 0; s < childrenToCompare.length; s++) {
					if (childrenToCompare[s].classList.contains('review-text')) {
						if (reviewText === childrenToCompare[s].textContent) {
							doubles = true;
							break;
						} else {
							break;
						}
					}
				}
			}
		}
	}
		 
	return doubles;
		 
}
