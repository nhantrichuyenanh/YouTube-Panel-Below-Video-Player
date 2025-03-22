(function() {
    'use strict';

    let observer = null;

    // Function to find elements in the main document and shadow DOMs
    function findElement(elementId) {
        // Check main document
        let element = document.getElementById(elementId);
        if (element) return element;

        // Recursively search shadow DOMs
        const walker = document.createTreeWalker(document.documentElement, Node.ELEMENT_NODE, null, false);
        let node;
        while ((node = walker.nextNode())) {
            if (node.shadowRoot) {
                const shadowElement = node.shadowRoot.getElementById(elementId);
                if (shadowElement) return shadowElement;
                // Search nested shadow DOMs
                const nestedElement = findElementInShadow(node.shadowRoot, elementId);
                if (nestedElement) return nestedElement;
            }
        }
        return null;
    }

    function findElementInShadow(root, elementId) {
        const element = root.getElementById(elementId);
        if (element) return element;

        const walker = root.createTreeWalker(root, Node.ELEMENT_NODE, null, false);
        let node;
        while ((node = walker.nextNode())) {
            if (node.shadowRoot) {
                const shadowElement = node.shadowRoot.getElementById(elementId);
                if (shadowElement) return shadowElement;
                const nestedElement = findElementInShadow(node.shadowRoot, elementId);
                if (nestedElement) return nestedElement;
            }
        }
        return null;
    }

    function movePanel() {
        const panel = findElement('panels');
        const atf = findElement('above-the-fold');
        if (panel && atf && atf.parentNode) {
            // Ensure the panel hasn't already been moved
            if (panel.nextSibling !== atf) {
                atf.parentNode.insertBefore(panel, atf);
            }
        }
    }

    function startObservation() {
        if (observer) return;

        // Check immediately in case elements are already present
        movePanel();

        // Set up MutationObserver to watch for dynamic changes
        observer = new MutationObserver(movePanel);
        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
    }

    function stopObservation() {
        if (observer) {
            observer.disconnect();
            observer = null;
        }
    }

    function handleUrlChange() {
        if (window.location.href.includes('/watch?v=')) {
            startObservation();
        } else {
            stopObservation();
        }
    }

    // Initial check
    handleUrlChange();

    // Listen for History API changes
    window.addEventListener('popstate', handleUrlChange);
    const originalPushState = history.pushState;
    history.pushState = function(...args) {
        originalPushState.apply(history, args);
        handleUrlChange();
    };
    const originalReplaceState = history.replaceState;
    history.replaceState = function(...args) {
        originalReplaceState.apply(history, args);
        handleUrlChange();
    };

    // Observe body for SPA navigation changes
    const bodyObserver = new MutationObserver(handleUrlChange);
    bodyObserver.observe(document.body, { childList: true, subtree: true });

})();