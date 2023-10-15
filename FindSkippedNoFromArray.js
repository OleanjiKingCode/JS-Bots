
function findSkip() {
  let numbers = [0,1,4,3,4,5,8,9];

  for (let i = 1; i < numbers.length; i++) {
    const currentNumber = Number(numbers[i]);
    const previousNumber = Number(numbers[i - 1]);

    // Check for a skip
    if (previousNumber + 1 !== currentNumber) {
      console.log(`Skip detected at index ${i}`);

      // Log the number before, the number itself, and the number after the skip
      const startIndex = Math.max(0, i - 1);
      const endIndex = Math.min(numbers.length - 1, i + 1);

      const skippedNumbers = numbers.slice(startIndex, endIndex + 1);
      console.log("[no before skipping occured, number that skipped,number after skip")
      console.log(skippedNumbers);

     
    }
  }
}

findSkip();
