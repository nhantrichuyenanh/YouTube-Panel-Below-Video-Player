// ==UserScript==
// @name          YouTube Panel Below Video Player
// @namespace     https://github.com/nhantrichuyenanh
// @homepageURL   https://github.com/nhantrichuyenanh
// @icon          https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/3840px-YouTube_full-color_icon_%282017%29.svg.png
// @version       1.0.0
// @description   Moves the panel from the right side to below the YouTube video player.
// @author        Nhân Trí
// @license       MIT
// @match         https://www.youtube.com/watch*
// @run-at        document-idle
// @grant         none
// ==/UserScript==

(function () {
	"use strict";

	function moveElements() {
		const atf = document.querySelector("#above-the-fold");
		if (!atf || !atf.parentNode) return;

		const panel = document.querySelector("#panels");
		const chat = document.querySelector("#chat-container");
		const playlist1 = document.querySelector(
			"#secondary #secondary-inner #playlist",
		);
		const playlist2 = document.querySelector("#secondary #playlist");

		if (panel && panel.parentNode !== atf.parentNode) {
			atf.parentNode.insertBefore(panel, atf);
		}

		if (chat && chat.parentNode !== atf.parentNode) {
			atf.parentNode.insertBefore(chat, atf);
		}

		if (playlist1 && playlist1.parentNode !== atf.parentNode) {
			atf.parentNode.insertBefore(playlist1, atf);
		}

		if (playlist2 && playlist2.parentNode !== atf.parentNode) {
			atf.parentNode.insertBefore(playlist2, atf);
		}
	}

	function observe() {
		const obs = new MutationObserver(moveElements);
		obs.observe(document.documentElement, {
			childList: true,
			subtree: true,
		});
	}

	function init() {
		moveElements();
		observe();
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", init, { once: true });
	} else {
		init();
	}

	document.addEventListener("yt-navigate-finish", moveElements, {
		passive: true,
	});
})();
