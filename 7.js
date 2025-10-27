// Convert JSON text to JS object
function convertJsonObject() {
    const jsonInput = document.getElementById('jsonInputObject').value;
    try {
        const jsonObject = JSON.parse(jsonInput);
        document.getElementById('objectOutput').textContent = JSON.stringify(jsonObject, null, 2);
    } catch (error) {
        document.getElementById('objectOutput').textContent = '❌ Invalid JSON!';
    }
}

// Convert JSON date string to JS Date object
function convertJsonToDate() {
    const dateInput = document.getElementById('dateInput').value;
    try {
        const jsonDate = JSON.parse(dateInput);
        const dateObject = new Date(jsonDate.date);
        document.getElementById('dateOutput').textContent = `✅ Date object: ${dateObject}`;
    } catch (error) {
        document.getElementById('dateOutput').textContent = '❌ Invalid JSON or date format!';
    }
}

// Convert JSON → CSV
function convertJsonToCsv() {
    const jsonCsvInput = document.getElementById('jsonCsvInput').value;
    try {
        const jsonArray = JSON.parse(jsonCsvInput);
        if (!Array.isArray(jsonArray) || jsonArray.length === 0) {
            throw new Error("Not a valid JSON array");
        }
        const headers = Object.keys(jsonArray[0]);
        const csvRows = [
            headers.join(','),
            ...jsonArray.map(row => headers.map(header => row[header]).join(','))
        ];
        document.getElementById('csvOutput').textContent = csvRows.join('\n');
    } catch (error) {
        document.getElementById('csvOutput').textContent = '❌ Invalid JSON format!';
    }
}

// Convert CSV → JSON
function convertCsvToJson() {
    const csvToJsonInput = document.getElementById('csvToJsonInput').value.trim();
    if (!csvToJsonInput) {
        document.getElementById('jsonOutput').textContent = '❌ Please enter CSV data!';
        return;
    }
    const lines = csvToJsonInput.split('\n').map(line => line.trim());
    const headers = lines[0].split(',');
    const jsonArray = lines.slice(1).map(line => {
        const values = line.split(',');
        return headers.reduce((obj, header, i) => {
            obj[header] = values[i];
            return obj;
        }, {});
    });
    document.getElementById('jsonOutput').textContent = JSON.stringify(jsonArray, null, 2);
}

// Generate SHA-256 hash
async function createHash() {
    const hashInput = document.getElementById('hashInput').value;
    if (!hashInput) {
        document.getElementById('hashOutput').textContent = '❌ Please enter text!';
        return;
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(hashInput);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    document.getElementById('hashOutput').textContent = `🔑 SHA-256 Hash: ${hashHex}`;
}
