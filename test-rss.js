const { fetchRSSFeed } = require("./index");

async function testRSS() {
  const rssUrl = "https://feeds.transistor.fm/fact-you"; // Replace with your RSS feed URL
  const outputFile = "./rss-data.json";
  try {
    const data = await fetchRSSFeed(rssUrl, outputFile);

    const simplifyPodcastData = (data) => {
      const podcast = data?.rss?.channel;
      return {
        podcast: {
          title: podcast?.title,
          description: podcast?.description,
          copyright: podcast?.copyright,
          guid: podcast["podcast:guid"],
          fundingUrl: podcast["podcast:funding"]?.url,
          persons: podcast["podcast:person"]?.map((person) => ({
            name: person?._,
            role: person?.role,
            href: person?.href,
            img: person?.img,
          })),
          language: podcast?.language,
          pubDate: podcast?.pubDate,
          transistorUrl: podcast?.link,
          image_url: podcast?.image?.url,
          image_title: podcast?.image?.title,
          image_link: podcast?.image?.link,
          categories: podcast["itunes:category"]?.map(
            (category) => category?.text
          ),
          author: podcast["itunes:author"],
          keywords: podcast["itunes:keywords"]?.split(", "),
          owner: {
            name: podcast["itunes:owner"]["itunes:name"],
            email: podcast["itunes:owner"]["itunes:email"],
          },
          episodes: podcast?.item?.map((episode) => ({
            title: episode?.title,
            season: episode["podcast:season"],
            epType: episode["itunes:episodeType"],
            guid: episode?.guid["_"],
            link: episode?.link,
            description: episode?.description?.trim(),
            pubDate: episode?.pubDate,
            author: episode?.author,
            enclosure: {
              url: episode?.enclosure.url,
              length: episode?.enclosure?.length,
              type: episode?.enclosure?.type,
            },
            image: {
              href: episode["itunes:image"]?.href,
            },
            keywords: episode["itunes:keywords"]?.split(", "),
            persons: episode["podcast:person"]?.map((person) => ({
              name: person["_"],
              role: person?.role,
              href: person?.href,
              img: person?.img,
            })),
            chapters: {
              url: episode["podcast:chapters"]?.url,
              type: episode["podcast:chapters"]?.type,
            },
          })),
        },
      };
    };
    console.log(simplifyPodcastData(data));
    console.log("Successfully fetched RSS feed.");
  } catch (error) {
    console.error("Error:", error.message);
  }
}

testRSS();
