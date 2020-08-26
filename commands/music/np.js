const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "np",
  category: "music",
  usage: "np",
  description: "Show Currently Playing Music Name / Title!",
  run: async (client, message, args) => {

    const { channel } = message.member.voice;
    
    if (!channel) {
      return message.channel.send(`🎶 | Please Join A Voice Channel!`);
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      return message.channel.send(`🎶 | Bot Is Nothing Playing Right Now!`);
    }

     message.channel.send(`🎶 | Currently Playing : ${serverQueue.songs[0].title}`)
  }};