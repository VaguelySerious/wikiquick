// TODO: if there's a JSON error once, the entire thing won't work again


(function() {
  var keyframes = '@keyframes wikiquickfadeinup {0% {opacity: 0;transform: translateY(10px);} 100% {opacity: 1; transform: translateY(0);}}' +
    '@keyframes wikiquickfadeindown {0% {opacity: 0;transform: translateY(-10px);} 100% {opacity: 1; transform: translateY(0);}}';
  var styles = '<style>#wikiquickpopup {background: white;border: 1px solid #eee;border-radius: 5px;box-shadow: 0 2px 5px -2px rgba(0,0,0,0.4), 0 10px 25px rgba(0,0,0,0.2);display: flex;flex-wrap: wrap;font-size: 14px;max-width: 300px;padding: 12px 20px;position: absolute;z-index:99999999999;font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";' +
    '} #wikiquickpopup::after {border: 7px solid transparent;content: "";left: 50%;margin-left: -7px;position: absolute;' +
    '} #wikiquickpopup::before {border: 8px solid transparent;content: "";left: 50%;margin-left: -8px;position: absolute;' +
    '} #wikiquickpopup.wqtop { animation: wikiquickfadeindown 0.2s ease-out;' +
    '} #wikiquickpopup.wqtop::after {border-bottom: 0;border-top-color: white;top: 100%;' +
    '} #wikiquickpopup.wqtop::before {border-bottom: 0;border-top-color: #e0e0e0;top: 100%;' +
    '} #wikiquickpopup.wqbottom { animation: wikiquickfadeinup 0.2s ease-out;' +
    '} #wikiquickpopup.wqbottom::after {border-bottom-color: white;border-top: 0;bottom: 100%;' +
    '} #wikiquickpopup.wqbottom::before {border-bottom-color: #e0e0e0;border-top: 0;bottom: 100%;' +
    '} #wikiquickpopup p {font-size: inherit;line-height: 1.4;margin: 0;width: 100%;' +
    '} #wikiquickpopup ul {list-style-type: disc;list-style-image: none;margin: 0.5em 0 0;padding-left:1.125em;width: 100%;' +
    '}' + keyframes + '</style>';


  var clickTimeout = null;
  var popupOpen = false;
  var popupNode = null;

  function getPopup(event) {
    var selectionRef = document.getSelection();
    var selection = selectionRef.toString();
    var range = selectionRef.getRangeAt(0);
    selection = linkEncode(selection);
    if (!selection) return;

    GET('https://en.wikipedia.org/api/rest_v1/page/summary/' + selection, (res) => {
      popupOpen = true;
      apiData = JSON.parse(res);
      insertPopup(range, apiData.extract_html, apiData.originalimage);
    });
  }

  function findAbsolutePosition(node) {
    var curleft = curtop = 0;

    if (node.offsetParent) {
      do {
        curleft += node.offsetLeft;
        curtop += node.offsetTop;
      }
      while (node = node.offsetParent)
    }

    return {
      x: curleft,
      y: curtop
    }
  }

  function insertPopup(range, html, imageURL) {
    // TODO Actually display popup
    // TODO If there is image insert it

    if (html) {
      var r = range.getBoundingClientRect();
      var div = document.createElement('div');
      div.id = 'wikiquickpopup';
      div.className = 'wqtop';
      div.innerHTML = styles + html;
      document.body.appendChild(div);

      popupNode = div;
      popupOpen = true;

      var marker = document.createElement('span');
      marker.innerHTML = '&#xfeff;';
      marker.id = 'wikiquickmarker';
      range.insertNode(marker);

      var pos = findAbsolutePosition(marker);
      var left = r.x - popupNode.clientWidth / 2 + r.width / 2;
      var top = pos.y - popupNode.clientHeight - 17;

      if (r.top < (popupNode.clientHeight + 30)) {
        top = pos.y + r.height + 10;
        popupNode.className = 'wqbottom';
      }

      popupNode.style.left = left + 'px';
      popupNode.style.top = top + 'px';
    }
  }

  function hidePopup() {
    if (popupNode) {
      popupNode.remove();
      popupNode = null;
      popupOpen = false;

      var marker = document.querySelector('#wikiquickmarker');
      if (marker) marker.remove();
    }
  }

  function linkEncode(word) {
    // TODO Capitalize single words
    // TODO Return null if Sonderzeichen
    return word.trim().replace(/\ /g, '_');
  }

  function GET(url, callback) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function onResponse() {
      if (this.readyState === 4) {
        if (this.status === 200) {
          callback(this.responseText);
        }
      }
    };
    req.open('GET', url, true);
    req.send();
  }

  document.addEventListener('click', (event) => {
    if (popupOpen && popupNode &&
        !popupNode.contains(event.target) && event.target !== popupNode) {
      hidePopup();
    }

    if (clickTimeout !== null && !popupOpen) {
      getPopup(event);
    } else {
      clickTimeout = window.setTimeout(() => {
        clickTimeout = null;
      }, 250);
    }
  });

})();
