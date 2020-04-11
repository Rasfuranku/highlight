browser.contextMenus.create({
    id: "log-selection",
    title: "Save Reference",
    contexts: ["all", "selection"]
});

browser.contextMenus.onClicked.addListener(function(info, tab) {
    console.log(tab);
    switch (info.menuItemId) {
      case "log-selection":
          console.log(info.selectionText);
        break;
    };
});

function notify(message) {
  console.log(message);
}

browser.runtime.onMessage.addListener(notify);
