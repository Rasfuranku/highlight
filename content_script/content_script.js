// import { sampleInnerHTML } from '../test/string';
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
            const indexHighlightText = wholeText.indexOf(highlightText);

            if (indexHighlightText > -1) {
                replaceHighlightedParentElement(selection.focusNode.parentElement.innerHTML, highlightText, indexHighlightText, nameElementSelected)
            }
        }

        function colorHighLighted(nameElementSelected) {
            addRule(`${nameElementSelected}::selection`, {
                background: "aqua",
            });
        }

        function replaceHighlightedParentElement(innerHTML, highlightText, indexHighlightText, nameElementSelected) {
            const wholeText = innerHTML.repeat(1);            
            const tags = findHTMLTags(wholeText);
            
            if(tags && tags.length) {
                let txtToReplace = "";
                let beforeWholeText = "";
                let afterWholeText = "";
                let beforeHT = "";
                let afterHT = "";
                for (tag of tags) {
                    const TagComplete = tag[0];
                    const tagContent = tag[2];
                    const indexFoundInTag = highlightText.indexOf(tagContent);
                    if (indexFoundInTag > - 1) {
                        beforeHT = highlightText.slice(0, indexFoundInTag);
                        afterHT = highlightText.slice(indexFoundInTag + tagContent.length);
    
                        const indexTag = wholeText.indexOf(TagComplete);
                        beforeWholeText = wholeText.slice(0, indexTag);
                        afterWholeText = wholeText.slice(indexTag + TagComplete.length);
    
                        txtToReplace = txtToReplace + beforeHT + TagComplete + afterHT;
                        if (wholeText.indexOf(txtToReplace) > - 1)
                            replaceHTML(wholeText, txtToReplace, nameElementSelected);
                    }
                }                
            }

            replaceHTML(wholeText, highlightText, nameElementSelected);
        }

        function findHTMLTags(wholeText) {
            const regexTags = /(<[^>]+>(.*?)<\/[a-z]>)/g;
            let tags = [...wholeText.matchAll(regexTags)];

            return tags;
        }

        function replaceHTML(wholeText, text, nameElementSelected) {
            const newHighlightedText = `<span class="ht-highlighted">${text}</span>`;
            const newInnerHtml = wholeText.replace(text, newHighlightedText);
            const newElement = document.createElement(nameElementSelected);

            newElement.innerHTML = newInnerHtml;
            event.target.replaceWith(newElement);
            return;
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