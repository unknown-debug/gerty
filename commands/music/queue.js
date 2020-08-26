const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "queue",
  category: "music",
  usage: "queue",
  description: "Get All Songs List That Are In Queue!",
  run: async (client, message, args) => {

    const { channel } = message.member.voice;
    
    if (!channel) {
      return message.channel.send(`🎶 | Please Join A Voice Channel!`);
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      return message.channel.send(`🎶 | Bot Is Nothing Playing Right Now!`);
    }
    
    message.channel.send(
      `${serverQueue.songs
        .map((song, index) => index + 1 + ". " + song.title)
        .join("\n\n")}`,
      { split: true }
    );
  }};