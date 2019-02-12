// Inject "inject.js" into the page
chrome.tabs.onUpdated.addListener(function (tabId, changedInfo, tab) {
  if (changedInfo.status === 'complete') {
    chrome.tabs.executeScript(tab.id, {
      file: 'inject.js'
    });
  }
});
