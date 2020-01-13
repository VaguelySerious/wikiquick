/* eslint-disable require-jsdoc */
import './styles/styles.sass';
import WikiAPI from './wikiapi.js';

const wikiAPI = new WikiAPI();

/**
 * Stuff
 */
class WikiPopup {
  constructor(jsonFetchFunction) {
    this.node = document.createElement('div');
    this.node.id = 'wikiquickpopup';
    this.node.className = 'wqtop';
    this.language = 'en';
    this.get = jsonFetchFunction;
    this.isOpen = false;
  }
  close() {
    this.node.remove();
    // TODO Remove this after deleting other usages
    const marker = document.querySelector('#wikiquickmarker');
    if (marker) {
      marker.remove();
    }
    this.isOpen = false;
  }
  open() {
    document.body.appendChild(this.node);
    this.isOpen = true;
  }
  setContent(html, image) {
    // TODO Image
    this.node.innerHTML = html;
  }
  setPosition(range) {
    const bounds = range.getBoundingClientRect();
    const marker = document.createElement('span');
    marker.innerHTML = '&#xfeff;';
    marker.id = 'wikiquickmarker';
    range.insertNode(marker);

    const pos = findAbsolutePosition(marker);
    const left = bounds.x - this.node.clientWidth / 2 + bounds.width / 2;
    let top = pos.y - this.node.clientHeight - 17;

    if (bounds.top < (this.node.clientHeight + 30)) {
      top = pos.y + bounds.height + 10;
      this.node.className = 'wqbottom';
    }

    // TODO integrate "transform: translate(-50%, -100%);"
    this.node.style.left = left + 'px';
    this.node.style.top = top + 'px';
  }

  fromHighlightedText() {
    const selectionRef = document.getSelection();
    let selection = selectionRef.toString();
    const range = selectionRef.getRangeAt(0);
    // TODO Capitalize single words
    // TODO Return null if Sonderzeichen
    selection = selection.trim().replace(/\ /g, '_');
    this.setPosition(range);

    wikiAPI.lookup(selection, (res) => {
      this.setContent(res.text);
      this.open();
    });
  }
}

function findAbsolutePosition(node) {
  let curleft = 0; let curtop = 0;

  // Sum offsets from node to document root
  if (node.offsetParent) {
    do {
      curleft += node.offsetLeft;
      curtop += node.offsetTop;
    }
    while (node = node.offsetParent);
  }

  return {
    x: curleft,
    y: curtop,
  };
}

// TODO Bind click on popup to do nothing
// TODO Bind click on document to close popup
const popup = new WikiPopup();

let clickTimeout = null;
document.addEventListener('click', (event) => {
  console.log('click');
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
    }, 300);
  }
});
