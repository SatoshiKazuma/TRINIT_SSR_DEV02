window.webdata = [];
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	// webdata['hostname'] = request.hostname;
	// webdata['size'] = request.size;
	let hostnameIndex = webdata.findIndex(
		(entry) => entry.hostname === request.hostname
	);
	if (hostnameIndex > -1) {
		webdata[hostnameIndex].size += request.size;
	} else {
		webdata.push({ hostname: request.hostname, size: request.size });
	}
	console.log(webdata);
	// webdata[request.hostname] = request.size;
});

chrome.browserAction.onClicked.addListener(function (tab) {
	chrome.tabs.create({ url: "popup.html" });
});
