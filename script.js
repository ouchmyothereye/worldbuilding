let data;

// Load the JSON file when the page loads
window.onload = function() {
    fetch('combined.json')
        .then(response => response.json())
        .then(json => {
            data = json;
            loadTables();
        });
}

// Add a checkbox for each table in the JSON file
function loadTables() {
    const checkboxesDiv = document.getElementById('checkboxes');
    for (let table in data) {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = table;
        checkbox.value = table;

        const label = document.createElement('label');
        label.htmlFor = table;
        label.textContent = table;

        checkboxesDiv.appendChild(checkbox);
        checkboxesDiv.appendChild(label);
        checkboxesDiv.appendChild(document.createElement('br'));
    }
}

// Generate random options from the selected tables
function generateRandomOptions() {
    const resultsDiv = document.getElementById('results');
    resultsDiv.textContent = '';  // Clear previous results

    for (let table in data) {
        const checkbox = document.getElementById(table);
        if (checkbox.checked) {
            const randomOption = data[table][Math.floor(Math.random() * data[table].length)];
            resultsDiv.textContent += `${table}: ${randomOption}\n`;
        }
    }
}
