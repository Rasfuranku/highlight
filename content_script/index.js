(function() {
    if (window.hasRun) {
        return;
    }
    window.hasRun = true;
    
    window.addEventListener("click", selectText);
    
    var addRule = (function (style) {
        var sheet = document.head.appendChild(style).sheet;
        return function (selector, css) {
            var propText = typeof css === "string" ? css : Object.keys(css).map(function (p) {
                return p + ":" + (p === "content" ? "'" + css[p] + "'" : css[p]);
            }).join(";");
            sheet.insertRule(selector + "{" + propText + "}", sheet.cssRules.length);
        };
    })(document.createElement("style"));

    function selectText() {
        let selection = '';
        if (window.getSelection) {
            selection = window.getSelection();
            const nameElement = selection.anchorNode.parentElement.localName;

            addRule(`${nameElement}::selection`, {
                background: "green",
            });
            console.log(selection.toString());
            console.log(selection);æ
        }
    };
    
}());
