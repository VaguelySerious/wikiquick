/**
 * Creates a View-Model type popup that can be
 * altered and positioned over methods
 */

const node = document.createElement('div');
node.id = 'wikiquickpopup';
node.className = 'wqtop';

/**
 * Given a range, attach the popup to the DOM at the correct position
 * @param {*} ele
 * @param {*} range
 */
export function attach(ele, range) {
  document.body.appendChild(this.node);
  this.isOpen = true;

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

/**
 * Remove the popup from the DOM
 */
export function detach() {
  this.node.remove();
  // TODO Remove this after deleting other usages
  const marker = document.querySelector('#wikiquickmarker');
  if (marker) {
    marker.remove();
  }
  this.isOpen = false;
}

/**
 * Remove the popup from the DOM
 */
export function setLoading(bool) {
  this.node.innerHTML = 'Loading...';
}

export function setContent(html) {
  this.node.innerHTML = html;
}

//   fromHighlightedText() {
//     const selectionRef = document.getSelection();
//     let selection = selectionRef.toString();
//     const range = selectionRef.getRangeAt(0);
//     // TODO Capitalize single words
//     // TODO Return null if Sonderzeichen
//     selection = selection.trim().replace(/\ /g, '_');
//     this.setPosition(range);

//     wikiAPI.lookup(selection, (res) => {
//       this.setContent(res.text);
//       this.open();
//     });
//   }
