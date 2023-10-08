const fs = require('fs');

// Read the input JSON file
const inputFile = 'allData.json';
const jsonData = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));

// Filter objects with and without "hand" attribute
const withHand = jsonData.filter(obj => obj.attributes.some(attr => attr.trait_type === 'Hand'));
const withoutHand = jsonData.filter(obj => !obj.attributes.some(attr => attr.trait_type === 'Hand'));

// Write filtered data to two separate JSON files
const outputFileWithHand = 'dataWithHand.json';
const outputFileWithoutHand = 'dataWithoutHand.json';

fs.writeFileSync(outputFileWithHand, JSON.stringify(withHand, null, 2));
fs.writeFileSync(outputFileWithoutHand, JSON.stringify(withoutHand, null, 2));

console.log(`Data with "hand" attribute saved to ${outputFileWithHand}`);
console.log(`Data without "hand" attribute saved to ${outputFileWithoutHand}`);
