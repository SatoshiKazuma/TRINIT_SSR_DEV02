const resources = performance.getEntriesByType("resource");
let TotalSize = 0;
resources.forEach((entry) => {
    TotalSize += entry.transferSize + entry.decodedBodySize;
	if (entry.transferSize === 0 && entry.decodedBodySize > 0) {
		console.log(`${entry.name} was loaded from cache`);
	}
});
console.log("Total size: " + TotalSize);
chrome.runtime.sendMessage({
    hostname: window.location.hostname,
    size: TotalSize
});