let data;
let groups = {
    "nation": [
        "community_tags",
        "nation_currentprobs",
        "nation_disputes",
        "nation_goodthings",
        "nation_positiveties",
        "nation_themes",
        "history_conclusion",
        "history_crisis",
        "history_events",
        "history_origin",
        "history_originals",
        "history_peak",
        "history_surviviors",
        "history_zenith"
    ]
    // Add more groups as needed
};
let savedResults = [];

window.onload = function() {
    fetch('combined.json')
        .then(response => response.json())
        .then(json => {
            data = json;
            loadTables();
        });
}

function loadTables() {
    const groupsSelect = document.getElementById('groups');
    for (let group in groups) {
        const option = document.createElement('option');
        option.value = group;
        option.textContent = group;
        groupsSelect.appendChild(option);
    }

    const checkboxesDiv = document.getElementById('checkboxes');
    for (let table in data) {
        const group = table.split('_')[0];
        let groupDiv = document.getElementById(group);
        if (!groupDiv) {
            groupDiv = document.createElement('div');
            groupDiv.id = group;
            groupDiv.className = 'group';
            groupDiv.innerHTML = `<h2>${group}</h2>`;
            checkboxesDiv.appendChild(groupDiv);
        }

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = table;
        checkbox.value = table;

        const label = document.createElement('label');
        label.htmlFor = table;
        label.textContent = table;

        groupDiv.appendChild(checkbox);
        groupDiv.appendChild(label);
        groupDiv.appendChild(document.createElement('br'));
    }
}

function selectGroup() {
    const group = document.getElementById('groups').value;
    if (group) {
        const tables = groups[group];
        for (let table in data) {
            const checkbox = document.getElementById(table);
            checkbox.checked = tables.includes(table);
        }
    }
}

function generateRandomOptions() {
    const resultsDiv = document.getElementById('results');
    resultsDiv.textContent = '';

    for (let table in data) {
        const checkbox = document.getElementById(table);
        if (checkbox.checked) {
            const randomOption = data[table][Math.floor(Math.random() * data[table].length)];
            const result = `${table}: ${randomOption}`;

            const p = document.createElement('p');
            p.textContent = result;
            resultsDiv.appendChild(p);

            const saveButton = document.createElement('button');
            saveButton.textContent = 'Save';
            saveButton.onclick = function() { saveResult(result); };
            resultsDiv.appendChild(saveButton);
        }
    }
}

function saveResult(result) {
    savedResults.push(result);
}

function downloadSavedResults() {
    const blob = new Blob([savedResults.join('\n')], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'saved_results.txt';
    a.click();
}
