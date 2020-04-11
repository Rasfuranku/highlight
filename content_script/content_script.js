(function() {
    if (window.hasRun) {
        return;
    }
    window.hasRun = true;

    function highlightText(event) {
        if (window.getSelection) {
            const selection = window.getSelection();
            const highlightText = selection.toString();

            if (selection.type !== "Range" && highlightText === "") return;

            const nameElementSelected = selection.focusNode.parentElement.localName;
            const wholeText = selection.anchorNode.parentElement.textContent;
            
            colorHighLighted(nameElementSelected);

            if (wholeText.indexOf(highlightText) > -1) {
                replaceHighlightedParentElement(selection.focusNode.parentElement.innerHTML, highlightText, nameElementSelected, event.target)
            }
        }

        function colorHighLighted(nameElementSelected) {
            addRule(`${nameElementSelected}::selection`, {
                background: "aqua",
            });
        }

        function replaceHighlightedParentElement(innerHTML, highlightText, nameElementSelected, target) {
            const wholeText = innerHTML.repeat(1);
            const newHighlightedText = `<span class="ht-highlighted">${highlightText}</span>`;
            const newInnerHtml = wholeText.replace(highlightText, newHighlightedText);
            const newElement = document.createElement(nameElementSelected);

            newElement.innerHTML = newInnerHtml;
            target.replaceWith(newElement);
        }
    };

    //Original source: https://stackoverflow.com/a/8051488/2151892
    const addRule = (function (style) {
        var sheet = document.head.appendChild(style).sheet;
        return function (selector, css) {
            var propText = typeof css === "string" ? css : Object.keys(css).map(function (p) {
                return p + ":" + (p === "content" ? "'" + css[p] + "'" : css[p]);
            }).join(";");
            sheet.insertRule(selector + "{" + propText + "}", sheet.cssRules.length);
        };
    })(document.createElement("style"));

    document.addEventListener("click", highlightText);
}());
