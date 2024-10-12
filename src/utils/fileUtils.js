const fs = require('fs').promises; 
const path = require('path');

const readFile = async (filePath) => {
    try {
        const data = await fs.readFile(path.resolve(__dirname, '../data', filePath));
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading file ${filePath}:`, error);
        throw new Error('Error reading file');
    }
};

const writeFile = async (filePath, content) => {
    try {
        await fs.writeFile(path.resolve(__dirname, '../data', filePath), JSON.stringify(content, null, 2));
    } catch (error) {
        console.error(`Error writing file ${filePath}:`, error);
        throw new Error('Error writing file');
    }
};

module.exports = { readFile, writeFile };

