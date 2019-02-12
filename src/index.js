import './styles/styles.sass';

// (function() {
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
      this.node.innerHTML = html;
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

      // TODO integrate "transform: translate(-50%, -100%);"
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
    var curleft = 0, curtop = 0;
    
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
  let popup = new WikiPopup(fetchUrl);
  
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
