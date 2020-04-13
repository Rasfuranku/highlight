import { browser } from 'webextension-polyfill-ts';
function start() {
    function addCss() {
        browser.tabs.insertCSS({"file": "../content_script/content_script.css"});
    };

    function onError(error: any) {
        console.log(error);
    };

    browser.tabs.executeScript({file: "../content_script/content_script.js"})
    .then(addCss)
    .catch(onError);

}

start();
