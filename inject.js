(function() {

  var clickTimeout = null;
  var popupOpen = false;
  var popupNode = null;

  function getPopup(event) {

    var selection = document.getSelection().toString();
    selection = linkEncode(selection);
    if (!selection) return;

    popupOpen = true;
    GET('https://de.wikipedia.org/api/rest_v1/page/summary/' + selection, (res) => {
      apiData = JSON.parse(res);
      insertPopup(apiData.extract_html, apiData.originalimage);
      popupOpen = false; // TODO Remove
    });
  }

  function insertPopup(html, imageURL) {
    // TODO Actually display popup
    // TODO If there is image insert it
    var div = document.createElement('div');
    div.setAttribute('id', 'wikiquickpopup');
    var style = '<style>#wikiquickpopup{position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);background: white;padding: 20px;box-shadow: 0 2px 5px -2px rgba(0,0,0,0.4), 0 10px 25px rgba(0,0,0,0.2);font-size: 16px;border-radius: 5px;max-width: 400px;}</style>';
    div.innerHTML = style + html;
    document.body.appendChild(div);
    popupNode = div;
  }

  // TODO On click outside popupNode, close popupNode if open

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
        } else callback();
      }
    };
    req.open('GET', url, true);
    req.send();
  }

  document.addEventListener('click', (event) => {
    if (clickTimeout !== null && !popupOpen) {
      getPopup(event);
    } else {
      clickTimeout = window.setTimeout(() => {
        clickTimeout = null;
      }, 250);
    }
  });

})();
