// ==UserScript==
// @match http://*/*
// @match https://*/*
// ==/UserScript==

/***
 * User script for keyboard navigation using vim-like keybindings
 * Inspired by shift-arrow browse mode in old versions of Opera.
 *
 * Principle of operation: 
 * All urls on the page are indexed using getBoundingClientRect, which gives the 
 * link's coordinates on the page as rendered. We use this information to navigate
 * between links in a two-dimensional space. 
 *
 * TODO: generate some lattice data structure for browsing nearest link in two
 * dimensions.
 *
 * TODO: enable link clicking with enter key
 * TODO: try to disable for hidden iframes
 * TODO: develop some heuristic so we don't get lost amonst hidden or 
 * 	irrelevant links.
 */

var urls = [];
console.log( 'loading user script for browser nav' );
console.log('found ' + document.links.length + ' links on the page');
for(var i=0; i<document.links.length; i++) {
	var top = document.links[i].getBoundingClientRect().top;
	urls.push({top: top, dom: document.links[i]});
}

/** 
 * the row that is in focus for operations
 * global. bad.
 */
var currentrow;

/**
 * Only activate script for /, newest, news, and x. Pagination
 * uses the /x path with a timestamp id.
 */
console.log('window.location:');
console.log(window.location.href);
__main();

/*
 * Main function is prefixed here. It's bad form to have all
 * of these functions out in the main namespace, but for some
 * reason opera loads user scripts for local files and I get 
 * conflicts sometimes.
 */
function __main() {
	document.addEventListener( 'keypress', onKeydown, false ); 

	currentrow = 0;
	highlight(urls[currentrow].dom);
}

/**
 * Abstract the act of highlighting and unhighlighting
 * a DOM element somewhat
 */
function highlight( el ) {
	el.style.backgroundColor = "rgba(255,102,0,0.3)"
}
function unhighlight( el ) {
	el.style.backgroundColor = null;
}

function moveDown() {
	unhighlight(urls[currentrow].dom);
	currentrow += 1;
	highlight(urls[currentrow].dom);
}
function moveUp() {
	unhighlight(urls[currentrow].dom);
	currentrow -= 1;
	highlight(urls[currentrow].dom);
}

/**
 * Handler for key commands, currently j,k,x
 */
function onKeydown( evt ) {
	console.log( evt.keyCode + ' ' + evt.charCode );
	// firefox uses charCodes for printable chars
	// keyCode will be 0. TODO: should try to do this the right way
	var keyCode = evt.keyCode == 0 ? evt.charCode : evt.keyCode;	

	// j - move down
	if( keyCode == 106 ) {
		moveDown();
	}
	
	// k - move up
	else if( keyCode == 107 ) {
		moveUp();
	}

	// enter - browse to story 
	else if( keyCode == 13 ) {
		browse();
	}
}

/**
 * Used by 'enter' command to browse to a story 
 */
function browse() {
	var link = urls[currentrow].dom.href;
	window.location = link;
}

