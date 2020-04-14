(function() {
	function highlightText(event: any) {
		if (window.getSelection) {
			const selection: Selection | null = window.getSelection();
			let highlightText: string | null;
			if (selection) {
				highlightText = selection.toString();
				if (selection && selection.type !== "Range" && highlightText === "") return;

					const nameElementSelected = selection!.focusNode!.parentElement!.localName;
					const wholeText = selection!.anchorNode!.parentElement!.textContent || "";

					colorHighLighted(nameElementSelected);
					const indexHighlightText = wholeText.indexOf(highlightText);

					if (indexHighlightText > -1) {
						replaceHighlightedParentElement(selection!.focusNode!.parentElement!.innerHTML,
							highlightText,
							indexHighlightText,
							nameElementSelected,
						);
					}
				}
			}

		function colorHighLighted(nameElementSelected: string) {
			addRule(`${nameElementSelected}::selection`, {
				"background": "aqua",
			});
		}

		function replaceHighlightedParentElement(innerHTML: string,
			highlightText: string,
			indexHighlightText: number,
			nameElementSelected: string,
		) {
			const wholeText = innerHTML.repeat(1);
			const tags: string[] = findHTMLTags(wholeText);

			if(tags && tags.length) {
				let txtToReplace = "";
				// let beforeWholeText = "";
				// let afterWholeText = "";
				let beforeHT = "";
				let afterHT = "";
				for (const tag of tags) {
					const TagComplete = tag[0];
					const tagContent = tag[2];
					const indexFoundInTag = highlightText.indexOf(tagContent);
					if (indexFoundInTag > - 1) {
						beforeHT = highlightText.slice(0, indexFoundInTag);
						afterHT = highlightText.slice(indexFoundInTag + tagContent.length);

						// const indexTag = wholeText.indexOf(TagComplete);
						// beforeWholeText = wholeText.slice(0, indexTag);
						// afterWholeText = wholeText.slice(indexTag + TagComplete.length);

						txtToReplace = txtToReplace + beforeHT + TagComplete + afterHT;
						if (wholeText.indexOf(txtToReplace) > - 1)
							replaceHTML(wholeText, txtToReplace, nameElementSelected);
					}
				}
			}

			replaceHTML(wholeText, highlightText, nameElementSelected);
		}

		function findHTMLTags(wholeText: any) {
			const regexTags = /(<[^>]+>(.*?)<\/[a-z]>)/g;
			const tags = [...wholeText.matchAll(regexTags)];

			return tags;
		}

		function replaceHTML(wholeText:string, text: string, nameElementSelected: string) {
			const newHighlightedText = `<span class="ht-highlighted">${text}</span>`;
			const newInnerHtml = wholeText.replace(text, newHighlightedText);
			const newElement = document.createElement(nameElementSelected);

			newElement.innerHTML = newInnerHtml;
			event.target.replaceWith(newElement);
			return;
		}
	};

	// Original source: https://stackoverflow.com/a/8051488/2151892
	const addRule = (function (style: HTMLStyleElement) {
		const sheet = document.head.appendChild(style).sheet as CSSStyleSheet;
		return function (selector: any, css: any) {
			const propText = typeof css === "string" ? css : Object.keys(css).map(function (p) {
				return p + ":" + (p === "content" ? "'" + css[p] + "'" : css[p]);
			}).join(";");
			sheet!.insertRule(selector + "{" + propText + "}", sheet!.cssRules.length);
		};
	})(document.createElement("style"));

	document.addEventListener("click", highlightText);
}());
