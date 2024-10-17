// tests/index.test.js

const { fetchRSSFeed } = require("../index");

jest.mock("axios"); // Mock axios to avoid real HTTP requests
const axios = require("axios");

describe("fetchRSSFeed with xml2js", () => {
  it("should fetch and parse the RSS feed correctly", async () => {
    // Mock RSS feed data
    const mockRSS = `
      <rss version="2.0">
        <channel>
          <title>My Podcast</title>
          <item>
            <title>Episode 1</title>
            <description>This is episode 1</description>
          </item>
          <item>
            <title>Episode 2</title>
            <description>This is episode 2</description>
          </item>
        </channel>
      </rss>
    `;

    // Mock the axios response
    axios.get.mockResolvedValue({ data: mockRSS });

    // Call the function with a mock RSS URL
    const result = await fetchRSSFeed("https://mock-rss-url.com/rss");

    // Validate the parsed result
    expect(result.rss.channel.title).toBe("My Podcast");
    expect(result.rss.channel.item.length).toBe(2);
    expect(result.rss.channel.item[0].title).toBe("Episode 1");
    expect(result.rss.channel.item[1].title).toBe("Episode 2");
  });

  it("should handle errors when fetching RSS feed", async () => {
    // Mock an error from axios
    axios.get.mockRejectedValue(new Error("Network Error"));

    await expect(fetchRSSFeed("https://mock-rss-url.com/rss")).rejects.toThrow(
      "Error fetching or parsing RSS feed: Network Error"
    );
  });
});
