// Get the URL parameters
const params = new URLSearchParams(window.location.search);

console.log("test")

// Get the value of the 'research' parameter
const researchValue = params.get('research');

// Print the value to the console or display it on the page
console.log(researchValue);
//document.getElementById('output').innerHTML = researchValue;  // assuming you have an element with id "output"

let csvfile = "./0scraper.csv"

async function fetchJSONData(file) {
    return fetch(file)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json(); // Parse and return JSON data
        })
        .catch((error) => {
            console.error("Unable to fetch data:", error);
            return null; // Return null on error to handle it later
        });

}

async function fetchCSV(file) {
    const response = await fetch(file);
    const data = await response.text();
    return data;
}

function parseCSV(data) {
    const rows = data.split('\n').slice(1); // Remove the header row
    const result = [];

    rows.forEach(row => {
        const [url, title, paragraphs] = row.split(',');
        result.push({ url, title, paragraphs });
    });

    return result;
}

function getTitleByUrl(csvData, searchUrl) {
    const entry = csvData.find(item => item.url.trim() === searchUrl.trim());
    return entry ? entry.title : 'Title not found';
}

function getDescByUrl(csvData, searchUrl) {
    if (!Array.isArray(csvData)) {
        console.error("csvData is not an array");
        return;
    }
    const entry = csvData.find(item => item.url.trim() === searchUrl.trim());
    return entry ? entry.paragraphs.slice(1) : 'Paragraph not found';
}

async function research(textzoneValue, index, urlindex, csvfile) {
    words = textzoneValue.split(" "); //TODO: lowercase
    console.log(words);

    let websiteindex = 0;
    let websiteAnchor = document.getElementById("site-title-" + websiteindex);
    let websiteLogo = document.getElementById("image-" + websiteindex);
    let websiteDescription = document.getElementById('site-desc-0' + websiteindex);

    let seeMoreButton = document.getElementById('see-more');
    let seeMoreInput = document.getElementById('form-input');

    console.log(urlindex);
    words.forEach(word => {
        console.log(word);
        if (index.hasOwnProperty(word)) {

            console.log(`Key ${word} exists in the JSON object.`);
            console.log(index[word])
            console.log(index[word].length)
            console.log(typeof (index[word]))
            let allLinks = Object.index[word]

            console.log(allLinks)
            index[word].forEach(async link => {
                let links = urlindex[link]
                console.log(links);
                //csv code to retrieve title
                var form = document.getElementById("pages-form");

                websiteLogo.src = "https://www.google.com/s2/favicons?domain=" + links; //set wesbsite logo

                websiteAnchor.href = links;
                websiteAnchor.innerHTML = title;

                websiteDescription.innerHTML = desc;

                seeMoreButton.addEventListener("click", () => {
                    // Append the hidden input to the form
                    form.appendChild(seeMoreInput);

                    // Submit the form
                    form.submit();

                    // Remove the hidden input after submission to keep form clean
                    form.removeChild(seeMoreInput);
                });
            });
        } else {
            console.log("no !!!")
        }
    });
}

Promise.all([fetchJSONData("./index.json"), fetchJSONData("./urlindex.json")])
    .then(([index, urlindex]) => {
        if (index && urlindex) {
            research(researchValue, index, urlindex, csvfile);
        } else {
            console.error("Failed to fetch data from one or both JSON files");
        }
    })
    .catch(error => console.error("Error fetching JSON data:", error));