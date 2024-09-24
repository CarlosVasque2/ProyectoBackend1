const fs = require('fs');
const path = require('path');

const readFile = (filePath) => {
    const data = fs.readFileSync(path.resolve(__dirname, '../data', filePath));
    return JSON.parse(data);
};

const writeFile = (filePath, content) => {
    fs.writeFileSync(path.resolve(__dirname, '../data', filePath), JSON.stringify(content, null, 2));
};

module.exports = { readFile, writeFile };
