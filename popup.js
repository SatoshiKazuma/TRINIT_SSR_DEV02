document.addEventListener('DOMContentLoaded', (event) => {
    const bg = chrome.extension.getBackgroundPage();
    // console.log(bg.webdata);
    Object.keys(bg.webdata).forEach(function (hostname) {
        const div = document.createElement("div");
        div.textContent = hostname + ": " + bg.webdata[hostname];
        document.body.appendChild(div);
    });
}, false);