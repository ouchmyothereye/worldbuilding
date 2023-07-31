let data;

// Load the JSON file when the page loads
window.onload = function() {
    fetch('combined.json')
        .then(response => response.json())
        .then(json => {
            data = json;
        });

    document.getElementById('generateNation').addEventListener('click', generateNation);
}

// Generate a random nation
function generateNation() {
    const nationThemes = getRandomOption('nation_themes');
    const nationCurrentProbs = getRandomOption('nation_currentprobs');
    const nationDisputes = getRandomOption('nation_disputes');
    const nationGoodThings = getRandomOption('nation_goodthings');
    const nationPositiveties = getRandomOption('nation_positiveties');
    const historyEvents1 = getRandomOption('history_events');
    const historyEvents2 = getRandomOption('history_events');

    const result = `This polity is ${nationThemes}. While ${nationGoodThings}, ${nationCurrentProbs}. In the past ${historyEvents1} as well as ${historyEvents2}. On the diplomatic side of things, ${nationDisputes}.`;

    const resultsDiv = document.getElementById('results');
    resultsDiv.textContent = result;
}

// Get a random option from a table
function getRandomOption(table) {
    if (table in data) {
        return data[table][Math.floor(Math.random() * data[table].length)];
    } else {
        return '';
    }
}
