(function () {
  'use strict';

  function moveElements() {
    const atf = document.querySelector('#above-the-fold');
    if (!atf || !atf.parentNode) return;

    const panel = document.querySelector('#panels');
    const chat = document.querySelector('#chat-container');
    const playlist = document.querySelector('#secondary #secondary-inner #playlist') || document.querySelector('#secondary #playlist');

    if (panel && panel.parentNode !== atf.parentNode) {
      atf.parentNode.insertBefore(panel, atf);
    }

    if (chat && chat.parentNode !== atf.parentNode) {
      atf.parentNode.insertBefore(chat, atf);
    }

    if (playlist && playlist.parentNode !== atf.parentNode) {
      atf.parentNode.insertBefore(playlist, atf);
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