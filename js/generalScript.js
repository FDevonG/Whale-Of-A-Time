/* jshint esversion: 6 */

/***************************
GENERAL JAVASRIPT
***************************/


/***********
sticky-mobile-nav
***********/
// When the user scrolls the page, execute myFunction 
window.onscroll = () => checkSticky();

const siteHeading = document.querySelector('.site-heading');
// Get the navbar
const mobileNavbar = document.querySelector('.mobile-nav');
const mainNavBar = document.querySelector('.main-nav');

// Get the offset position of the navbar
let sticky = siteHeading.offsetHeight;

window.onresize = () => {
	'use strict';
	sticky = siteHeading.offsetHeight;
};

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function checkSticky() {
	'use strict';
	if (window.pageYOffset >= sticky) {
		mobileNavbar.classList.add("sticky");
		mainNavBar.classList.add("sticky");
	} else {
		mobileNavbar.classList.remove("sticky");
		mainNavBar.classList.remove("sticky");
	}
}



