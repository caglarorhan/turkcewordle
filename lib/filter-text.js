const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
    const fileStream = fs.createReadStream('german.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let words = [];

    for await (const line of rl) {
        if (line.trim().length === 5) {
            words.push(line.trim());
        }
    }

    // Convert the words array into a JSON string without spaces after commas
    const content = 'module.exports = ' + JSON.stringify(words).replace(/,\s/g, ',') + ';';
    fs.writeFileSync('fiveLetterWords.js', content);
}

processLineByLine();
