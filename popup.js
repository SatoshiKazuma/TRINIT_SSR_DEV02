document.addEventListener(
	"DOMContentLoaded",
	(event) => {
		const bg = chrome.extension.getBackgroundPage();
		console.log(bg.webdata2);
		let carbontotal = 0;
		let count = 0;
		bg.webdata2.forEach(function (item) {
			carbontotal += item.carbonfp;
			count++;
		});
		
		bg.webdata2.sort((a, b) => (a.carbonfp < b.carbonfp ? -1 : 1));
		bg.webdata2.forEach(function (item) {
			const card_case = document.createElement("div");
			card_case.classList.add("card_case");
			if (item.carbonfp < carbontotal / count) {
				card_case.classList.add("green");
			}
			else if (item.carbonfp > carbontotal / count) {
				card_case.classList.add("red");
			}
			else if (item.carbonfp == carbontotal / count) {
				card_case.classList.add("yellow");
			}
			card_case.innerHTML = `<div class="card">
				<div class="card-header">
					<h2 class="card-title">${item.hostname}</h2>
				</div>
				<div class="card-body">
					<p class="card-text">${item.carbonfp} g CO2e</p>
				</div>
				</div>
			`;
			document.getElementById("card-container").appendChild(card_case);
		});
	},
	false
);
