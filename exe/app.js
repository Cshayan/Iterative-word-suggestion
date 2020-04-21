const selectElement = (name) => {
    return document.querySelector('.' + name);
}

let wordJSON;

// Convert CSV to JSON
const CSVtoJSON = async () => {
    wordJSON = await (await fetch('http://localhost:5000/read-csv')).json();
}

// Function to sort on basis of frequency
function sortOnFrequency(props) {
    return function (a, b) {
        if (a[props] < b[props]) {
            return 1;
        } else if (a[props] > b[props]) {
            return -1;
        }
        return 0;
    }
}

// Search JSON List
const searchList = () => {
    selectElement('list').innerHTML = "";

    let searchVal = selectElement('search-word').value;

    // for valid search input
    if (searchVal !== '') {

        let matchedWords = wordJSON.data.filter(wordObj => {
            const regex = new RegExp(`^${searchVal}`, 'gi');
            return wordObj.word.match(regex);
        });

        // sort the array on frequency
        matchedWords.sort(sortOnFrequency('frequency'));

        if (matchedWords.length) {
         
            for (i = 0; i <= 4; i++) {
                if (matchedWords[i])
                    selectElement('list').innerHTML += `
            <li>${matchedWords[i].word}</li> `;
            }

        } else {
            selectElement('list').innerHTML = 'No match Found !!';
        }
    }
}

window.addEventListener('DOMContentLoaded', CSVtoJSON);
selectElement('search-word').addEventListener('input', searchList);