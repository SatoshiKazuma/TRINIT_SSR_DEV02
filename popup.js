document.addEventListener(
	"DOMContentLoaded",
	(event) => {
		const bg = chrome.extension.getBackgroundPage();
		// console.log(bg.webdata);
		bg.webdata.forEach(function (item) {
			console.log(bg.webdata);
			const div = document.createElement("div");
			div.textContent = item.hostname + " transfered " + item.size + " bytes of data, which is " + item.carbonfp + " g of CO2";
			document.body.appendChild(div);
		});
	},
	false
);
