const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const screenshotsDir = './'; // replace with your directory path
const outputFilePath = path.join(__dirname, 'screenshots.json'); // absolute path to the output file

fs.readdir(screenshotsDir, (err, files) => {
    if (err) {
        console.error('Could not list the directory.', err);
        process.exit(1);
    }

    let screenshots = [];

    files.forEach((file, index) => {
        if (path.extname(file) === '.jpg') {
            exec(`identify -format "%wx%h" ${path.join(screenshotsDir, file)}`, (err, stdout, stderr) => {
                if (err) {
                    console.error('Error getting image dimensions:', err);
                    return;
                }

                screenshots.push({
                    src: path.join('./', file),
                    sizes: stdout.trim(),
                    type: 'image/jpg',
                    platform: 'wide'
                });

                // If this is the last file, write the screenshots array to a file
                if (index === files.length - 1) {
                    fs.writeFile(outputFilePath, JSON.stringify(screenshots, null, 2), (err) => {
                        if (err) {
                            console.error('Error writing file:', err);
                        } else {
                            console.log('File written successfully');
                        }
                    });
                }
            });
        }
    });
});
