window.webdata = [];
const carbonfpPerByte = 0.00000000167;
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	// webdata['hostname'] = request.hostname;
	// webdata['size'] = request.size;
	if (request.task == "add-to-webdata") {
		let hostnameIndex = webdata.findIndex(
			(entry) => entry.hostname === request.hostname
		);
		if (hostnameIndex > -1) {
			webdata[hostnameIndex].size += request.size;
			webdata[hostnameIndex].carbonfp += webdata[hostnameIndex].size * carbonfpPerByte;
		} else {
			webdata.push({ hostname: request.hostname, size: request.size, carbonfp: request.size * carbonfpPerByte });
		}
		console.log(webdata);
	}
});

chrome.browserAction.onClicked.addListener(function (tab) {
	chrome.tabs.create({ url: "popup.html" });
});
