

/**
 * Keeps track of added event listeners
 */
const listener = null;

/**
 * Binds a callback to a configurable double click event
 * @param {Function} callback
 * @param {Object} settings
 */
export function onDoubleClick(callback, settings) {
  const defaultSettings = {timeout: 300};
  Object.assign(settings, defaultSettings);
  let clickTimeout = null;

  document.addEventListener('click', (event) => {
    // Close popup on click outside
    if (popup.isOpen && !popup.node.contains(event.target)) {
      popup.close();
    }

    // Lookup selected word on double click
    if (clickTimeout !== null && !popup.isOpen) {
      popup.fromHighlightedText();
    } else {
      clickTimeout = setTimeout(() => {
        clearTimeout(clickTimeout);
        clickTimeout = null;
      }, 250);
    }
  });
}

export function onClickOutside()