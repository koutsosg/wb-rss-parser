const axios = require("axios");
const xml2js = require("xml2js");
const { promisify } = require("util");

//xml2js parseString to return promise
const parseXML = promisify(xml2js.parseString);

async function fetchRSSFeed(rssUrl) {
  try {
    // Fetch RSS with axios
    const response = await axios.get(rssUrl);
    const xmlData = response.data;
    const jsonData = await parseXML(xmlData, {
      explicitArray: false,
      mergeAttrs: true,
    });
    console.log(jsonData);
    return jsonData;
  } catch (error) {
    throw new Error(`Error fetching or parsing RSS feed: ${error.message}`);
  }
}

module.exports = {
  fetchRSSFeed,
};
