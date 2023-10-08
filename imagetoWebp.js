const axios = require("axios");
const sharp = require("sharp");
const fs = require("fs");

const jsonFilePath = "allData.json";

// Function to read the JSON file
const readJsonFile = () => {
  try {
    const jsonContent = fs.readFileSync(jsonFilePath, "utf8");
    return JSON.parse(jsonContent);
  } catch (error) {
    console.error("Error reading JSON file:", error.message);
    return null;
  }
};

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

// Main function
// const main = async () => {
//   const jsonData = readJsonFile();
//   let startIndex = 1900;
//   if (jsonData && jsonData.length > 0) {
//     for (let i = startIndex; i < jsonData.length; i++) {
//       const entry = jsonData[i];
//       const { name, image } = entry;
//       const outputImagePath = `images/${name.slice(10)}.webp`;

//       const pngBuffer = await downloadImage(image);

//       if (pngBuffer) {
//         await convertToWebP(pngBuffer, outputImagePath);
//       }
//     }
//   }
// };

const main = async () => {
  for (let i = 1; i < 79; i += 7) {
    const inputpath = `traits/${i}.png`;
    const outputImagePath = `traits-images/${i}.webp`;

    await convertToWebP(inputpath, outputImagePath);
  }
};

// Run the script
main();
