const { commandsList } = require("./Commands.Config");
const { handlePlay } = require("./musicPart");

function commandHandler(interaction) {
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
      const voiceChannel = interaction.member.voice.channel;
      const url = interaction.options.getString("url");
      if (!voiceChannel) {
        interaction.reply(
          "You need to join a voice channel to use this command."
        );
      } else {
        handlePlay(interaction, voiceChannel, url);
      }
      break;

    default:
      interaction.reply("Please enter a valid command");
      break;
  }
}

module.exports = {
  commandHandler,
};
