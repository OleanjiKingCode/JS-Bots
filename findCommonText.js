const fs = require("fs");

// Read the JSON file
const jsonData = fs.readFileSync("locationOfJSONfile");
const data = JSON.parse(jsonData);

// Extract and process the image property
const resultArray = [];

data.forEach((item) => {
  if (item.image) {
    // Extract the desired part of the text
    const imageUrl = item.image;
    const slicedText = imageUrl.match(/:\/\/(.[^/]+)/)[1];
    let obj = {
      protocol: "https",
      hostname: slicedText,
      port: "",
      pathname: "/***",
    };

    // Check if the text is not already in the result array
    if (!resultArray.includes(slicedText)) {
      resultArray.push(obj);
    }
  }
});

const resultFilePath = "result_array.txt";
fs.writeFileSync(resultFilePath, JSON.stringify(resultArray, null, 2));
// Output the result array
console.log(resultArray);
