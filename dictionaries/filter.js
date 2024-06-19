const fs = require('fs');

// Read the file
fs.readFile('spanishwords.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    // Parse the content of the file to get the array of words
    let words = JSON.parse(data);

    // Filter the array to get the 5-letter words
    let fiveLetterWords = words.filter(word => word.length === 5);

    // Write the filtered array to another file
    fs.writeFile('outputFile.js', JSON.stringify(fiveLetterWords), (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('The file has been saved with the filtered words!');
    });
});
