// (function() {
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
    '} #wikiquickpopup li {list-style: inherit;padding:0;' +
    '}' + keyframes + '</style>';

  class WikiPopup {
    constructor(styles, jsonFetchFunction) {
      this.node = document.createElement('div');
      this.node.id = 'wikiquickpopup';
      this.node.className = 'wqtop';
      this.styles = styles;
      this.language = 'en';
      this.get = jsonFetchFunction;
      this.isOpen = false;
    }
    close() {
      this.node.remove();
      // TODO Remove this after deleting other usages
      var marker = document.querySelector('#wikiquickmarker');
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
      this.node.innerHTML = styles + html;
    }
    setPosition(range) {
      var bounds = range.getBoundingClientRect();
      var marker = document.createElement('span');
      marker.innerHTML = '&#xfeff;';
      marker.id = 'wikiquickmarker';
      range.insertNode(marker);
      
      var pos = findAbsolutePosition(marker);
      var left = bounds.x - this.node.clientWidth / 2 + bounds.width / 2;
      var top = pos.y - this.node.clientHeight - 17;

      if (bounds.top < (this.node.clientHeight + 30)) {
        top = pos.y + bounds.height + 10;
        this.node.className = 'wqbottom';
      }

      this.node.style.left = left + 'px';
      this.node.style.top = top + 'px';
    }
    lookup(string) {
      var endpoint = `https://${this.language}.wikipedia.org/api/rest_v1/page/summary/${string}`; 
      this.get(endpoint, (res) => {
        this.setContent(res.extract_html, res.originalimage);
        this.open();
      });
    }
    fromHighlightedText() {
      var selectionRef = document.getSelection();
      var selection = selectionRef.toString();
      var range = selectionRef.getRangeAt(0);
      // TODO Capitalize single words
      // TODO Return null if Sonderzeichen
      selection = selection.trim().replace(/\ /g, '_');
      this.setPosition(range);
      this.lookup(selection);
    }
  }

  function fetchUrl(url, callback) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function onResponse() {
      if (this.readyState === 4) {
        if (this.status === 200) {
          callback(JSON.parse(this.responseText));
        } else {
          callback({extract_html: "Failed to look up this word"});
        }
      }
    };
    req.open('GET', url, true);
    req.send();
  }

  function findAbsolutePosition(node) {
    var curleft = curtop = 0;
    
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
      y: curtop
    };
  }

  // TODO Bind click on popup to do nothing
  // TODO Bind click on document to close popup
  let popup = new WikiPopup(styles, fetchUrl);
  
  var clickTimeout = null;
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

// })();
