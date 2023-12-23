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
const { Player, QueryType } = require("discord-player");
const { joinVoiceChannel, AudioPlayerStatus } = require("@discordjs/voice");
const {
  createAudioPlayer,
  createAudioResource,
  NoSubscriberBehavior,
  StreamType,
} = require("@discordjs/voice");
const ytdl = require("ytdl-core");

async function handlePlay(interaction, voiceChannel, url) {
  const connection = joinVoiceChannel({
    channelId: voiceChannel.id,
    guildId: voiceChannel.guild.id,
    adapterCreator: voiceChannel.guild.voiceAdapterCreator,
  });
  console.log("Joined Voice channel");
  const player = new Player(client);
  try {
    const search = await ytdl.getInfo(url);
    const song = {
      title: search.videoDetails.title,
      url: search.videoDetails.video_url,
    };
    console.log(song);
    const audioStreamURL = ytdl.chooseFormat(search.formats, {
      quality: "highestaudio",
    }).url;
    const resource = createAudioResource(audioStreamURL, {
      inputType: StreamType.Arbitrary,
    });
    const audioPlayer = createAudioPlayer();
    audioPlayer.play(resource);
    connection.subscribe(audioPlayer);
    audioPlayer.on(AudioPlayerStatus.Playing, () => {
      console.log(`Playing`);
    });

    audioPlayer.on(AudioPlayerStatus.Buffering, () => {
      console.log("Bufferingg");
    });

    interaction.reply(
      `Playing **${song.title}**.\nRequested by ${interaction.user}`
    );
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  handlePlay,
};
