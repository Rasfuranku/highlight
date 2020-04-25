export default class Highlight {
	private selection: Selection | null = null;
	private textHighlighted: string | null = null;
	private event: any;

	public start() {
		document.addEventListener("click", (event) => this.highlightText(event));
	}

	private highlightText(event: any) {
		if (window.getSelection) {
			this.selection = window.getSelection();
			this.event = event;
			if (this.selection) {
				const parentElement = this.selection!.focusNode!.parentElement;
				this.textHighlighted = this.selection.toString();
				if (this.selection && this.selection.type !== "Range" && this.textHighlighted === "") return;

				const nameElementSelected = parentElement!.localName;
				const wholeText = parentElement!.textContent || "";

				this.addColorToHighLightedText(nameElementSelected);
				const indexHighlightText = wholeText.indexOf(this.textHighlighted);

				if (indexHighlightText > -1) {
					this.replaceHighlightedParentElement(
						parentElement!.innerHTML,
						this.textHighlighted,
						nameElementSelected,
					);
				}
			}
		}
	}

	private addColorToHighLightedText(nameElementSelected: string) {
		this.addRule(`${nameElementSelected}::selection`, {
			"background": "aqua",
		});
	}

	private replaceHighlightedParentElement(innerHTML: string, highlightedText: string, nameElementSelected: string) {
		const wholeText = innerHTML.repeat(1);
		const tags: string[] = this.findHTMLTags(wholeText);
		let highlightedTextCopy = highlightedText.slice(0);

		if(tags && tags.length) {
			let txtToReplace = "";
			for (const tag of tags) {
				const TagComplete = tag[0];
				const tagContent = tag[2];
				const indexFoundInTag = highlightedTextCopy.indexOf(tagContent);
				if (indexFoundInTag > - 1) {
					const beforeHT = highlightedTextCopy.slice(0, indexFoundInTag);
					const afterHT = highlightedTextCopy.slice(indexFoundInTag + tagContent.length);
					txtToReplace = txtToReplace + beforeHT + TagComplete;
					highlightedTextCopy = afterHT;
				}
			}
			txtToReplace = txtToReplace + highlightedTextCopy;
			if (wholeText.indexOf(txtToReplace) > - 1)
				this.replaceHTML(wholeText, txtToReplace, nameElementSelected);
		}

		this.replaceHTML(wholeText, highlightedText, nameElementSelected);
	}

	private findHTMLTags(wholeText: any) {
		const regexTags = /(<[^>]+>(.*?)<\/[a-z]>)/g;
		const tags = [...wholeText.matchAll(regexTags)];

		return tags;
	}

	private replaceHTML(wholeText:string, text: string, nameElementSelected: string) {
		const newHighlightedText = `<span class="ht-highlighted">${text}</span>`;
		const newInnerHtml = wholeText.replace(text, newHighlightedText);
		const newElement = document.createElement(nameElementSelected);

		newElement.innerHTML = newInnerHtml;
		this.event.target.replaceWith(newElement);
		return;
	}

	// Original source: https://stackoverflow.com/a/8051488/2151892
	addRule = (function (style: HTMLStyleElement) {
		const sheet = document.head.appendChild(style).sheet as CSSStyleSheet;
		return function (selector: any, css: any) {
			const propText = typeof css === "string" ? css : Object.keys(css).map(function (p) {
				return p + ":" + (p === "content" ? "'" + css[p] + "'" : css[p]);
			}).join(";");
			sheet!.insertRule(selector + "{" + propText + "}", sheet!.cssRules.length);
		};
	})(document.createElement("style"));
}

const highlight = new Highlight();
highlight.start();
