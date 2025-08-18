(function () {
  'use strict';

  function moveElements() {
    try {
      const panel = document.getElementById('panels') || document.querySelector('#panels');
      const chat = document.getElementById('chat-container') || document.querySelector('#chat-container');
      const atf = document.getElementById('above-the-fold') || document.querySelector('#above-the-fold');

      if (!atf || !atf.parentNode) return;

      if (panel && !(panel.parentNode === atf.parentNode && panel.nextSibling === atf)) {
        atf.parentNode.insertBefore(panel, atf);
      }

      if (chat && !(chat.parentNode === atf.parentNode && chat.nextSibling === atf)) {
        atf.parentNode.insertBefore(chat, atf);
      }
    } catch (e) {
    }
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    moveElements();
  } else {
    document.addEventListener('DOMContentLoaded', moveElements, { once: true });
  }

  document.addEventListener('yt-navigate-finish', moveElements, { passive: true });
})();