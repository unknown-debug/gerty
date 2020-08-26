const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "volume",
  category: "music",
  usage: "volume | Volume <New Volume Numbers>",
  description: "Show Your Current Volume And You Can Also Set Your Volume!",
  run: async (client, message, args) => {

    const { channel } = message.member.voice;
    
    if (!channel) {
      return message.channel.send(`🎶 | Please Join A Voice Channel!`);
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      return message.channel.send(`🎶 | Bot Is Nothing Playing Right Now!`);
    }

    if (!args[0]) {
      return message.channel.send(`🎶 | Music Current Volume : ${serverQueue.volume}`);
    }
    
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send(
        `❌ | You Don't Have Permissions To Properly Use This Command!`
      );
    }

    if (isNaN(args[0])) {
      return message.channel.send(`❌ | Please Use Numerical / Number Value Only!`);
    }

    if (args[0] > 200) {
      return message.channel.send(`❌ | Please Don't Reach The Limit Of 200 Or This Will Damage Your Ear!`);
    }

    serverQueue.volume = args[0];
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);
    message.channel.send(`🎶 | Music Volume Has Been Updated To **${args[0]}**!`);
  }
};