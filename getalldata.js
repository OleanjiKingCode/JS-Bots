const axios = require('axios');
const fs = require('fs');

const baseUrl = 'https://ipfs.io/ipfs/bafybeie2o2kejwecixy7bvq5gs7nain7zi3omigbzav7tltnooluuj3vdy/';

async function fetchDataAndCollect(index, dataArray) {
  const url = `${baseUrl}${index}.json`;

  try {
    const response = await axios.get(url);
    const jsonData = response.data;

    dataArray.push(jsonData);
    console.log(`Data from ${url} collected.`);
  } catch (error) {
    console.error(`Error fetching data from ${url}: ${error.message}`);
  }
}

async function fetchDataForAll() {
  const numberOfRequests = 4443;
  const allData = [];

  for (let i = 0; i <= numberOfRequests; i++) {
    await fetchDataAndCollect(i, allData);
  }

  // Save all collected data to a single file
  const outputFileName = 'allData.json';
  fs.writeFileSync(outputFileName, JSON.stringify(allData, null, 2));
  console.log(`All data saved to ${outputFileName}`);
}

// Call the function to start fetching data for all URLs
fetchDataForAll();
