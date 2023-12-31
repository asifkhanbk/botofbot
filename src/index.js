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

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

client.once(Events.ClientReady, (readyClient) => {
  registerCommands();
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});
client.on(Events.MessageCreate, (message) => {
  if (!message.author.bot) {
    console.log(`Messaged User: ${message.author.globalName}`);
    if (
      message.content.toLowerCase() === "FUCK YOU TOO" ||
      message.content.toLowerCase() === "FUK YOU TOO" ||
      message.content.toLowerCase() === "FUK U TOO"
    ) {
      message.channel.send(`PODA ${message.author.globalName} NAARI...!!`);
      message.author.send(`VALLA PANIYUM EDUTH JEEVIKADA..!!!!!`);
    }
    if (message.content.toLowerCase() === "hi" && !message.author.bot) {
      if (message.author.globalName === "moosa") {
        message.channel.send(`Fuck you ${message.author.globalName}`);
        message.author.send(`ULUPPUNDO NAARI...!!???`);
      } else {
        message.channel.send(`Hello ${message.author}, Nice to meet you`);
        console.log(`Replied to ${message.author.globalName}`);
      }
    }
    if (message.mentions.members.first()) {
      const mentionedUser = message.mentions.members.first();
      mentionedUser.send(
        `You are mentioned in ${message.channel} by ${message.author}`
      );
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
