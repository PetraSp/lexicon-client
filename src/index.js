const BASE_URL = 'https://api.gavagai.se/v3';
const API_KEY = '3acdef1f01cbceb88b132158abd466da';
const DEFAULT_LANG = 'EN';

function searchLexicon(mode) {
    const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    let word;
    let language;
    switch (mode) {
        case 'similarWords':
            word = document.getElementById('search').value;
            if (word === '') {
                return
            }
            language = document.getElementById('language').value;
            if (language === ''){language = DEFAULT_LANG}
            break;
        case 'wordInfo':
            const params = new URLSearchParams(document.location.search);
            word = params.get('word');
            language = params.get('language');
    }

fetch(`${proxyurl}${BASE_URL}/lexicon/${language}/${word}?apiKey=${API_KEY}&additionalFields=SEMANTICALLY_SIMILAR_WORDS`)
    .then(
        function (response) {
            response.json().then(function (data) {
                switch (mode) {
                    case 'similarWords':
                        const similarWords = document.getElementById('similar-words');
                        similarWords.innerHTML = renderList(data.semanticallySimilarWords);
                        break;
                    case 'wordInfo':
                        const wordInfo = document.getElementById('word-info');
                        if (data.wordInformation) {
                            wordInfo.innerHTML = renderDetail(data.wordInformation);
                        } else {
                            wordInfo.innerHTML = `<span>This word has no info</span>`;
                        }
                }

            });
        }
    )
    .catch(function (err) {
        console.log('Fetch Error :-S', err);
    });
}

function renderList (semanticallySimilarWords) {
    let language = document.getElementById('language').value;
    if (language === ''){language = DEFAULT_LANG}
    return semanticallySimilarWords
        .map((item)=> {
            return `<a href="./detail.html?word=${item.word}&language=${language}">${item.word}</a>`
        })
        .join('')
}

function renderDetail (wordInfo) {
return `<div>
<h1>${wordInfo.word}</h1>
<p><strong>Absolute Rank: </strong>${wordInfo.absoluteRank}</p>
<strong>Related Info: </strong><a href="${wordInfo.additionalInformation.link}" target="_blank">${wordInfo.additionalInformation.link}</a>
<p><strong>Document Frequency: </strong>${wordInfo.documentFrequency}</p>
<p><strong>Frequency: </strong>${wordInfo.frequency}</p>
<p><strong>Vocabulary Size: </strong>${wordInfo.vocabularySize}</p>

</div>`
}



