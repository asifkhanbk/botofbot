const { commandsList } = require("./Commands.Config");

function commandHandler(interaction) {
  switch (interaction.commandName.toLowerCase()) {
    case commandsList.ping:
      interaction.reply("pong");
      break;

    default:
      interaction.reply("Please enter a valid command");
      break;
  }
}

module.exports = {
  commandHandler,
};
