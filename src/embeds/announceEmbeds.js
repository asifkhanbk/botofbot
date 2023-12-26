const { EmbedBuilder } = require("discord.js");

function announceEmbed(message, url) {
  return new EmbedBuilder()
    .setColor("DarkRed")
    .setTitle(message)
    .setImage(url)
    .setFooter({
      text: "With Love BOT Gamer..",
    });
}
module.exports = {
  announceEmbed,
};
