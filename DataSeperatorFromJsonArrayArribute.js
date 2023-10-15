const fs = require('fs');

// Read the input JSON file
const inputFile = 'JsonFilelocator';
const jsonData = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));

// Filter objects with and without "a certain attribute" attribute
const withAttribute = jsonData.filter(obj => obj.attributes.some(attr => attr.type === 'certain attribute'));
const withoutAttribute = jsonData.filter(obj => !obj.attributes.some(attr => attr.type === 'certain attribute'));

// Write filtered data to two separate JSON files
const outputFileWithAttribute = 'dataWithAttribute.json';
const outputFileWithoutAttribute = 'dataWithoutAttribute.json';

fs.writeFileSync(outputFileWithAttribute, JSON.stringify(withAttribute, null, 2));
fs.writeFileSync(outputFileWithoutAttribute, JSON.stringify(withoutAttribute, null, 2));

console.log(`Data with "Attribute" attribute saved to ${outputFileWithAttribute}`);
console.log(`Data without "Attribute" attribute saved to ${outputFileWithoutAttribute}`);
