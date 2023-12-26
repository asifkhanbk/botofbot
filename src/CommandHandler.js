const { commandsList } = require("./Commands.Config");
const {
  handlePlay,
  handleStop,
  handlePause,
  handleResume,
} = require("./musicPart");
const { handleAnnounce } = require("./commands/commandFuncs");

//Area for implementing the logic for the command || The command should be registered before implementing
function commandHandler(interaction) {
  const voiceChannel = interaction.member.voice.channel;
  switch (interaction.commandName.toLowerCase()) {
    case commandsList.ping:
      console.log(`${interaction.user.globalName} used /ping`);
      interaction.reply("Pong...!!!!");
      break;
    case commandsList.hi:
      //  const welcomeEmbed = createWelcomeEmbed(interaction.user.globalName, interaction.guild);
      console.log(`${interaction.user.globalName} used /hi`);
      //  interaction.reply({embeds:[welcomeEmbed]});
      interaction.reply(`Hi, ${interaction.user.globalName}`);
      break;
    case commandsList.yt:
      console.log(`${interaction.user.globalName} used /yt`);
      interaction.reply(
        `Check and Subscribe to \n ${process.env.CHANNEL_LINK}`
      );
      break;
    case commandsList.add:
      const num1 = interaction.options.get("first-number").value;
      const num2 = interaction.options.get("second-number").value;
      interaction.reply(`The sum is ${num1 + num2}`);
      break;
    case commandsList.invte:
      const link = "https://discord.gg/BHrKhWh";
      interaction.reply(`Invite link for ${interaction.guild}\n ${link}`);
      console.log(`${interaction.user.globalName} used /invite`);
      break;
    case commandsList.play:
      const url = interaction.options.getString("url");
      if (!voiceChannel) {
        interaction.reply(
          "You need to join a voice channel to use this command."
        );
      } else {
        handlePlay(interaction, voiceChannel, url);
      }
      break;
    case commandsList.stop:
      handleStop(interaction);
      break;
    case commandsList.pause:
      handlePause(interaction, voiceChannel);
      break;
    case commandsList.resume:
      handleResume(interaction, voiceChannel);
      break;
    case commandsList.announce:
      const message = interaction.options.getString("message");
      const urlImage = interaction.options.getString("url");
      handleAnnounce(interaction, message, urlImage);
      break;
    default:
      interaction.reply("Please enter a valid command");
      break;
  }
}

module.exports = {
  commandHandler,
};
