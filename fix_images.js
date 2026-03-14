const fs = require('fs');
const path = require('path');

const data = require('./unsplash_data.json');

// Only take non-premium, valid photo IDs
let newUrls = data.results
    .filter(r => !r.urls.raw.includes('premium'))
    .map(r => r.urls.raw.split('?')[0]);

// Ensure we have enough
while (newUrls.length < 50) {
    newUrls = newUrls.concat(newUrls);
}

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];
    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            arrayOfFiles.push(path.join(dirPath, "/", file));
        }
    });
    return arrayOfFiles;
}

const tsxFiles = getAllFiles('src').filter(f => f.endsWith('.tsx') && !f.includes('ProvincialExplorer'));

const urlRegex = /https:\/\/(plus|images)\.unsplash\.com\/[^?"]+/g;

let urlIndex = 0;

tsxFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    const matches = [...new Set(content.match(urlRegex) || [])];

    if (matches.length > 0) {
        matches.forEach(m => {
            // replace each distinct bad URL with a fresh known good URL from the array.
            const freshUrl = newUrls[urlIndex % newUrls.length];
            content = content.replace(new RegExp(m.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), freshUrl);
            urlIndex++;
        });
        fs.writeFileSync(file, content);
        console.log(`Updated images in ${file}`);
    }
});
