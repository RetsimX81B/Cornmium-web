// Get the URL parameters
const params = new URLSearchParams(window.location.search);

// Get the value of the 'research' parameter
const researchValue = params.get('research');
let pageValue = params.get('page');

// Print the value to the console or display it on the page
console.log(researchValue);
document.getElementById('text').value = researchValue;  // assuming you have an element with id "output"

if (pageValue == null) {
    pageValue = 1;
}

typeof pageValue;
console.log(pageValue);
document.getElementById('pageN').value = Number(pageValue) + 1;  // assuming you have an element with id "output"

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
    console.log(`words: ${words}`);

    let websiteindex = 0;
    let websiteAnchor = document.getElementById("site-title-0");
    let websiteLogo = document.getElementById("image-" + websiteindex);
    let websiteDescription = document.getElementById('site-desc-' + websiteindex);
    let seeMoreButton = document.getElementById('see-more');
    let seeMoreInput = document.getElementById('form-input');

    console.log(`url index:${urlindex}`);


    words.forEach(async word => {


        console.log(`word: ${word}`);
        if (index.hasOwnProperty(word)) {

            console.log(`Key ${word} exists in the JSON object.`);
            console.log(index[word]);
            let listOfUuid = index[word];

            console.log(listOfUuid.length);
            console.log(typeof (listOfUuid));
            /*let allLinks = Object.listOfUuid
            console.log(allLinks)*/


            listOfUuid.forEach(async link => {


                while (websiteindex < 2) {

                    var delayInMilliseconds = 1000; //1 second

                    setTimeout(function () {
                        //your code to be executed after 1 second
                    }, delayInMilliseconds);


                    websiteindex = Number(websiteindex) + 1;
                    console.log(websiteindex);

                    websiteAnchor = document.getElementById("site-title-" + websiteindex);
                    websiteLogo = document.getElementById("image-" + websiteindex);
                    websiteDescription = document.getElementById('site-desc-' + websiteindex);

                    console.log("site-title-" + websiteindex);
                    let links = urlindex[link];
                    console.log(links);
                    //csv code to retrieve title
                    const csvData = await fetchCSV(csvfile);
                    const parsedData = parseCSV(csvData);

                    const searchUrl = links; // URL you are searching for
                    const title = getTitleByUrl(parsedData, searchUrl);
                    const desc = getDescByUrl(parsedData, searchUrl)
                    console.log(`Title: ${title}`);
                    console.log(`Desc: ${desc}`)

                    var form = document.getElementById("pages-form");

                    console.log(websiteLogo);
                    websiteLogo.src = websiteLogo.src = `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${links}&size=16`;

                    // Fallback to default logo if the image fails to load
                    websiteLogo.onerror = () => {
                        websiteLogo.src = './image/logo.png';
                        console.log("setting fallback");
                    };

                    websiteAnchor.href = links;
                    websiteAnchor.innerHTML = title;

                    websiteDescription.innerHTML = desc;
                }
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
