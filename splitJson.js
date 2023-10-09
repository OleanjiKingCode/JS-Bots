const fs = require('fs');

// Read the original JSON file
const originalData = require('./allData.json');

// Define the size of each chunk
const chunkSize = 500;

// Split the data into chunks
const chunks = [];
for (let i = 0; i < originalData.length; i += chunkSize) {
  chunks.push(originalData.slice(i, i + chunkSize));
}

// Create new JSON files for each chunk
chunks.forEach((chunk, index) => {
  const fileName = `chunk_${index}.json`;
  const filePath = `./segments/${fileName}`;

  fs.writeFileSync(filePath, JSON.stringify(chunk, null, 2));

  console.log(`Created ${fileName} with ${chunk.length} objects.`);
});
