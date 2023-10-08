const fs = require("fs");

// Read the input JSON file
const inputFileWithHand = "allData.json";
const inputFileWithoutHand = "dataWithoutHand.json";

const jsonDataOne = JSON.parse(fs.readFileSync(inputFileWithHand, "utf-8"));
const jsonDataTwo = JSON.parse(fs.readFileSync(inputFileWithoutHand, "utf-8"));

function returnAndstripNames(data) {
  let dataArray = [];
  let count = data.length;
  for (let index = 0; index < count; index++) {
    const stripped = data[index].name.slice(10);
    dataArray.push(stripped);
  }
  return dataArray;
}

function findSkip() {
  let numbers = returnAndstripNames(jsonDataOne);
  console.log(numbers);
  for (let i = 1; i < numbers.length; i++) {
    const currentNumber = Number(numbers[i]);
    const previousNumber = Number(numbers[i - 1]);
    console.log(currentNumber, previousNumber);
    // Check for a skip
    if (previousNumber + 1 !== currentNumber) {
      console.log(`Skip detected at index ${i}`);

      // Log the 3 numbers before, the number itself, and 3 numbers after
      const startIndex = Math.max(0, i - 3);
      const endIndex = Math.min(numbers.length - 1, i + 3);

      const skippedNumbers = numbers.slice(startIndex, endIndex + 1);
      console.log(skippedNumbers);

      // Break the loop since we found the skip
      break;
    }
  }
}

findSkip();
// const nameswithHand = returnAndstripNames(jsonDataOne);
// const nameswithoutHand = returnAndstripNames(jsonDataTwo);

// const nameswithHandArray = "nameswithHandArray.json";
// const nameswithoutHandArray = "nameswithoutHandArray.json";

// fs.writeFileSync(nameswithHandArray, JSON.stringify(nameswithHand, null, 2));
// fs.writeFileSync(
//   nameswithoutHandArray,
//   JSON.stringify(nameswithoutHand, null, 2)
// );

// console.log(`All is Done🚀🚀🚀🚀🚀🚀🚀🚀✅✅✅✅✅`);
