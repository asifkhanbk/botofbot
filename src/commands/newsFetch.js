const axios = require("axios");
const newsApi = "1385bce3fc2a4dde89e5d0fe278ba10d";

async function newsFetch(message) {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=${newsApi}`
    );
    const data = await response.data;
    const dataMessage = data.articles.slice(0, 10).map((article, index) => {
      return `${index + 1}. ${article.title}`;
    });
    await message.channel.send(dataMessage.join("\n"));
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  newsFetch,
};
