/* jshint esversion: 6 */

let windowTimer;
window.onresize = () => {
	'use strict';
	clearTimeout(windowTimer);
	windowTimer = setTimeout(() => changeFBPagePlugin(), 500);
};
 
window.onload = () => setTimeout(() => changeFBPagePlugin(), 1500);

function changeFBPagePlugin() {
	'use strict';
	const fbPage = document.querySelector(".fb-page");
	let width = document.querySelector('.facebook').offsetWidth;
	if (width > 500) {
		width = 500;
	}
	fbPage.setAttribute("data-width", width + 'px');
	fbPage.style.width = width + 'px';
	
//	}
	if (typeof FB !== 'undefined' ) {
		FB.XFBML.parse();
	}
}
