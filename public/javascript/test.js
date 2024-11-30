let switchText = document.getElementById("checkbox-text");
let checkbox = document.getElementById("checkbox");

function setPalette(isOn) {
    if (isOn) {
        switchText.innerHTML = "Enable Light Mode";
        document.documentElement.style.setProperty('--background-inverse', 'linear-gradient(to left, #1b1f29, #343a46)');
        document.documentElement.style.setProperty('--background', 'linear-gradient(to right, #1b1f29, #343a46)');
        document.documentElement.style.setProperty('--background-header', 'linear-gradient(to right, #2a2f3b, #404857)');
        document.documentElement.style.setProperty('--accent-color', '#e3e3e3');
        document.documentElement.style.setProperty('--accent-color-hover', '#b3b3b3');
        document.documentElement.style.setProperty('--placeholders', '#777');
        document.documentElement.style.setProperty('--text-color', '#ffffff');
    } else {
        switchText.innerHTML = "Enable Dark Mode";
        document.documentElement.style.setProperty('--background-inverse', 'linear-gradient(to left, #3a8dde, #a1c4fd)');
        document.documentElement.style.setProperty('--background', 'linear-gradient(to right, #3a8dde, #a1c4fd)');
        document.documentElement.style.setProperty('--background-header', 'linear-gradient(to right, #1c4dab, #6a8edd)');
        document.documentElement.style.setProperty('--accent-color', 'black');
        document.documentElement.style.setProperty('--accent-color-hover', 'rgb(114, 114, 114)');
        document.documentElement.style.setProperty('--placeholders', '#333');
        document.documentElement.style.setProperty('--text-color', 'white');
    }
}

// Retrieve and convert to boolean properly
let isOn = localStorage.getItem('isOn') === 'true'; // This ensures it's a boolean
checkbox.checked = isOn; // Reflect the current state
setPalette(isOn);

checkbox.addEventListener("change", () => {
    isOn = checkbox.checked; // Use checkbox.checked to toggle state
    console.log("isOn: ", isOn);
    localStorage.setItem('isOn', isOn.toString());
    setPalette(isOn);
});
