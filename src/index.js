require("dotenv").config();
const { Client, GatewayIntentBits, Events, Message } = require("discord.js");
const {
  channelWelcomeEmbed,
  dmWelcomeEmbed,
} = require("./embeds/welcomeEmbeds");
const { registerCommands } = require("./registerCommands");
const { Player, QueryType } = require("discord-player");
const { joinVoiceChannel } = require("@discordjs/voice");
const {
  createAudioPlayer,
  createAudioResource,
  NoSubscriberBehavior,
  StreamType,
} = require("@discordjs/voice");
const ytdl = require("ytdl-core");
const { handlePlay } = require("./musicPart");
const { commandHandler } = require("./CommandHandler");
const { newsFetch } = require("./commands/newsFetch");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
  ],
});
const { handleAnnounce } = require("./commands/commandFuncs");
client.once(Events.ClientReady, (readyClient) => {
  registerCommands();
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});
client.on(Events.MessageCreate, (message) => {
  if (!message.author.bot) {
    console.log(`Messaged User: ${message.author.globalName}`);
    if (message.content.toLowerCase() === "hi" && !message.author.bot) {
      message.channel.send(`Hello ${message.author}, Nice to meet you`);
      console.log(`Replied to ${message.author.globalName}`);
    }
    if (message.mentions.members.first()) {
      const mentionedUser = message.mentions.members.first();
      mentionedUser.send(
        `You are mentioned in ${message.channel} by ${message.author}`
      );
    }
    if (message.content.toLowerCase() === "!news") {
      try {
        // message.channel.send(newsFetch());
        const news = newsFetch(message);
      } catch (error) {
        console.error(error);
      }
    }
  } else {
    return;
  }
});

client.on(Events.InteractionCreate, (interaction) => {
  try {
    if (!interaction.isChatInputCommand()) return;
    else {
      commandHandler(interaction);
    }
  } catch (error) {
    console.log(error.message);
  }

  client.on(Events.GuildMemberAdd, (member) => {
    const welcomeEmbed = channelWelcomeEmbed(
      member.user.globalName,
      member.guild
    );
    const pmWelcomeEmbed = dmWelcomeEmbed(member.user.globalName, member.guild);
    client.channels.cache
      .get(process.env.WELCOME_CHANNEL_ID)
      .send({ embeds: [welcomeEmbed] });
    member.send({ embeds: [pmWelcomeEmbed] });
  });
});

client.login(process.env.TOKEN);
