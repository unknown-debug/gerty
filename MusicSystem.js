const http = require("http"), //what happened ?
  express = require("express"),
  app = express();

app.get("/", (request, response) => {
  console.log(Date.now() + " Pinged");
  response.sendStatus(200);
});
const ytdlDiscord = require("ytdl-core-discord");
const { AllEmbedsColor } = require("./config.json");
const { MessageEmbed } = require("discord.js");

module.exports = {
  async play(song, message) {
    const queue = message.client.queue.get(message.guild.id);
    let embed = new MessageEmbed().setColor(`RANDOM`);

    if (!song) {
      queue.channel.leave();
      message.client.queue.delete(message.guild.id);
      embed.setTitle(`🎶 | Music Queue Has Been Ended | Tysm For Listening My Music!`)
   //   embed.setFooter(`Tysm For Listening My Music!`)
      return queue.textChannel.send(embed).catch(console.error);
    }

    try {
      var stream = await ytdlDiscord(song.url, {
        highWaterMark: 1 << 25
      });
    } catch (error) {
      if (queue) {
        queue.songs.shift();
        module.exports.play(queue.songs[0], message);
      }

      if (error.message.includes === "copyright") {
        return message.channel.send(`🎶 | This Video Contain Copyright Content!`);
      } else {
        console.error(error);
      }
    }

    const dispatcher = queue.connection
      .play(stream, { type: "opus" })
      .on("finish", () => {
        if (queue.loop) {
          let lastsong = queue.songs.shift();
          queue.songs.push(lastsong);
          module.exports.play(queue.songs[0], message);
        } else {
          queue.songs.shift();
          module.exports.play(queue.songs[0], message);
        }
      })
      .on("error", console.error);

    dispatcher.setVolumeLogarithmic(queue.volume / 100);

    queue.textChannel
      .send(new MessageEmbed()
           .setColor(`${AllEmbedsColor}`)
           .setDescription(`🎶 | Started Playing : [${song.title}](${song.url})`)
           .setFooter(`Requested By ${message.author.username}`))
      .catch(err => message.channel.send(`Error In Playing Music Please Try Again Later!`));
  }
};
