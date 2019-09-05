const BASE_URL = 'https://api.gavagai.se/v3';
const API_KEY = '3acdef1f01cbceb88b132158abd466da';

function search() {
    const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    const word = document.getElementById('search').value;
    const language = document.getElementById('language').value;
fetch(`${proxyurl}${BASE_URL}/lexicon/${language}/${word}?apiKey=${API_KEY}&additionalFields=SEMANTICALLY_SIMILAR_WORDS`)
    .then(
        function (response) {
            response.json().then(function (data) {
                const similarWords = document.getElementById('similar-words');
                similarWords.innerHTML = renderList(data.semanticallySimilarWords);
            });
        }
    )
    .catch(function (err) {
        console.log('Fetch Error :-S', err);
    });
}

function renderList (semanticallySimilarWords) {
    return semanticallySimilarWords
        .map((item)=> {
            return `<li>${item.word}</li>`
        })
        .join('')
}

