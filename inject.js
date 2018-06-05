(function() {

  var clickTimeout = null;
  var popupOpen = false;
  var popupNode = null;

  function getPopup(event) {

    var selection = document.getSelection().toString();
    selection = linkEncode(selection);
    if (!selection) return;

    popupOpen = true;
    GET('https://de.wikipedia.org/api/rest_v1/page/summary/Audiovisuelle_Medien', (res) => {
      apiData = JSON.parse(res);
      insertPopup(apiData.extract_html);
      popupOpen = false; // TODO Remove
    });
  }

  function insertPopup(html) {
    // TODO Actually display popup
    var div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.top = 400;
    div.style.left = 400;
    div.style.height = 200;
    div.style.width = 200;
    div.textContent = html;
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
      console.log('lala');
    } else {
      clickTimeout = window.setTimeout(() => {
        clickTimeout = null;
      }, 250);
    }
  });

})();
