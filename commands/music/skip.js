const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "skip",
  category: "music",
  usage: "skip",
  description: "Skip Currently Playing Music!",
  run: async (client, message, args) => {

    const { channel } = message.member.voice;
    
    if (!channel) {
      return message.channel.send(`🎶 | Please Join A Voice Channel!`);
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      return message.channel.send(`🎶 | Bot Is Nothing Playing Right Now!`);
    }

     serverQueue.connection.dispatcher.end();

      return message.channel.send(`🎶 | Current Playing Music Has Been Skipped!`)
  }};