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
const {
  joinVoiceChannel,
  AudioPlayerStatus,
  getVoiceConnection,
} = require("@discordjs/voice");
const {
  createAudioPlayer,
  createAudioResource,
  NoSubscriberBehavior,
  StreamType,
} = require("@discordjs/voice");
const ytdl = require("ytdl-core");

const guildAudioPlayers = new Map();
let isPaused = false;

//Function for connecting the bot to user's voice channel
function connectionEstablish(voiceChannel) {
  try {
    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: voiceChannel.guild.id,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    });
    console.log("Joined Voice channel");
    return connection;
  } catch (error) {
    console.log(error);
  }
}

//Function for searching song using the url provided as option in command
async function searchSong(url) {
  try {
    const search = await ytdl.getInfo(url);
    return search;
  } catch (error) {
    console.log(error);
  }
}

//Function for fetching the title and url from the search
function fetchTitleAndVideoUrl(search) {
  try {
    const song = {
      title: search.videoDetails.title,
      url: search.videoDetails.video_url,
    };
    console.log("Song details fetched.");
    return song;
  } catch (error) {
    console.log(error);
  }
}

//Function for fetching the audio url from video url
function fetchAudioUrl(search) {
  try {
    const audioStreamURL = ytdl.chooseFormat(search.formats, {
      quality: "highestaudio",
    }).url;
    return audioStreamURL;
  } catch (error) {
    console.log(error);
  }
}

//Function for creating audio player instance inside the connected channel
function forPlayingAndAudioPlayerCreation(resource, connection, guildId) {
  try {
    const audioPlayer = createAudioPlayer();
    audioPlayer.play(resource);
    connection.subscribe(audioPlayer);
    guildAudioPlayers.set(guildId, audioPlayer);
    return audioPlayer;
  } catch (error) {
    console.log(error);
  }
}

//Function for handling /play command
async function handlePlay(interaction, voiceChannel, url) {
  const connection = connectionEstablish(voiceChannel);
  const search = await searchSong(url);
  const guildId = voiceChannel.guild.id;
  try {
    const song = fetchTitleAndVideoUrl(search);
    const audioStreamURL = fetchAudioUrl(search);

    const resource = createAudioResource(audioStreamURL, {
      inputType: StreamType.Arbitrary,
    });
    const audioPlayer = forPlayingAndAudioPlayerCreation(
      resource,
      connection,
      guildId
    );
    isPaused = false;
    audioPlayer.on(AudioPlayerStatus.Playing, () => {
      console.log(`Playing ${song.title}`);
    });
    audioPlayer.on(AudioPlayerStatus.Buffering, () => {
      console.log("Buffering");
    });

    interaction.reply(
      `Playing **${song.title}**.\nRequested by ${interaction.user}`
    );
  } catch (error) {
    console.log(error);
  }
}

//Function for handling /stop command
function handleStop(interaction) {
  const connection = getVoiceConnection(interaction.guild.id);
  if (!connection) {
    interaction.reply("Not connected to any voice channel");
  } else {
    connection.destroy();
    interaction.reply("Music stopped and disconnected.");
  }
}

//Function for handling /pause command
function handlePause(interaction, voiceChannel) {
  const guildId = voiceChannel.guild.id;
  try {
    const audioPlayer = guildAudioPlayers.get(guildId);
    if (audioPlayer) {
      if (audioPlayer._state.status === "playing") {
        const pauseAudioPlayer = audioPlayer.pause();
        console.log("Paused");
        interaction.reply("Paused");
        isPaused = pauseAudioPlayer;
      } else {
        interaction.reply(`You need to play something before pausing`);
      }
    } else {
      console.error("No audio players found");
      interaction.reply("You need to play something before pausing");
    }
  } catch (error) {
    console.log(error);
  }
}

//Function for handling /resume command
function handleResume(interaction, voiceChannel) {
  const guildId = voiceChannel.guild.id;
  try {
    const audioPlayer = guildAudioPlayers.get(guildId);
    if (audioPlayer) {
      if (isPaused === true) {
        audioPlayer.unpause();
        interaction.reply(`Resumed`);
      } else if (isPaused === false) {
        interaction.reply("You are already playing something");
      } else {
        interaction.reply(`Play something`);
      }
    } else {
      console.log(`Not playing anything`);
      interaction.reply("You need to Pause something to resume");
    }
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  handlePlay,
  handleStop,
  handlePause,
  handleResume,
};