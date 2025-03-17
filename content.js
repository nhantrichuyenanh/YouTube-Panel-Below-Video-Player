(function() {
    'use strict';

    function movePanel() {
        const panel = document.getElementById('panels');
        const atf = document.getElementById('above-the-fold');
        if (panel && atf) {
	    // tried doing with ytd-player, player-container, player-container-inner, player-container-outer, and player but they all broke the panel ui
            atf.parentNode.insertBefore(panel, atf);
            clearInterval(checkExist);
        }
    }

    // check every half a sec if the elements exist (handles dynamic page loading)
    const checkExist = setInterval(movePanel, 500);
})();