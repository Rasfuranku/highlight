function start() {
    function selectText() {
        //tab actions (?)
    };

    function onError(error) {
        console.log(error);
    }

    browser.tabs.executeScript({file: "../content_script/index.js"})
    .then(selectText)
    .catch(onError);

};

start();
