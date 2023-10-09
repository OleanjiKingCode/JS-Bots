const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

async function combineImages(image1Path, image2Path, outputPath) {
  try {
    // Load images
    const image1 = await loadImage(image1Path);
    const image2 = await loadImage(image2Path);

    // Create a canvas with dimensions of the first image
    const canvas = createCanvas(image1.width, image1.height);
    const ctx = canvas.getContext('2d');

    // Draw the first image
    ctx.drawImage(image1, 0, 0, image1.width, image1.height);

    // Draw the second image on top of the first
    ctx.drawImage(image2, 0, 0, image1.width, image1.height);

    // Save the result to a file
    const outputStream = fs.createWriteStream(outputPath);
    const stream = canvas.createPNGStream();
    stream.pipe(outputStream);

    outputStream.on('finish', () => {
      console.log('Images combined successfully!');
    });
  } catch (error) {
    console.error('Error combining images:', error);
  }
}

// Example usage
const image1Path = 'inouts/0.png';
const image2Path = 'inouts/1.png';
const outputPath = 'result/result.png';

combineImages(image1Path, image2Path, outputPath);
