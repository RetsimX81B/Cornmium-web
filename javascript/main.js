document.getElementById('text').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {  // Check if the Enter key is pressed
        console.log("You pressed Enter");
        document.getElementById('test').innerHTML = "You pressed Enter";
        document.getElementById("research").click()
    }
}, false
);

document.getElementById("page").value = 1;

document.getElementById('research').addEventListener('click', () => {
})





