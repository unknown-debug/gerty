const {MessageEmbed} = require('discord.js');
const {stripIndents} = require("common-tags");

module.exports = {
  name: "help",
  category: "info",
  usage: "help",
  description: "Show All Commands",
  run: async (client, message, args) => {
    let emoji1 = client.emojis.cache.find(emoji => emoji.name === 'music1');
    let embed = new MessageEmbed()
      .setAuthor(client.user.username , client.user.displayAvatarURL())
      .setColor("#03002b")
      .setTitle(`COMMANDS`)      
      .setDescription(stripIndents`
      ${emoji1} play/p **-> Play the desired song**\n
      ${emoji1} search **-> Search the desired song**\n
      ${emoji1} stop **-> Stop currently playing song**\n 
      ${emoji1} skip **-> Skip the current song**\n
      ${emoji1} pause **-> Pause current playing song**\n
      ${emoji1} resume **-> Resume already paused song**\n
      ${emoji1} loop **-> Enable/Disable loop**\n
      ${emoji1} nowplaying/np **-> Check the current song**\n
      ${emoji1} jump **-> Jump to any song you like**\n
      ${emoji1} queue **-> Change the queue**\n
      ${emoji1} drop **-> Drop song from queue**\n
      ${emoji1} volume **-> Change the volume of bot**\n 
      ${emoji1} shuffle **-> Shuffle songs in queue**\n 
      ${emoji1} stats **-> Check stats of Bot**\n 
      ${emoji1} ping **-> Check ping of Bot**\n 
      `)
      .setFooter(`Requested by: ${message.author.tag} | Created by MARKSMAN`)
    
    message.channel.send(embed);

  }
}