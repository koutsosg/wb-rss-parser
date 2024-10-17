const axios = require("axios");
const xml2js = require("xml2js");
const { promisify } = require("util");
const fs = require("fs");

//xml2js parseString to return promise
const parseXML = promisify(xml2js.parseString);
const writeFile = promisify(fs.writeFile);
async function fetchRSSFeed(rssUrl, outputFile) {
  try {
    // Fetch RSS with axios
    const response = await axios.get(rssUrl);
    const xmlData = response.data;
    const jsonData = await parseXML(xmlData, {
      explicitArray: false,
      mergeAttrs: true,
    });
    if (outputFile) {
      await writeFile(outputFile, JSON.stringify(jsonData, null, 2), "utf-8");
      console.log(`RSS data written to ${outputFile}`);
    }
    return jsonData;
  } catch (error) {
    throw new Error(`Error fetching or parsing RSS feed: ${error.message}`);
  }
}

module.exports = {
  fetchRSSFeed,
};
