const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ping",
  category: "music",
  usage: "pause",
  description: "Pause Current Playing Music!",
  run: async (client, message, args) => {

    const msg = await message.channel.send("Pinging");
    
    await msg.edit(`Latency: ${Math.floor(msg.createdAt - message.createdAt)}ms\nAPI Latency: ${Math.round(client.ws.ping)}ms`);  
  }
};