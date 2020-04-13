import { browser } from "webextension-polyfill-ts";

browser.contextMenus.create({
	"id": "log-selection",
	"title": "Save Reference",
	"contexts": ["all", "selection"],
});

browser.contextMenus.onClicked.addListener((info, tab) => {
	switch (info.menuItemId) {
		case "log-selection":
		break;
	}
});

function notify(message: any) {
  	// console.log(message);
}

browser.runtime.onMessage.addListener(notify);
