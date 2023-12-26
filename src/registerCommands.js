require("dotenv").config();
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { ApplicationCommandOptionType } = require("discord.js");

const rest = new REST({
  version: "9",
}).setToken(process.env.TOKEN);

const commands = [
  {
    name: "hi",
    description: "Replies hi for test",
  },
  {
    name: "ping",
    description: "Replies pong for ping",
  },
  {
    name: "yt",
    description: "Youtube channel of BOT",
  },
  {
    name: "add",
    description: "Adds two number",
    options: [
      {
        name: "first-number",
        description: "First number to add.",
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
      {
        name: "second-number",
        description: "Second number to add.",
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
    ],
  },
  {
    name: "invite",
    description: "Invite Link for the server.",
  },
  {
    name: "play",
    description: "Play Music",
    options: [
      {
        name: "songname",
        description: "Name of the song",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
  {
    name: "stop",
    description: "Stop currently playing music.",
  },
  {
    name: "pause",
    description: "Pauses currently playing music.",
  },
  {
    name: "resume",
    description: "Resumes paused music.",
  },
  {
    name: "announce",
    description: "Announces to the announcement channel",
    options: [
      {
        name: "message",
        description: "Enter your message",
        required: true,
        type: ApplicationCommandOptionType.String,
      },
      {
        name: "url",
        description: "Type in image url",
        required: false,
        type: ApplicationCommandOptionType.String,
      },
    ],
  },
];

function registerCommands() {
  try {
    console.log(`Registering Slash Commands..!!`);
    rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      {
        body: commands,
      }
    );
    console.log(`Commands Registered Successfully..!!`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

module.exports = {
  registerCommands,
};
