(function () {
  'use strict';

  function moveElements() {
    const atf = document.querySelector('#above-the-fold');
    if (!atf || !atf.parentNode) return;

    const panel = document.querySelector('#panels');
    const chat = document.querySelector('#chat-container');
    const playlist1 = document.querySelector('#secondary #secondary-inner #playlist')
    const playlist2 = document.querySelector('#secondary #playlist');

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
      subtree: true
    });
  }

  function init() {
    moveElements();
    observe();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }

  document.addEventListener('yt-navigate-finish', moveElements, { passive: true });
})();
