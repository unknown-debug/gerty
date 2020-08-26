const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "resume",
  category: "music",
  usage: "resume",
  description: "Resume The Paused Music!",
  run: async (client, message, args) => {

    const { channel } = message.member.voice;
    
    if (!channel) {
      return message.channel.send(`🎶 | Please Join A Voice Channel!`);
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      return message.channel.send(`🎶 | Bot Is Nothing Playing Right Now!`);
    }

     if(serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume()
  return message.channel.send(`🎶 | Paused Music Has Been Resumed!`)
  }}};