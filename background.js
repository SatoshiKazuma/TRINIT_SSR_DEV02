window.webdata = [];
window.webdata2 = [];
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
			webdata[hostnameIndex].carbonfp +=
				webdata[hostnameIndex].size * carbonfpPerByte;
			webdata[hostnameIndex].time = request.time;
			webdata[hostnameIndex].unixtime = request.unixtime;
		} else {
			webdata.push({
				hostname: request.hostname,
				size: request.size,
				carbonfp: request.size * carbonfpPerByte,
				time: request.time,
				unixtime: request.unixtime,
			});
		}
		console.log(webdata);
	}
});

chrome.browserAction.onClicked.addListener(function (tab) {
	chrome.tabs.create({ url: "popup.html" });
	create_database();
	;
});

let db = null;

function create_database() {
	const request = window.indexedDB.open("MyTestDB");

	request.onerror = function (event) {
		console.log("Problem opening DB.");
	};

	request.onupgradeneeded = function (event) {
		db = event.target.result;
		let objectStore = db.createObjectStore("webdata", {
			keyPath: "unixtime",
		});

		objectStore.transaction.oncomplete = function (event) {
			console.log("ObjectStore Created.");
		};
	};

	request.onsuccess = function (event) {
		db = event.target.result;
		console.log("DB OPENED.");
		insert_records(webdata);
		get_all_records()
		db.onerror = function (event) {
			console.log("FAILED TO OPEN DB.");
		};
	};
}

function insert_records(records) {
	
		const insert_transaction = db.transaction("webdata", "readwrite");
		const objectStore = insert_transaction.objectStore("webdata");

		return new Promise((resolve, reject) => {
			insert_transaction.oncomplete = function () {
				console.log("ALL INSERT TRANSACTIONS COMPLETE.");
				window.webdata = [];
				resolve(true);
			};

			insert_transaction.onerror = function () {
				console.log("PROBLEM INSERTING RECORDS.");
				resolve(false);
			};

			records.forEach((item) => {
				let request = objectStore.add(item);

				request.onsuccess = function () {
					console.log("Added: ", item);
				};
			});
		});
	
}

//function to push all records to webdata2 wile appending duplicate hostnames together
function get_all_records() {
	const get_transaction = db.transaction("webdata", "readonly");
	const objectStore = get_transaction.objectStore("webdata");
	const request = objectStore.getAll();

	request.onsuccess = function (event) {
		let records = event.target.result;
		records.forEach((item) => {
			let hostnameIndex = webdata2.findIndex(
				(entry) => entry.hostname === item.hostname
			);
			if (hostnameIndex > -1) {
				webdata2[hostnameIndex].size += item.size;
				webdata2[hostnameIndex].carbonfp +=
					webdata2[hostnameIndex].size * carbonfpPerByte;
				webdata2[hostnameIndex].time = item.time;
				webdata2[hostnameIndex].unixtime = item.unixtime;
			} else {
				webdata2.push({
					hostname: item.hostname,
					size: item.size,
					carbonfp: item.size * carbonfpPerByte,
					time: item.time,
					unixtime: item.unixtime,
				});
			}
		});
		console.log(webdata2);
	};
}

