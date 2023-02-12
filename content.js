const resources = performance.getEntriesByType("resource");
let TotalSize = 0;

resources.forEach((entry) => {
	TotalSize += entry.transferSize + entry.decodedBodySize;

	if (entry.transferSize === 0 && entry.decodedBodySize > 0) {
		console.log(`${entry.name} was loaded from cache`);
	}
});
chrome.runtime.sendMessage(
    {
        task:"add-to-webdata",
		hostname: window.location.hostname,
		size: TotalSize,
		time: new Date().toLocaleString(),
		unixtime: new Date().getTime(),
	}
);
