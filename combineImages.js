const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

async function combineImages(imageAPath, imageBPath, outputPath) {
  try {
    // Load images
    const imageA = await loadImage(imageAPath);
    const imageB = await loadImage(imageBPath);

    // Create a canvas with dimensions of the first image
    const canvas = createCanvas(imageA.width, imageA.height);
    const ctx = canvas.getContext('2d');

    // Draw the first image
    ctx.drawImage(imageA, 0, 0, imageA.width, imageA.height);

    // Draw the second image on top of the first
    ctx.drawImage(imageB, 0, 0, imageA.width, imageA.height);

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
const imageAPath = 'location-of-imageA-here.png';
const imageBPath = 'location-of-imageA-here.png';
const outputPath = 'location-chosen-for-result.png';

combineImages(imageAPath, imageBPath, outputPath);
