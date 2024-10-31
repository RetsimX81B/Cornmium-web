function doWhichKey(e) {
    e = e || window.event;
    let charCode = e.keyCode || e.which;
    return String.fromCharCode(charCode);
}

document.getElementById('text').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {  // Check if the Enter key is pressed
        console.log("You pressed Enter");
        document.getElementById('test').innerHTML = "You pressed Enter";
        window.location.href = "https://fr.cornhub.website";
    }
}, false
);


function getBrowserVersion() {
    const userAgent = navigator.userAgent;
    let browserName, fullVersion;

    if (userAgent.includes("Firefox")) {
        browserName = "Firefox";
        fullVersion = userAgent.split("Firefox/")[1];
    } else if (userAgent.includes("Chrome") && userAgent.includes("Safari")) {
        browserName = "Chrome";
        fullVersion = userAgent.split("Chrome/")[1].split(" ")[0];
    } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
        browserName = "Safari";
        fullVersion = userAgent.split("Version/")[1].split(" ")[0];
    } else if (userAgent.includes("Edge")) {
        browserName = "Edge";
        fullVersion = userAgent.split("Edge/")[1];
    } else {
        browserName = "Unknown";
        fullVersion = "Unknown";
    }
    let text = document.getElementById('test').innerHTML = browserName + fullVersion;
    /* text = `Version: ${fullVersion}`; */
}

getBrowserVersion();