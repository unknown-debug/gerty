const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "leave",
  category: "music",
  usage: "leave",
  description: "Leave The Voice Channel!",
  run: async (client, message, args) => {

    const { channel } = message.member.voice;
    
    if (!channel) {
      return message.channel.send(`🎶 | Please Join A Voice Channel!`);
    }
    
    if (!message.guild.me.voice) {
      return message.channel.send(`🎶 | I Am Not In The Voice Channel!`)
    }
    
    if (message.guild.me.voiceChannelID !== message.member.voiceChannelID) {
      return message.channel.send(`🎶 | We Are Not In The Same Voice Channel!`)
    }

    const serverQueue = message.client.queue.get(message.guild.id);
    
    serverQueue.songs = [];

    await channel.leave();

      return message.channel.send(`🎶 | Bot Has Left The Voice Channel!`)
  }};