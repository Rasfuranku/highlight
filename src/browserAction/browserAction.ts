import { browser } from 'webextension-polyfill-ts';
function start() {
	function addCss() {
		browser.tabs.insertCSS({"file": "../src/contentScript/contentScript.css"});
	}

	function onError(error: any) {
		console.log(error);
	}

	browser.tabs.executeScript({"file": "./content.js"})
	.then(addCss)
	.catch(onError);
}

start();
