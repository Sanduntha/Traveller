const fs = require('fs');
const path = require('path');
const https = require('https');

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

const files = getAllFiles('src').filter(f => f.endsWith('.tsx'));
const urlRegex = /https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+[^\s'"]*/g;

let allUrls = [];

files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    let match;
    while ((match = urlRegex.exec(content)) !== null) {
        allUrls.push(match[0]);
    }
});

allUrls = [...new Set(allUrls)];

function checkUrl(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            resolve({ url, status: res.statusCode });
        }).on('error', (e) => {
            resolve({ url, status: e.message });
        });
    });
}

Promise.all(allUrls.map(checkUrl)).then(results => {
    results.forEach(res => {
        console.log(`${res.status} : ${res.url}`);
    });
});
