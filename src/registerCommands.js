require('dotenv').config();
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const {ApplicationCommandOptionType} = require('discord.js');

const rest = new REST({
  version: '9',
}).setToken(process.env.TOKEN);

const commands = [
  {
    name: 'hi',
    description: 'Replies hi for test',
  },
  {
    name: 'ping',
    description: 'Replies pong for ping'
  },
  {
    name: 'yt',
    description: 'Youtube channel of BOT'
  },
  {
    name:'add',
    description: 'Adds two number',
    options:[
        {
            name:'first-number',
            description: 'First number to add.',
            type: ApplicationCommandOptionType.Number,
            require: true,
        },
        {
            name:'second-number',
            description: 'Second number to add.',
            type: ApplicationCommandOptionType.Number,
            require: true,
        },
    ],
  },
  {
    name: 'invite',
    description: 'Invite Link for the server.'
  },

];

(async () => {
  try {
    console.log(`Registering Slash Commands`);
    await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), {
      body: commands,
    });
    console.log(`Commands Registered Successfully`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
})();
