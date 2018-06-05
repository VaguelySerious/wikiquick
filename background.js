chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log("The color is green.");
  });
});

f=function(){
   console.log(window.getSelection().toString());
}
document.body.addEventListener('dblclick',f);
