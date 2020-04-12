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
            const sliceHT = wholeText.slice(indexHighlightText);
            const lastIndexHighlightText = wholeText.lastIndexOf(highlightText);

            if(indexHighlightText == 0) {
                replaceHTML(wholeText, wholeText, nameElementSelected);
                return;
            }
            
            const tags = findHTMLTags(wholeText);
            
            let currentHT = ""
            if(tags && tags.length) {
                //All the tricky shit to replace the content

                let lengthBeforeTag = 0;
                let textBeforeTag = "";

                for (const tag of tags) {
                    const indexTag = wholeText.indexOf(tag[0]);
                    //Find firs tag
                    const lastIndexTag = tag.index + tag[0].length;
                    if(indexHighlightText < indexTag && lastIndexTag <= lastIndexHighlightText) {
                        textBeforeTag = wholeText.slice(indexHighlightText, indexTag);
                        currentHT = textBeforeTag + tag[0];
                    }else if (lastIndexTag > lastIndexHighlightText) {
                        
                    }
                }
            }

            const HTWithHTML = currentHT;

            replaceHTML(wholeText, highlightText);
        }

        function replaceHTML(wholeText, text, nameElementSelected) {
            const newHighlightedText = `<span class="ht-highlighted">${text}</span>`;
            const newInnerHtml = wholeText.replace(text, newHighlightedText);
            const newElement = document.createElement(nameElementSelected);

            newElement.innerHTML = newInnerHtml;
            event.target.replaceWith(newElement);
        }

        function findHTMLTags(wholeText) {
            const regexTags = /(<[^>]+>(.*?)<\/[a-z]>)/g;
            let tags = [...wholeText.matchAll(regexTags)];

            return tags;
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