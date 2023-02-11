document.addEventListener(
	"DOMContentLoaded",
	(event) => {
		const bg = chrome.extension.getBackgroundPage();
		console.log(bg.webdata);
		bg.webdata.sort((a, b) => (a.carbonfp < b.carbonfp ? -1 : 1));
		bg.webdata.forEach(function (item) {
			console.log(bg.webdata);
			const div = document.createElement("div");
			div.classList.add("website-data");
			div.textContent = item.hostname + " transfered " + item.size + " bytes of data, which is " + item.carbonfp + " g of CO2 on " + item.time + ".";
			document.body.appendChild(div);
		});
	},
	false
);
