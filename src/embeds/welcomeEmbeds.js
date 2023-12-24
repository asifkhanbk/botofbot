const {EmbedBuilder} = require('discord.js');

const name = "Buddy";
function channelWelcomeEmbed(name, guildName){
    return new EmbedBuilder().setColor(0x0099FF).setTitle(`Hi ${name},\nWelcome to ${guildName}`).setImage('https://i.imgur.com/0IrbxwI.jpg').setThumbnail('https://i.imgur.com/kFSt3J3.jpg').setFooter({
        text: `With love BOT Gamer..!!`
    });
}

function dmWelcomeEmbed(name, guildName){
    return new EmbedBuilder().setColor(0x0099FF).setTitle(`Hi ${name},\nWelcome to ${guildName}`).setImage('https://i.imgur.com/0IrbxwI.jpg').setThumbnail('https://i.imgur.com/kFSt3J3.jpg').setFooter({
        text: `With love BOT Gamer..!!`
    });
}

module.exports ={
    channelWelcomeEmbed,dmWelcomeEmbed
}
