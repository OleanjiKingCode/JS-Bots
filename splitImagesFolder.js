const fs = require('fs');
const path = require('path');

const inputFolder = './Images';
const outputFolder = './chunks';
const chunkSize = 500;

// Read the list of files in the input folder
const files = fs.readdirSync(inputFolder);

files.sort((a, b) => {
  const numA = parseInt(a.match(/\d+/)[0], 10);
  const numB = parseInt(b.match(/\d+/)[0], 10);
  return numA - numB;
});

// Split the files into chunks
const chunks = [];
for (let i = 0; i < files.length; i += chunkSize) {
  console.log(i, i+chunkSize-1)
  chunks.push(files.slice(i, i+chunkSize-1));
}
// Create new folders and copy files for each chunk
chunks.forEach((chunk, index) => {
  const startRange = index * chunkSize;
  const endRange = (index + 1) * chunkSize - 1;
  const chunkFolderName = `${startRange}-${endRange}`;
  const chunkFolder = path.join(outputFolder, chunkFolderName);
  fs.mkdirSync(chunkFolder);

  chunk.forEach((file) => {
    const sourcePath = path.join(inputFolder, file);
    const destinationPath = path.join(chunkFolder, file);

    fs.copyFileSync(sourcePath, destinationPath);
  });

  console.log(`Created ${chunkFolderName} with ${chunk.length} files.`);
});
