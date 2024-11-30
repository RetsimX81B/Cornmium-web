/*! color palette

dark mode:
--background-inverse: linear-gradient(to left, #1b1f29, #343a46);
--background: linear-gradient(to right, #1b1f29, #343a46);
--background-header: linear-gradient(to right, #2a2f3b, #404857);
--accent-color: #e3e3e3;
--accent-color-hover: #b3b3b3;
--placeholders: #777;
--text-color: #ffffff;
length: 7

white  mode:
--background-inverse: linear-gradient(to left, #3a8dde, #a1c4fd);
--background: linear-gradient(to right, #3a8dde, #a1c4fd);
--background-header: linear-gradient(to right, #1c4dab, #6a8edd);
--accent-color: black;
--accent-color-hover: rgb(114, 114, 114);
--placeholders: #333;
--text-color: white;
length: 7

*/

let switchText = document.getElementById("checkbox-text");
let checkbox = document.getElementById("checkbox");

function setPalette(isOn) {
    if (isOn) {
        switchText.innerHTML = "Enable Light Mode"
        document.documentElement.style.setProperty('--background-inverse', 'linear-gradient(to left, #1b1f29, #343a46)');
        document.documentElement.style.setProperty('--background', 'linear-gradient(to right, #1b1f29, #343a46)');
        document.documentElement.style.setProperty('--background-header', 'linear-gradient(to right, #2a2f3b, #404857)');
        document.documentElement.style.setProperty('--accent-color', '#e3e3e3');
        document.documentElement.style.setProperty('--accent-color-hover', '#b3b3b3');
        document.documentElement.style.setProperty('--placeholders', '#777');
        document.documentElement.style.setProperty('--text-color', '#ffffff');
    } else {
        switchText.innerHTML = "Enable Dark Mode"
        document.documentElement.style.setProperty('--background-inverse', 'linear-gradient(to left, #3a8dde, #a1c4fd)');
        document.documentElement.style.setProperty('--background', 'linear-gradient(to right, #3a8dde, #a1c4fd)');
        document.documentElement.style.setProperty('--background-header', 'linear-gradient(to right, #1c4dab, #6a8edd)');
        document.documentElement.style.setProperty('--accent-color', 'black');
        document.documentElement.style.setProperty('--accent-color-hover', 'rgb(114, 114, 114)');
        document.documentElement.style.setProperty('--placeholders', '#333');
        document.documentElement.style.setProperty('--text-color', 'white');
    }
}

let isOn = localStorage.getItem('isOn') === 'true'; // Ensure it's a boolean
console.log("isOn: ", isOn);
console.log("checkbox value: ", document.getElementById("checkbox").checked);
checkbox.checked = isOn;
setPalette(isOn);


checkbox.addEventListener("change", () => {
    console.log("click !")
    console.log("checkbox value: ", document.getElementById("checkbox").checked);
    isOn = !isOn;
    console.log("isOn: ", isOn)
    localStorage.setItem('isOn', isOn.toString());
    setPalette(isOn);
});
