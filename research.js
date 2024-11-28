// Get the URL parameters
const params = new URLSearchParams(window.location.search);

// Get the value of the 'research' parameter
const researchValue = params.get('research');
let pageValue = Number(params.get('page'));

let seeLessButton = document.getElementById('see-less');
let seeMoreButton = document.getElementById('see-more');
const errorText = document.getElementById("error-text");
const notFoundDiv = document.getElementById("notfound");
// Print the value to the console or display it on the page
console.log(researchValue);
document.getElementById('text').value = researchValue;  // assuming you have an element with id "output"

if (pageValue == null) {
    pageValue = 1;
} else if (pageValue <= 1) {
    seeLessButton.style.display = "none";
    pageValue = 1;
    seeMoreButton.style.marginLeft = "80px";
}

console.log("page value:", pageValue);
console.log(typeof (pageValue))
document.getElementById('pageN').value = Number(pageValue) + 1;  // assuming you have an element with id "output"

let csvfile = "./0scraper.csv"

seeLessButton.addEventListener("click", () => {
    document.getElementById('pageN').value = Number(pageValue) - 1;
});

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

    let pageValue = Number(params.get('page'));

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


    if (pageValue == 0) {
        linkindex = 5;
        console.warn(linkindex);
    } else {
        linkindex = 5 * pageValue
    }


    console.log(`url index: ${urlindex}`);


    words.forEach(async word => {


        console.log(`word: ${word}`);
        if (index.hasOwnProperty(word)) {
            notFoundDiv.style.display = "none";
            console.log(`Key ${word} exists in the JSON object.`);
            console.log(index[word]); //shows the list of all the uuids for the word
            let listOfUuid = index[word];

            console.log(listOfUuid.length);
            console.log(typeof (listOfUuid));
            console.log('length of object: ' + index[word].length);
            //let ListOfWordsLength = index[word].length;

            let ListOfWordsLength = index[word]?.length;

            console.log("Link index", linkindex)
            if (isNaN(linkindex) || linkindex < 0 || linkindex >= ListOfWordsLength) {
                console.error("Error: Futur linkindex is not a valid index.", linkindex);
                seeMoreButton.style.display = "none";

            }
            if (pageValue == 0) {
                linkindex = 5;
                console.warn(linkindex);
            } else {
                linkindex = 5 / pageValue
            }


            if (!Array.isArray(index[word])) {
                console.error("Error: index[word] is not an array.");
            } else if (isNaN(linkindex) || linkindex < 0 || linkindex >= ListOfWordsLength) {
                console.error("Error: linkindex is not a valid index.", linkindex);
                seeMoreButton.style.display = "none";

            } else {
                //let sclicedUUidlist = listOfUuid ;
                if (pageValue == 1) {
                    listOfUuid = listOfUuid.slice(0, 5);
                } else {
                    listOfUuid = listOfUuid.slice((pageValue - 1) * 5, pageValue * 5)
                }
                console.log("Sliced Array:", listOfUuid);
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
                    //console.log(links);
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
                    //websiteLogo.src = `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.linuxfromscratch.org/lfs/downloads/stable/&size=16`;
                    websiteArticle.style.display = "flex";


                    console.log("website index: ", websiteindex);
                    websiteindex = Number(websiteindex) + 1;
                }
                /*                     console.log(i);
                                    i++;
                                } */
            });
        } else {
            console.log("no !!!");
            notFoundDiv.style.display = "block";
            seeMoreButton.style.display = "none";
            console.log(errorText.innerHTML)
            errorText.innerHTML = errorText.innerHTML + researchValue;
            console.log(errorText.value + researchValue)

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


