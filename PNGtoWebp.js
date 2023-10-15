const axios = require("axios");
const sharp = require("sharp");


// Function to download the image
const downloadImage = async (imageUrl) => {
  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    return response.data;
  } catch (error) {
    console.error("Error downloading image:", error.message);
    return null;
  }
};

// Convert PNG buffer to WebP and save
const convertToWebP = async (pngBuffer, outputImagePath) => {
  try {
    await sharp(pngBuffer).webp().toFile(outputImagePath);
    console.log(`Image converted to WebP and saved: ${outputImagePath}`);
  } catch (error) {
    console.error("Error converting image to WebP:", error.message);
  }
};

//Main function
const main = async () => {
  const ImagesData = ArrayOfLinksToImagesToConvert;
  let startIndex = 0;
  if (ImagesData && ImagesData.length > 0) {
    for (let i = startIndex; i < ImagesData.length; i++) {
      const outputImagePath = `locationToStoreCobvertedImage${ImagesData[i]}.webp`;

    
      const pngBuffer = await downloadImage(image);

      if (pngBuffer) {
        await convertToWebP(pngBuffer, outputImagePath);
      }
    }
  }
};

// Run the script
main();
