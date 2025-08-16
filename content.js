(function () {
  'use strict';

  function movePanel() {
    try {
      const panel = document.getElementById('panels') || document.querySelector('#panels');
      const atf = document.getElementById('above-the-fold') || document.querySelector('#above-the-fold');

      if (!panel || !atf || !atf.parentNode) return;
      if (panel.parentNode === atf.parentNode && panel.nextSibling === atf) return;
      atf.parentNode.insertBefore(panel, atf);
    } catch (e) {
    }
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    movePanel();
  } else {
    document.addEventListener('DOMContentLoaded', movePanel, { once: true });
  }

  document.addEventListener('yt-navigate-finish', movePanel, { passive: true });
})();