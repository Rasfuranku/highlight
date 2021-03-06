import { browser } from 'webextension-polyfill-ts';
import Highlight from '../contentScript/contentScript';

export default class BrowserAction {
	start() {
		const highlight = new Highlight();
		highlight.start();
		browser.tabs.insertCSS({"file": "../src/contentScript/contentScript.css"});
		console.info("Application started");
	}

	onError(error: any) {
		console.error(error);
	}

	executeScript () {
		browser.tabs.executeScript({"file": "./content.js"})
		.then(this.start)
		.catch(this.onError);
	}
}
