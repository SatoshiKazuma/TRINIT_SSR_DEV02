window.webdata = {};
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    webdata[request.hostname] = request.size;
});

chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.create({ url: "popup.html" });
});