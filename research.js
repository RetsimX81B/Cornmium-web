// Get the URL parameters
const params = new URLSearchParams(window.location.search);

// Get the value of the 'research' parameter
const researchValue = params.get('research');
let pageValue = params.get('page');

let seeLessButton = document.getElementById('see-less');
// Print the value to the console or display it on the page
console.log(researchValue);
document.getElementById('text').value = researchValue;  // assuming you have an element with id "output"

if (pageValue == null) {
    pageValue = 1;
}

typeof pageValue;
console.log("page value:", pageValue);
document.getElementById('pageN').value = Number(pageValue) + 1;  // assuming you have an element with id "output"

let csvfile = "./0scraper.csv"

let seeMoreButton = document.getElementById('see-less').addEventListener("click", () => {
    document.getElementById('pageN').value = Number(pageValue) - 1;
});

if (pageValue == 0) {
    seeLessButton.style.display = " none";
}

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

    let pageValue = params.get('page');

    if (pageValue == null) {
        pageValue = 1;
    }

    let websiteindex = 0;
    let linkindex = 0;
    let websiteAnchor = document.getElementById("site-title-0");
    let websiteLogo = document.getElementById("image-" + websiteindex);
    let websiteDescription = document.getElementById('site-desc-' + websiteindex);
    let seeMoreButton = document.getElementById('see-more');
    let seeLessButton = document.getElementById('see-less');
    let seeMoreInput = document.getElementById('form-input');
    let whileindex = 5;
    let numberofarticles = 5;

    linkindex = 5 * pageValue

    console.log(`url index: ${urlindex}`);


    words.forEach(async word => {


        console.log(`word: ${word}`);
        if (index.hasOwnProperty(word)) {

            console.log(`Key ${word} exists in the JSON object.`);
            console.log(index[word]); //shows the list of all the uuids for the word
            let listOfUuid = index[word];

            console.log(listOfUuid.length);
            console.log(typeof (listOfUuid));
            console.log('length of object: ' + index[word].length);
            //let ListOfWordsLength = index[word].length;

            let ListOfWordsLength = index[word]?.length;

            if (!Array.isArray(index[word])) {
                console.error("Error: index[word] is not an array.");
            } else if (isNaN(linkindex) || linkindex < 0 || linkindex >= ListOfWordsLength) {
                console.error("Error: linkindex is not a valid index.", linkindex);
                seeMoreButton.style.display = " none";
            } else {
                if (Number(linkindex) + numberofarticles <= ListOfWordsLength) {
                    listOfUuid = listOfUuid.slice(linkindex, Number(linkindex) + numberofarticles);
                } else {
                    listOfUuid = listOfUuid.slice(linkindex, ListOfWordsLength);
                }
                console.log("Sliced Array:", listOfUuid);
                seeLessButton.style.display = ""

            }

            if (listOfUuid.length < whileindex) {
                console.log(typeof (listOfUuid))
                whileindex = Number(listOfUuid?.length);
                console.warn(`length of listuuid ${listOfUuid} and while index ${whileindex}`);
            }


            listOfUuid.forEach(async link => {


                while (websiteindex < whileindex) {


                    /*console.log("link index: ", linkindex);
                    linkindex = Number(linkindex) + 1;*/

                    const websiteAnchor = document.getElementById("site-title-" + websiteindex);
                    const websiteLogo = document.getElementById("image-" + websiteindex);
                    const websiteDescription = document.getElementById('site-desc-' + websiteindex);
                    const websiteArticle = document.getElementById("article-" + websiteindex);

                    if (!websiteAnchor || !websiteLogo || !websiteDescription) {
                        console.warn(`Missing elements for websiteindex ${websiteindex}`);
                        continue; // Skip to the next iteration
                    }

                    const links = urlindex[link]; //search for each uuid we have and transform it onto links
                    console.log(links);
                    if (!links) {
                        console.warn(`Missing link for websiteindex ${websiteindex}`);
                        continue;
                    }

                    const csvData = await fetchCSV(csvfile);
                    const parsedData = parseCSV(csvData);
                    const title = getTitleByUrl(parsedData, links) || 'Default Title';
                    const desc = getDescByUrl(parsedData, links) || 'Default Description';

                    websiteLogo.onerror = () => (websiteLogo.src = './image/logo.png');
                    websiteAnchor.href = links;
                    websiteAnchor.innerHTML = title;
                    websiteDescription.innerHTML = desc;
                    websiteLogo.src = `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${links}&size=16`;
                    websiteArticle.style.display = "flex";


                    console.log("website index: ", websiteindex);
                    websiteindex = Number(websiteindex) + 1;
                }
                /*                     console.log(i);
                                    i++;
                                } */
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


