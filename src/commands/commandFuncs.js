require("dotenv").config();
const { Client, GatewayIntentBits, Events, Message } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
  ],
});
const { announceEmbed } = require("../embeds/announceEmbeds");

function handleAnnounce(interaction, message, url) {
  const channel = client.channels.fetch(process.env.ANNOUNCEMENT_CHANNEL_ID);
  if (interaction.member.roles.cache.has(process.env.ANNOUNCEMENT_ROLE_ID)) {
    channel.then((channel) => {
      channel.send("@everyone");
      channel.send({
        embeds: [announceEmbed(message, url)],
      });
    });
    interaction.reply("Announced..!!");
    console.log(`Announcement made by ${interaction.user.globalName}`);
  } else {
    interaction.reply("You are not authorized to make announcements..!!");
    console.log(
      `Unauthorized announcement attempt by ${interaction.user.globalName}`
    );
  }
}
module.exports = {
  handleAnnounce,
};

client.login(process.env.TOKEN);
